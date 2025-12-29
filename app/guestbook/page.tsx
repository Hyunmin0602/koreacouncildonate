import Link from 'next/link';
import FadeInWhenVisible from '@/components/FadeInWhenVisible';

export default function GuestbookPage() {
    //  Guest messages would be stored in Google Sheets
    // For now, showing a simple placeholder

    return (
        <div className="min-h-screen bg-orange-50 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-slate-700 hover:text-orange-600 transition-colors mb-8 font-semibold bg-white px-4 py-2 rounded-2xl shadow-sm hover:shadow-md border border-slate-100"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    홈으로 돌아가기
                </Link>

                {/* Header */}
                <FadeInWhenVisible delay={0}>
                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 mb-8">
                        <div className="p-8 border-b border-slate-100 bg-gradient-to-br from-orange-50 to-orange-100/50">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-200">
                                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </div>
                                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">후원자 방명록</h1>
                            </div>
                            <p className="text-orange-700 font-medium">따뜻한 응원의 메시지를 남겨주세요</p>
                        </div>
                    </div>
                </FadeInWhenVisible>

                {/* Coming Soon */}
                <FadeInWhenVisible delay={0.1}>
                    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-12 text-center">
                        <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-orange-100 flex items-center justify-center">
                            <svg className="w-12 h-12 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-extrabold text-slate-900 mb-2">준비 중입니다</h3>
                        <p className="text-slate-600 leading-relaxed max-w-md mx-auto mb-6">
                            후원자분들의 따뜻한 응원 메시지를 남길 수 있는 방명록을 준비하고 있습니다.
                        </p>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-xl text-sm font-bold">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Coming Soon
                        </div>
                    </div>
                </FadeInWhenVisible>

                {/* Info */}
                <FadeInWhenVisible delay={0.2}>
                    <div className="mt-8 bg-gradient-to-br from-orange-100 to-orange-50 rounded-3xl p-6 border border-orange-200">
                        <div className="text-center">
                            <h4 className="font-extrabold text-slate-900 mb-2">방명록 기능 안내</h4>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                곧 후원자분들의 응원 메시지를 작성하고 공유할 수 있는 기능이 추가됩니다.<br />
                                서로의 마음을 나누며 더 큰 힘을 얻을 수 있습니다.
                            </p>
                        </div>
                    </div>
                </FadeInWhenVisible>
            </div>
        </div>
    );
}
