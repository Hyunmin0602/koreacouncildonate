
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { verifyDonorId } from '@/lib/auth';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function VideoPage({ params }: PageProps) {
    const { id } = await params;

    const authResult = verifyDonorId(id);

    if (!authResult) {
        redirect('/');
    }

    return (
        <div className="min-h-screen bg-rose-50/50 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <Link
                    href={`/donor/${id}`}
                    className="inline-flex items-center text-gray-600 hover:text-rose-700 transition-colors mb-8"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    포털로 돌아가기
                </Link>

                <div className="space-y-8">
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden p-8 text-center">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">애프터 영상</h1>
                        <p className="text-gray-500 mb-8">후원자님 덕분에 만들어진 특별한 순간들입니다</p>

                        {/* Video Embed Placeholder */}
                        <div className="aspect-video bg-black rounded-lg overflow-hidden shadow-md max-w-3xl mx-auto">
                            <iframe
                                className="w-full h-full"
                                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>

                        <div className="mt-8 text-gray-600">
                            <p>
                                2024년 한 해 동안 진행된 다양한 활동들을 영상으로 담았습니다.<br />
                                학생들의 생생한 목소리와 활동 모습을 확인해보세요.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
