import { redirect } from 'next/navigation';
import { getCertificateFromSheet } from '@/lib/google-sheets';
import CertificateView from '@/components/CertificateView';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function CertificatePage({ params }: PageProps) {
    const { id } = await params;

    // Decode logic
    let certNumber = '';
    try {
        const decoded = Buffer.from(id, 'base64url').toString('utf-8');
        const parts = decoded.split(':');
        certNumber = parts[1] || '';
    } catch (e) {
        console.error(e);
        redirect('/');
    }

    if (!certNumber) {
        redirect('/');
    }

    const donorData = await getCertificateFromSheet(certNumber);

    if (!donorData) {
        redirect('/');
    }

    return (
        <CertificateView
            data={donorData}
            backHref={`/donor/${id}`}
            backLabel="포털로 돌아가기"
        />
    );
}
