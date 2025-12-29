import Link from 'next/link';
import FadeInWhenVisible from '@/components/FadeInWhenVisible';

export default function FAQ() {
    const faqs = [
        {
            question: "후원금은 어떻게 사용되나요?",
            answer: `모든 후원금은 학생 자치 활동을 위해 투명하게 사용됩니다:\n\n✓ 행사 운영비 (대관, 참석자 비품 구매, 식음 구매 등)\n✓ 학생 복지 프로그램 (간식 지원, 편의시설 개선)\n✓ 학생 주도 프로젝트 지원\n✓ 커뮤니티 공간 조성\n\n모든 사용 내역은 인증서 페이지에서 투명하게 공개됩니다.`
        },
        {
            question: "인증서를 잃어버렸어요. 어떻게 다시 확인할 수 있나요?",
            answer: `인증서는 언제든 다시 확인할 수 있습니다:\n\n1. 메인 페이지(donateds.vercel.app)로 이동\n2. 성함과 인증번호 입력\n3. "인증서 조회하기" 클릭\n\n인증번호를 잊어버리신 경우, 후원 시 받으신 이메일이나 카카오톡 메시지를 확인해주세요.`
        },
        {
            question: "인증서는 어떻게 확인하나요?",
            answer: `인증서 확인은 매우 간단합니다:\n\n1. 메인 페이지에서 성함과 인증번호 입력\n2. 포털 페이지에서 "주문표 확인하기" 클릭\n3. 인증서 페이지에서 내용 확인\n4. 필요시 이미지나 PDF로 다운로드\n\nQR 코드를 스캔하면 바로 인증서를 확인할 수 있습니다.`
        },
        {
            question: "후원금 사용 내역은 어디서 볼 수 있나요?",
            answer: `후원금 사용 내역은 포털 페이지의 "재료 확인하기" 버튼을 통해 확인할 수 있습니다:\n\n✓ 사용 금액\n✓ 사용 용도\n✓ 사용 일자\n✓ 상세 비고\n\n모든 내역이 투명하게 공개되어 있습니다.`
        },
        {
            question: "개인정보는 어떻게 보호되나요?",
            answer: `후원자님의 개인정보는 안전하게 보호됩니다:\n\n✓ 인증번호 기반 암호화된 접근\n✓ 명예의 전당은 이니셜만 표시 (익명)\n✓ 개인정보는 후원 관리 목적으로만 사용\n\nGoogle Sheets의 보안 시스템을 사용하여 안전하게 관리됩니다.`
        },
        {
            question: "추가 후원을 하고 싶어요.",
            answer: `추가 후원에 감사드립니다!\n\n공식 홈페이지(www.koreastudentscouncil.com)를 통해 후원하실 수 있으며, 새로운 인증번호가 발급됩니다.\n\n문의사항이 있으시면 언제든 연락주세요.`
        }
    ];

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
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">자주 묻는 질문</h1>
                            </div>
                            <p className="text-orange-700 font-medium">궁금하신 점을 빠르게 찾아보세요</p>
                        </div>
                    </div>
                </FadeInWhenVisible>

                {/* FAQ List */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <FadeInWhenVisible key={index} delay={0.1 * (index + 1)}>
                            <details className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden group hover:shadow-lg transition-all duration-300">
                                <summary className="cursor-pointer p-6 font-extrabold text-lg text-slate-900 flex items-center justify-between tracking-tight hover:text-orange-600 transition-colors">
                                    <span className="flex items-center gap-3">
                                        <span className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center text-sm font-bold flex-shrink-0">
                                            Q{index + 1}
                                        </span>
                                        {faq.question}
                                    </span>
                                    <svg className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </summary>
                                <div className="px-6 pb-6 pt-2">
                                    <div className="bg-orange-50/50 rounded-xl p-4 border-l-4 border-orange-500">
                                        <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            </details>
                        </FadeInWhenVisible>
                    ))}
                </div>

                {/* Contact Section */}
                <FadeInWhenVisible delay={0.9}>
                    <div className="mt-8 bg-gradient-to-br from-orange-100 to-orange-50 rounded-3xl p-6 border border-orange-200">
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center flex-shrink-0">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-extrabold text-slate-900 mb-1">찾으시는 답변이 없나요?</h4>
                                <p className="text-sm text-slate-600 leading-relaxed mb-3">
                                    추가 문의사항이 있으시면 언제든 연락주세요. 성심껏 답변드리겠습니다.
                                </p>
                                <a
                                    href="https://www.koreastudentscouncil.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-white text-orange-600 font-bold rounded-xl hover:bg-orange-50 transition-colors shadow-sm text-sm"
                                >
                                    공식 홈페이지 방문
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </FadeInWhenVisible>
            </div>
        </div >
    );
}
