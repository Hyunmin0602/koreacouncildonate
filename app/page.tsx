import Image from "next/image";
import Link from "next/link";
import SearchForm from "@/components/SearchForm";

export default function Home() {

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-white overflow-hidden font-sans">
            {/* Visual Section (Left/Top) */}
            <div className="w-full md:w-1/2 bg-blue-600 relative overflow-hidden flex flex-col justify-between p-8 md:p-12 lg:p-16 text-white min-h-[300px] md:min-h-screen">
                {/* Abstract Background Shapes */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2 animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 translate-y-1/2 -translate-x-1/2 animate-pulse" style={{ animationDelay: '1s' }}></div>

                <div className="relative z-10 animate-fade-in-up">
                    <div className="text-sm font-bold tracking-widest uppercase opacity-80 mb-4">
                        Donate Check
                    </div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
                        투명한<br />
                        후원의 시작,
                    </h1>
                </div>

                <div className="relative z-10 hidden md:block animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    <p className="text-lg text-blue-100 max-w-sm mb-8">
                        대한학생회는 모든 후원 내역을<br />
                        투명하게 공개하고 인증합니다.
                    </p>

                    {/* External Link (Desktop) */}
                    <a
                        href="https://www.koreastudentscouncil.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors group"
                    >
                        <span className="border-b border-transparent group-hover:border-white transition-all">대한학생회 공식 홈페이지</span>
                        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 00-2 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </a>
                </div>
            </div>

            {/* Interaction Section (Right/Bottom) */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-12 lg:p-16 relative bg-white">
                <main className="w-full max-w-md space-y-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                    <div className="space-y-2 md:hidden">
                        <p className="text-slate-500 text-sm">
                            대한학생회 투명 후원 인증 시스템
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900">
                                인증서 조회
                            </h2>
                            <p className="text-slate-500 mt-2">
                                후원자님께 발급된 고유 인증번호를 입력해주세요.
                            </p>
                        </div>

                        <SearchForm />
                    </div>

                    <div className="pt-8 border-t border-slate-100 hidden md:block">
                        <p className="text-xs text-slate-400">
                            @ 2026 KOREA STUDENTCOUNCIL
                        </p>
                    </div>
                </main>
            </div>
        </div>
    );
}
