import Link from 'next/link';
import { redirect } from 'next/navigation';
import { verifyDonorId } from '@/lib/auth';
import MotionContainer from '@/components/MotionContainer';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function LetterPage({ params }: PageProps) {
    const { id } = await params;

    const authResult = verifyDonorId(id);

    if (!authResult) {
        redirect('/');
    }

    return (
        <div className="min-h-screen bg-amber-50/50 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <Link
                    href={`/donor/${id}`}
                    className="inline-flex items-center text-gray-600 hover:text-amber-700 transition-colors mb-8"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    포털로 돌아가기
                </Link>

                <MotionContainer
                    className="bg-white rounded-xl shadow-xl overflow-hidden"
                >
                    <div className="p-8 md:p-12 text-center">
                        <h1 className="text-3xl font-bold text-gray-900 mb-8 font-serif">감사의 편지</h1>

                        {/* Placeholder for Hand-written Letter Image */}
                        <div className="relative aspect-[3/4] max-w-2xl mx-auto bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                            <div className="text-center text-gray-500">
                                <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <p>손편지 이미지가 이곳에 표시됩니다</p>
                            </div>
                        </div>

                        <div className="mt-8 text-gray-600 font-serif leading-relaxed">
                            <p className="mb-4">
                                "여러분의 후원은 단순한 물질적 지원을 넘어<br />
                                학생들에게 꿈과 희망을 전하는 메시지입니다."
                            </p>
                            <p className="text-sm text-gray-500">
                                - 대한학생회 임원 일동 -
                            </p>
                        </div>
                    </div>
                </MotionContainer>
            </div>
        </div>
    );
}
