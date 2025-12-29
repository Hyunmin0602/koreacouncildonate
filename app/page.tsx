import Image from "next/image";
import Link from "next/link";
import SearchForm from "@/components/SearchForm";
import MotionContainer from "@/components/MotionContainer";

export default function Home() {

    return (
        <div className="min-h-screen relative overflow-hidden bg-slate-50 font-sans selection:bg-blue-100 flex items-center justify-center">

            {/* Dynamic Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-400 rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-blob"></div>
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-400 rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-[-10%] left-[20%] w-[500px] h-[500px] bg-indigo-400 rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center gap-12 lg:gap-20">

                {/* Left Area: Text Content */}
                <div className="text-center md:text-left md:w-1/2 space-y-8 animate-fade-in-up">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold tracking-wide uppercase">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
                            Official Verification System
                        </div>
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1]">
                            투명함을 <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">증명하다.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-500 max-w-lg mx-auto md:mx-0 leading-relaxed font-medium">
                            대한학생회는 모든 후원 내역을 투명하게 공개하며, <br className="hidden md:block" />
                            여러분의 소중한 후원이 가치 있게 쓰임을 증명합니다.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <a
                            href="https://www.koreastudentscouncil.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-200 transition-all duration-300 shadow-sm hover:shadow-md group"
                        >
                            <span>공식 홈페이지 방문</span>
                            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 00-2 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </a>
                    </div>
                </div>

                {/* Right Area: Glassmorphism Card */}
                <div className="w-full md:w-1/2 max-w-md mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    <div className="glass-panel rounded-3xl p-8 relative overflow-hidden animate-float">
                        {/* Decorative shine effect */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>

                        <div className="relative z-10 space-y-8">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-800">인증서 조회</h2>
                                <p className="text-slate-500 text-sm mt-1">발급된 인증번호를 입력하여 후원 내역을 확인하세요.</p>
                            </div>

                            <SearchForm />

                            <div className="pt-6 border-t border-slate-200/50">
                                <p className="text-center text-xs text-slate-400 font-medium">
                                    Secure Verification powered by DonateCheck
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
}
