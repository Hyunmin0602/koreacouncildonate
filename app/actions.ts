'use server';

import { getCertificateFromSheet } from "@/lib/google-sheets";
import { generateSignedDonorId } from "@/lib/auth";

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
        const encoded = generateSignedDonorId(name, certId);
        console.log('Validation success, returning redirect URL:', `/donor/${encoded}`);
        return { success: true, redirectUrl: `/donor/${encoded}` };

    } catch (error) {
        console.error("Certificate Check Error:", error);
        return { error: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' };
    }
}

import { postGuestbookMessage } from "@/lib/google-sheets";
import { revalidateTag } from "next/cache";

import { headers } from "next/headers";
import { checkRateLimit } from "@/lib/rate-limit";

export async function submitGuestbookMessage(prevState: any, formData: FormData) {
    const message = formData.get('message')?.toString().trim();
    const donorName = formData.get('donorName')?.toString().trim();

    // Rate Limit Check
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for') || 'unknown';

    // Limit: 5 posts per 60 seconds per IP
    const isAllowed = checkRateLimit(ip, { limit: 5, windowMs: 60 * 1000 });

    if (!isAllowed) {
        return { success: false, error: '너무 많은 메시지를 보내셨습니다. 잠시 후 다시 시도해주세요.' };
    }

    if (!message || !donorName) {
        return { success: false, error: '메시지를 입력해주세요.' };
    }

    try {
        const result = await postGuestbookMessage(donorName, message);

        if (result) {
            revalidateTag('guestbook');
            return { success: true, error: '' };
        } else {
            return { success: false, error: '메시지 저장에 실패했습니다.' };
        }
    } catch (error) {
        console.error("Guestbook Submit Error:", error);
        return { success: false, error: '서버 오류가 발생했습니다.' };
    }
}
