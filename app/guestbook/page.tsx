import Link from 'next/link';
import FadeInWhenVisible from '@/components/FadeInWhenVisible';
import { getGuestbookMessages } from '@/lib/google-sheets';

export default async function GuestbookPage() {
    const messages = await getGuestbookMessages();

    const anonymize = (name: string) => {
        if (!name || name === '익명') return '익명';
        if (name.length <= 1) return name;
        if (name.length === 2) return name[0] + '*';
        return name[0] + '*'.repeat(name.length - 2) + name[name.length - 1];
    };

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
                            <p className="text-orange-700 font-medium">따뜻한 응원의 메시지를 확인해보세요</p>
                        </div>
                    </div>
                </FadeInWhenVisible>

                {/* Message List */}
                <div className="grid gap-6">
                    {messages.length > 0 ? (
                        messages.map((msg, idx) => (
                            <FadeInWhenVisible key={idx} delay={idx * 0.05}>
                                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-xl">
                                                🖊️
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900">{anonymize(msg.name)}</p>
                                                <p className="text-xs text-slate-500">{msg.date}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                                </div>
                            </FadeInWhenVisible>
                        ))
                    ) : (
                        <FadeInWhenVisible delay={0.1}>
                            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-12 text-center">
                                <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-slate-100 flex items-center justify-center">
                                    <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">아직 등록된 메시지가 없습니다</h3>
                                <p className="text-slate-600">첫 번째 메시지의 주인공이 되어주세요!<br />후원 인증 후 메시지를 남기실 수 있습니다.</p>
                            </div>
                        </FadeInWhenVisible>
                    )}
                </div>

                {/* Info */}
                <FadeInWhenVisible delay={0.2}>
                    <div className="mt-8 bg-gradient-to-br from-orange-100 to-orange-50 rounded-3xl p-6 border border-orange-200">
                        <div className="text-center">
                            <h4 className="font-extrabold text-slate-900 mb-2">메시지 남기는 방법</h4>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                후원 인증 페이지로 접속하신 후, <br />
                                <strong>방명록 남기기</strong> 섹션에서 따뜻한 메시지를 작성하실 수 있습니다.
                            </p>
                        </div>
                    </div>
                </FadeInWhenVisible>
            </div>
        </div>
    );
}
