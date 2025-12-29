import Link from 'next/link';
import { redirect } from 'next/navigation';
import { verifyDonorId } from '@/lib/auth';
import FadeInWhenVisible from '@/components/FadeInWhenVisible';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function LetterPage({ params }: PageProps) {
    const { id } = await params;

    const authResult = verifyDonorId(id);

    if (!authResult) {
        redirect('/');
    }

    const { name } = authResult;

    return (
        <div className="min-h-screen bg-orange-50 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <Link
                    href={`/donor/${id}`}
                    className="inline-flex items-center gap-2 text-slate-700 hover:text-orange-600 transition-colors mb-8 font-semibold bg-white px-4 py-2 rounded-2xl shadow-sm hover:shadow-md border border-slate-100"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    포털로 돌아가기
                </Link>

                <FadeInWhenVisible delay={0}>
                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 mb-8">
                        <div className="p-8 border-b border-slate-100 bg-gradient-to-br from-orange-50 to-orange-100/50">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-200">
                                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
                                    </svg>
                                </div>
                                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">셰프의 감사 편지</h1>
                            </div>
                            <p className="text-orange-700 font-medium">마음을 담아 전하는 메시지</p>
                        </div>
                    </div>
                </FadeInWhenVisible>

                {/* Coming Soon Message */}
                <FadeInWhenVisible delay={0.1}>
                    <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-slate-100">
                        <div className="p-12 text-center">
                            {/* Envelope Icon */}
                            <div className="flex justify-center mb-6">
                                <div className="w-24 h-24 rounded-2xl bg-orange-100 flex items-center justify-center">
                                    <svg className="w-12 h-12 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                            </div>

                            <h2 className="text-2xl font-extrabold text-slate-900 mb-4 tracking-tight">
                                감사 편지 준비 중
                            </h2>

                            <p className="text-slate-600 leading-relaxed max-w-md mx-auto">
                                {name}님께 전할 따뜻한 메시지를 준비하고 있습니다.<br />
                                곧 만나보실 수 있습니다.
                            </p>
                        </div>
                    </div>
                </FadeInWhenVisible>
            </div>
        </div>
    );
}
