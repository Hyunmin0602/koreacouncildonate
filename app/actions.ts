'use server';

import { getCertificateFromSheet } from "@/lib/google-sheets";

export async function checkAndRedirect(prevState: any, formData: FormData) {
    const certId = formData.get('certId')?.toString().trim();
    const name = formData.get('name')?.toString().trim();

    if (!certId || !name) {
        return { error: '성함과 인증번호를 모두 입력해주세요.' };
    }

    try {
        const data = await getCertificateFromSheet(certId);

        if (!data) {
            console.log('Cert ID not found in sheet');
            return { error: '올바르지 않은 인증번호입니다. 다시 확인해주세요.' };
        }

        // Validate Name
        const sheetName = data.name.replace(/\s+/g, '');
        const inputName = name.replace(/\s+/g, '');

        if (sheetName !== inputName) {
            console.log('Name mismatch:', { sheetName, inputName });
            return { error: '인증번호와 성함이 일치하지 않습니다.' };
        }

        // Return URL for client-side redirection
        const encoded = Buffer.from(`${name}:${certId}`).toString('base64url');
        console.log('Validation success, returning redirect URL:', `/donor/${encoded}`);
        return { success: true, redirectUrl: `/donor/${encoded}` };

    } catch (error) {
        console.error("Certificate Check Error:", error);
        return { error: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' };
    }
}
