'use server';

import { getCertificateFromSheet } from "@/lib/google-sheets";
import { encryptId } from "@/lib/crypto";
import { redirect } from "next/navigation";

export async function checkAndRedirect(prevState: any, formData: FormData) {
    const certId = formData.get('certId')?.toString().trim();
    const name = formData.get('name')?.toString().trim();

    if (!certId || !name) {
        return { error: '성함과 인증번호를 모두 입력해주세요.' };
    }

    try {
        const data = await getCertificateFromSheet(certId);

        if (!data) {
            return { error: '올바르지 않은 인증번호입니다. 다시 확인해주세요.' };
        }

        // Validate Name (Case insensitive and remove spaces for loose matching if desired, but strict is safer for now)
        if (data.name.replace(/\s+/g, '') !== name.replace(/\s+/g, '')) {
            return { error: '인증번호와 성함이 일치하지 않습니다.' };
        }

        // If valid, redirect (this throws an error internally in Next.js which is handled by the framework)
        const encryptedId = encryptId(certId);
        redirect(`/cert/${encryptedId}`);

    } catch (error) {
        // If it's a redirect error, rethrow it so Next.js handles the redirect
        if ((error as any).digest?.startsWith('NEXT_REDIRECT')) {
            throw error;
        }
        console.error("Certificate Check Error:", error);
        return { error: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' };
    }
}
