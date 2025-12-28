import { redirect } from 'next/navigation';
import { getCertificateFromSheet } from '@/lib/google-sheets';
import { verifyDonorId } from '@/lib/auth';
import CertificateView from '@/components/CertificateView';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function CertificatePage({ params }: PageProps) {
    const { id } = await params;

    const authResult = verifyDonorId(id);

    if (!authResult) {
        redirect('/');
    }

    const { certNumber } = authResult;

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
