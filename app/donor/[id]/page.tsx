import { redirect } from 'next/navigation';
import { getCertificateFromSheet } from '@/lib/google-sheets';
import { verifyDonorId } from '@/lib/auth';
import ThankYouCard from '@/components/ThankYouCard';
import MenuCard from '@/components/MenuCard';

interface DonorPageProps {
    params: Promise<{ id: string }>;
}

export default async function DonorPortalPage({ params }: DonorPageProps) {
    const { id } = await params;

    const authResult = verifyDonorId(id);

    if (!authResult) {
        redirect('/');
    }

    const { name, certNumber } = authResult;

    // Fetch donor data using the existing getCertificateFromSheet function
    const donorData = await getCertificateFromSheet(certNumber);

    if (!donorData) {
        redirect('/');
    }

    // Verify name matches (Double check against sheet data)
    // Even though signature is valid, we ensure the sheet data hasn't changed or we aren't displaying mismatching data
    const sheetName = donorData.name.replace(/\s+/g, '').toLowerCase();
    const paramName = name.replace(/\s+/g, '').toLowerCase();

    if (sheetName !== paramName) {
        redirect('/');
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Thank You Card */}
                <ThankYouCard donorName={donorData.name} />

                {/* Menu Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {/* Certificate */}
                    <MenuCard
                        title="후원 인증서 확인"
                        description="공식 후원 인증서를 확인하고 다운로드하실 수 있습니다"
                        color="blue"
                        href={`/donor/${id}/certificate`}
                        icon={
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        }
                    />

                    {/* Letter */}
                    <MenuCard
                        title="손편지 확인"
                        description="진심을 담은 감사의 손편지를 확인해보세요"
                        color="purple"
                        href={`/donor/${id}/letter`}
                        disabled={true}
                        icon={
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        }
                    />

                    {/* Spending Report */}
                    <MenuCard
                        title="후원금 사용내역"
                        description="투명한 후원금 사용 내역을 확인하실 수 있습니다"
                        color="emerald"
                        href={`/donor/${id}/spending`}
                        disabled={true}
                        icon={
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        }
                    />

                    {/* After Video */}
                    <MenuCard
                        title="애프터영상 보기"
                        description="후원으로 만들어진 특별한 순간들을 영상으로 만나보세요"
                        color="rose"
                        href={`/donor/${id}/video`}
                        disabled={true}
                        icon={
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        }
                    />
                </div>

                {/* Back to Home Link */}
                <div className="mt-12 text-center">
                    <a
                        href="/"
                        className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        처음으로 돌아가기
                    </a>
                </div>
            </div>
        </div>
    );
}
