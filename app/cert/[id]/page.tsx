import CertificateCard from '@/components/CertificateCard';
import { getCertificateFromSheet } from '@/lib/google-sheets';
import { decryptId } from '@/lib/crypto';
import type { Metadata } from 'next';

type Props = {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id: encryptedId } = await params;

    try {
        const id = decryptId(encryptedId);
        const data = await getCertificateFromSheet(id);

        if (!data) {
            return {
                title: '인증서를 찾을 수 없습니다',
            };
        }

        // Extract year from date (assuming format like "2024-12-19" or "2024.12.19")
        const yearMatch = data.date.match(/(\d{4})/);
        const year = yearMatch ? yearMatch[1] : new Date().getFullYear().toString();

        return {
            title: `DS-${year}-${id}`,
        };
    } catch (error) {
        return {
            title: '잘못된 인증서 링크',
        };
    }
}

export default async function CertificatePage({ params }: Props) {
    const { id: encryptedId } = await params;

    let id: string;
    try {
        id = decryptId(encryptedId);
    } catch (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="text-center">
                    <h1 className="text-xl font-bold text-gray-800 mb-2">잘못된 인증서 링크입니다.</h1>
                    <p className="text-gray-500">올바른 인증번호를 입력해주세요.</p>
                </div>
            </div>
        );
    }

    // Fetch real data from Google Sheets
    const data = await getCertificateFromSheet(id);

    if (!data) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="text-center">
                    <h1 className="text-xl font-bold text-gray-800 mb-2">인증서를 찾을 수 없습니다.</h1>
                    <p className="text-gray-500">올바른 인증번호인지 확인해주세요.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <CertificateCard data={data} />
        </div>
    );
}
