import Image from "next/image";
import Link from "next/link";
import SearchForm from "@/components/SearchForm";
import { getImpactStats, getRecentDonors } from "@/lib/google-sheets";
import ThankYouCard from "@/components/ThankYouCard";

export default async function Home() {
    const impactStats = await getImpactStats();
    const recentDonors = await getRecentDonors(6);

    const anonymize = (name: string) => {
        if (!name || name === '익명') return '익명';
        if (name.length <= 1) return name;
        if (name.length === 2) return name[0] + '*';
        return name[0] + '*'.repeat(name.length - 2) + name[name.length - 1];
    };

    return (
        <div className="min-h-screen relative bg-orange-50 font-sans selection:bg-orange-200">

            {/* Fixed Background Elements - Now Fixed for scrolling */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-orange-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
                <div className="absolute top-[30%] right-[-10%] w-[500px] h-[500px] bg-stone-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-[-10%] left-[10%] w-[600px] h-[600px] bg-amber-100/60 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
            </div>

            {/* Hero Section */}
            <section className="min-h-screen flex items-center justify-center relative z-10">
                <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12 lg:gap-20">

                    {/* Left Area: Text Content */}
                    <div className="text-center md:text-left md:w-1/2 space-y-8 animate-fade-in-up">
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm border border-orange-200/50 text-orange-700 text-xs font-bold tracking-wide uppercase shadow-sm">
                                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>
                                Official Verification System
                            </div>
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                                투명함을 <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">증명하다.</span>
                            </h1>
                            <p className="text-lg md:text-xl text-slate-600 max-w-lg mx-auto md:mx-0 leading-relaxed font-medium">
                                대한학생회는 모든 후원 내역을 투명하게 공개하며, <br className="hidden md:block" />
                                여러분의 소중한 후원이 가치 있게 쓰임을 증명합니다.
                            </p>
                        </div>

                        {/* Simple Stats Display */}
                        {impactStats && impactStats.totalDonors > 0 && (
                            <div className="inline-flex items-center gap-3 px-6 py-4 bg-white rounded-2xl shadow-lg border border-slate-100">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <span className="text-3xl font-extrabold text-slate-900">{impactStats.totalDonors}</span>
                                    <span className="text-lg font-bold text-orange-600 ml-1">명</span>
                                    <p className="text-xs text-slate-500 font-medium">함께하는 후원자</p>
                                </div>
                            </div>
                        )}

                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                            <a
                                href="https://www.koreastudentscouncil.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-white border border-slate-100 text-slate-700 hover:text-orange-600 hover:border-orange-200 transition-all duration-300 shadow-md hover:shadow-xl group font-semibold hover:-translate-y-1"
                            >
                                <span>공식 홈페이지 방문</span>
                                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Right Area: Card */}
                    <div className="w-full md:w-1/2 max-w-md mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <div className="bg-white rounded-3xl p-8 relative overflow-hidden shadow-xl border border-slate-100 animate-float">
                            {/* Decorative gradient shine */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-400/50 to-transparent"></div>

                            <div className="relative z-10 space-y-8">
                                <div>
                                    <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">인증서 조회</h2>
                                    <p className="text-slate-600 text-sm mt-1 font-medium">발급된 인증번호를 입력하여 후원 내역을 확인하세요.</p>
                                </div>

                                <SearchForm />

                                <div className="pt-6 border-t border-slate-100 space-y-4">
                                    <p className="text-center text-xs text-slate-400 font-medium">
                                        Secure Verification powered by DonateCheck
                                    </p>

                                    {/* Quick Links - Inside Card */}
                                    <div className="grid grid-cols-3 gap-2">
                                        <Link href="/faq" className="flex flex-col items-center gap-1.5 px-2 py-3 bg-orange-50/50 hover:bg-orange-100/50 rounded-xl border border-orange-100/50 hover:border-orange-200 transition-all text-xs font-semibold text-slate-700 hover:text-orange-600">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            FAQ
                                        </Link>
                                        <Link href="/donors" className="flex flex-col items-center gap-1.5 px-2 py-3 bg-amber-50/50 hover:bg-amber-100/50 rounded-xl border border-amber-100/50 hover:border-amber-200 transition-all text-xs font-semibold text-slate-700 hover:text-amber-600">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                            </svg>
                                            명예의 전당
                                        </Link>
                                        <Link href="/guestbook" className="flex flex-col items-center gap-1.5 px-2 py-3 bg-red-50/50 hover:bg-red-100/50 rounded-xl border border-red-100/50 hover:border-red-200 transition-all text-xs font-semibold text-slate-700 hover:text-red-600">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                            방명록
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </main>
            </section>

            {/* Thank You Cards Section */}
            <section className="relative z-10 py-24 px-4 bg-white/50 backdrop-blur-sm border-t border-orange-100">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold tracking-wide uppercase mb-4">
                            THANK YOU
                        </div>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                            따뜻한 마음을 보내주신 분들
                        </h2>
                        <p className="text-slate-600 max-w-2xl mx-auto">
                            학생 자치를 위해 후원해주신 모든 분들께 깊은 감사를 드립니다.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {recentDonors.length > 0 ? (
                            recentDonors.map((donor, idx) => (
                                <ThankYouCard key={idx} donorName={anonymize(donor.name)} />
                            ))
                        ) : (
                            <>
                                <ThankYouCard donorName="김*수" />
                                <ThankYouCard donorName="이*영" />
                                <ThankYouCard donorName="박*준" />
                            </>
                        )}
                    </div>

                    <div className="mt-12 text-center">
                        <Link
                            href="/donors"
                            className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-bold hover:underline"
                        >
                            전체 후원자 보기
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
