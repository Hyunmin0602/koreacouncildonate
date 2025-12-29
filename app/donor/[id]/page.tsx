import { redirect } from 'next/navigation';
import { getCertificateFromSheet } from '@/lib/google-sheets';
import { verifyDonorId } from '@/lib/auth';
import ThankYouCard from '@/components/ThankYouCard';
import MenuCard from '@/components/MenuCard';
import ShareButton from '@/components/ShareButton';
import FadeInWhenVisible from '@/components/FadeInWhenVisible';

interface DonorPageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: DonorPageProps) {
    const { id } = await params;
    const authResult = verifyDonorId(id);

    if (!authResult) {
        return {
            title: '인증 오류 | 대한학생회',
            description: '유효하지 않은 인증 정보입니다.',
        };
    }

    const { name } = authResult;

    return {
        title: `${name}님의 후원 인증서 | 대한학생회`,
        description: '대한학생회 공식 후원 인증서를 확인하세요. 투명한 후원금 사용 내역을 공개합니다.',
        openGraph: {
            title: `${name}님의 후원 인증서가 도착했습니다`,
            description: '따뜻한 마음을 나누어주셔서 감사합니다. 지금 인증서를 확인해보세요.',
            images: [
                {
                    url: `/api/og?name=${encodeURIComponent(name)}`,
                    width: 1200,
                    height: 630,
                    alt: `${name}님의 후원 인증서`,
                },
            ],
        },
    };
}

export default async function DonorPortalPage({ params }: DonorPageProps) {
    const { id } = await params;

    const authResult = verifyDonorId(id);

    if (!authResult) {
        // Debugging: Temporarily show error instead of redirect
        return (
            <div className="min-h-screen flex items-center justify-center bg-red-50">
                <div className="bg-white p-8 rounded-xl shadow-lg border border-red-200">
                    <h1 className="text-xl font-bold text-red-600 mb-2">인증 오류 (Auth Verification Failed)</h1>
                    <p className="text-gray-600">유효하지 않은 인증 정보입니다.</p>
                    <p className="text-sm text-gray-500 mt-2">ID Verification Failed</p>
                    <a href="/" className="mt-4 inline-block text-blue-600 underline">홈으로 돌아가기</a>
                </div>
            </div>
        );
        // redirect('/');
    }

    const { name, certNumber } = authResult;

    // Fetch donor data using the existing getCertificateFromSheet function
    const donorData = await getCertificateFromSheet(certNumber);

    if (!donorData) {
        // Debugging: Temporarily show error instead of redirect
        return (
            <div className="min-h-screen flex items-center justify-center bg-red-50">
                <div className="bg-white p-8 rounded-xl shadow-lg border border-red-200">
                    <h1 className="text-xl font-bold text-red-600 mb-2">데이터 오류 (Data Not Found)</h1>
                    <p className="text-gray-600">해당 인증번호의 후원자 정보를 찾을 수 없습니다.</p>
                    <p className="text-sm text-gray-500 mt-2">
                        Google Sheets에서 인증번호 <strong>{certNumber}</strong>를 찾지 못했습니다.
                    </p>
                    <a href="/" className="mt-4 inline-block text-blue-600 underline">홈으로 돌아가기</a>
                </div>
            </div>
        );
        // redirect('/');
    }

    // Verify name matches (Double check against sheet data)
    // Even though signature is valid, we ensure the sheet data hasn't changed or we aren't displaying mismatching data
    const sheetName = donorData.name.replace(/\s+/g, '').toLowerCase();
    const paramName = name.replace(/\s+/g, '').toLowerCase();

    if (sheetName !== paramName) {
        // Debugging: Temporarily show error instead of redirect
        return (
            <div className="min-h-screen flex items-center justify-center bg-red-50">
                <div className="bg-white p-8 rounded-xl shadow-lg border border-red-200">
                    <h1 className="text-xl font-bold text-red-600 mb-2">검증 오류 (Name Mismatch)</h1>
                    <p className="text-gray-600">입력하신 성함과 등록된 성함이 일치하지 않습니다.</p>
                    <div className="mt-4 p-4 bg-gray-100 rounded text-sm font-mono text-left">
                        <p>Sheet Name: {sheetName}</p>
                        <p>Input Name: {paramName}</p>
                        <p>Sheet Raw: {donorData.name}</p>
                        <p>Input Raw: {name}</p>
                    </div>
                    <a href="/" className="mt-4 inline-block text-blue-600 underline">홈으로 돌아가기</a>
                </div>
            </div>
        );
        // redirect('/');
    }

    return (
        <div className="min-h-screen relative overflow-hidden bg-orange-50 font-sans selection:bg-orange-200">

            {/* Dynamic Background Elements */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                {/* Background Blobs (Warm Bistro Theme) */}
                <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-orange-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
                <div className="absolute top-[30%] right-[-10%] w-[500px] h-[500px] bg-stone-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-[-10%] left-[10%] w-[600px] h-[600px] bg-amber-100/60 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>

                {/* Warm Noise/Paper Texture Overlay */}
                <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.4] mix-blend-soft-light"></div>
            </div>

            <main className="max-w-3xl mx-auto px-4 py-20 relative z-10">

                {/* 1. Hero / Intro Section */}
                <div className="text-center mb-24 animate-fade-in-up">
                    <div className="flex flex-col items-center gap-4 mb-8">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-orange-200/50 text-orange-700 text-xs font-bold shadow-sm hover:shadow-md transition-shadow">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse shadow-sm"></span>
                            주문 접수 완료
                        </div>
                        <ShareButton />
                    </div>
                    <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight mb-6 tracking-tight">
                        <span className="text-orange-600">{donorData.name}</span>님과<br />
                        요리하는 학생자치 🥖
                    </h1>
                    <p className="text-lg text-slate-600 leading-relaxed max-w-lg mx-auto font-medium">
                        보내주신 소중한 재료(후원금)로<br />
                        학생들의 자치 시스템이라는 특별한 요리를 만들고 있습니다.
                    </p>
                </div>

                {/* Timeline Layout */}
                <div className="relative space-y-12">
                    {/* Vertical Line - Clean Gradient */}
                    <div className="absolute left-8 md:left-1/2 top-4 bottom-4 w-px bg-gradient-to-b from-orange-300 via-stone-200 to-stone-300 -translate-x-1/2 hidden md:block"></div>
                    <div className="absolute left-6 top-4 bottom-4 w-px bg-gradient-to-b from-orange-300 via-stone-200 to-stone-300 md:hidden"></div>

                    {/* Timeline Item 1: Certificate (Order) */}
                    <FadeInWhenVisible delay={0}>
                        <div className="relative flex flex-col md:flex-row items-center md:justify-between group">
                            {/* Timeline Icon */}
                            <div className="absolute left-6 md:left-1/2 w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-600 to-slate-700 shadow-lg shadow-slate-200 flex items-center justify-center text-white md:-translate-x-1/2 z-20 transform -translate-x-1/2 group-hover:scale-110 transition-transform">
                                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                </svg>
                            </div>

                            {/* Content */}
                            <div className="ml-16 md:ml-0 md:w-[45%] md:text-right pr-6 md:pr-12 md:mr-auto">
                                <div className="bg-white p-6 rounded-3xl shadow-sm hover:shadow-xl border border-slate-100 hover:border-orange-200 transition-all duration-300 relative overflow-hidden group-hover:-translate-y-1">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-slate-600 to-slate-700"></div>
                                    <h3 className="text-xl font-extrabold text-slate-900 mb-2 tracking-tight">01. 주문 접수 (인증서)</h3>
                                    <p className="text-slate-600 text-sm mb-4 leading-relaxed">따뜻한 마음이 주방에 전달되었습니다.<br />발행된 후원 인증서를 확인해보세요.</p>
                                    <a href={`/donor/${id}/certificate`} className="inline-flex items-center text-slate-700 font-bold hover:text-slate-900 transition-colors bg-slate-50 hover:bg-slate-100 px-4 py-2 rounded-xl text-sm">
                                        주문표 확인하기
                                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                    </a>
                                </div>
                            </div>
                            <div className="hidden md:block md:w-[45%] text-slate-500 text-xs pl-12 font-bold tracking-widest uppercase">
                                Step 01
                            </div>
                        </div>
                    </FadeInWhenVisible>

                    {/* Timeline Item 2: Spending (Ingredients) */}
                    <FadeInWhenVisible delay={0.1}>
                        <div className="relative flex flex-col md:flex-row-reverse items-center md:justify-between group">
                            {/* Timeline Icon */}
                            <div className="absolute left-6 md:left-1/2 w-14 h-14 rounded-2xl bg-gradient-to-br from-stone-600 to-stone-700 shadow-lg shadow-stone-200 flex items-center justify-center text-white md:-translate-x-1/2 z-20 transform -translate-x-1/2 group-hover:scale-110 transition-transform">
                                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>

                            {/* Content */}
                            <div className="ml-16 md:ml-0 md:w-[45%] md:text-left pl-6 md:pl-12 md:ml-auto">
                                <div className="bg-white p-6 rounded-3xl shadow-sm hover:shadow-xl border border-slate-100 hover:border-stone-300 transition-all duration-300 relative overflow-hidden group-hover:-translate-y-1">
                                    <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-orange-500 to-orange-600"></div>
                                    <h3 className="text-xl font-extrabold text-slate-900 mb-2 tracking-tight">02. 재료 준비 (사용내역)</h3>
                                    <p className="text-slate-600 text-sm mb-4 leading-relaxed">신선하고 건강한 재료들이 준비되었습니다.<br />후원금이 어떻게 쓰였는지 확인해보세요.</p>
                                    <a href={`/donor/${id}/spending`} className="inline-flex items-center text-orange-600 font-bold hover:text-orange-700 transition-colors bg-orange-50 hover:bg-orange-100 px-4 py-2 rounded-xl text-sm">
                                        재료 확인하기
                                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                    </a>
                                </div>
                            </div>
                            <div className="hidden md:block md:w-[45%] md:text-right text-orange-500 text-xs pr-12 font-bold tracking-widest uppercase">
                                Step 02
                            </div>
                        </div>
                    </FadeInWhenVisible>

                    {/* Timeline Item 3: Letter (Cooking) */}
                    <FadeInWhenVisible delay={0.2}>
                        <div className="relative flex flex-col md:flex-row items-center md:justify-between group">
                            {/* Timeline Icon */}
                            <div className="absolute left-6 md:left-1/2 w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 shadow-lg shadow-amber-200 flex items-center justify-center text-white md:-translate-x-1/2 z-20 transform -translate-x-1/2 group-hover:scale-110 transition-transform">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2v-5a2 2 0 00-2-2H5a2 2 0 00-2 2v5a2 2 0 002 2z" />
                                </svg>
                            </div>

                            {/* Content */}
                            <div className="ml-16 md:ml-0 md:w-[45%] md:text-right pr-6 md:pr-12 md:mr-auto">
                                <div className="bg-white p-6 rounded-3xl shadow-sm hover:shadow-xl border border-slate-100 hover:border-amber-200 transition-all duration-300 relative overflow-hidden group-hover:-translate-y-1">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-amber-500 to-amber-600"></div>
                                    <h3 className="text-xl font-extrabold text-slate-900 mb-2 tracking-tight">03. 셰프의 정성 (편지)</h3>
                                    <p className="text-slate-600 text-sm mb-4 leading-relaxed">따뜻한 마음을 담은 감사 메시지를<br />확인해보세요.</p>
                                    <a href={`/donor/${id}/letter`} className="inline-flex items-center text-amber-600 font-bold hover:text-amber-700 transition-colors bg-amber-50 hover:bg-amber-100 px-4 py-2 rounded-xl text-sm">
                                        편지 읽기
                                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                    </a>
                                </div>
                            </div>
                            <div className="hidden md:block md:w-[45%] text-amber-500 text-xs pl-12 font-bold tracking-widest uppercase">
                                Step 03
                            </div>
                        </div>
                    </FadeInWhenVisible>

                    {/* Timeline Item 4: Video (Dish Served) */}
                    <FadeInWhenVisible delay={0.3}>
                        <div className="relative flex flex-col md:flex-row-reverse items-center md:justify-between group">
                            {/* Timeline Icon */}
                            <div className="absolute left-6 md:left-1/2 w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 shadow-lg shadow-red-200 flex items-center justify-center text-white md:-translate-x-1/2 z-20 transform -translate-x-1/2 group-hover:scale-110 transition-transform">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4a8 8 0 00-8 8v1a2 2 0 002 2h12a2 2 0 002-2v-1a8 8 0 00-8-8z M12 2v2" />
                                </svg>
                            </div>

                            {/* Content */}
                            <div className="ml-16 md:ml-0 md:w-[45%] md:text-left pl-6 md:pl-12 md:ml-auto">
                                <div className="bg-white p-6 rounded-3xl shadow-sm hover:shadow-xl border border-slate-100 hover:border-red-200 transition-all duration-300 relative overflow-hidden group-hover:-translate-y-1">
                                    <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-red-500 to-red-600"></div>
                                    <h3 className="text-xl font-extrabold text-slate-900 mb-2 tracking-tight">04. 요리 완성 (영상)</h3>
                                    <p className="text-slate-600 text-sm mb-4 leading-relaxed">학생 자치 시스템을 만드는 과정을<br />영상으로 만나보세요.</p>
                                    <a href={`/donor/${id}/video`} className="inline-flex items-center text-red-600 font-bold hover:text-red-700 transition-colors bg-red-50 hover:bg-red-100 px-4 py-2 rounded-xl text-sm">
                                        영상 보기
                                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                    </a>
                                </div>
                            </div>
                            <div className="hidden md:block md:w-[45%] md:text-right text-red-500 text-xs pr-12 font-bold tracking-widest uppercase">
                                Step 04
                            </div>
                        </div>
                    </FadeInWhenVisible>

                </div>

                {/* Useful Links Section */}
                <div className="mt-16 mb-12">
                    <h3 className="text-center text-lg font-extrabold text-slate-900 mb-4">더 알아보기</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-3xl mx-auto">
                        <a href="/faq" className="block bg-white rounded-xl p-4 shadow-sm hover:shadow-lg border border-slate-100 hover:border-orange-200 transition-all duration-300 group hover:-translate-y-0.5">
                            <div className="flex items-center gap-2 mb-1">
                                <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                                    <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h4 className="text-sm font-extrabold text-slate-900">자주 묻는 질문</h4>
                            </div>
                            <p className="text-xs text-slate-600">궁금한 점을 빠르게 찾아보세요</p>
                        </a>

                        <a href="/donors" className="block bg-white rounded-xl p-4 shadow-sm hover:shadow-lg border border-slate-100 hover:border-amber-200 transition-all duration-300 group hover:-translate-y-0.5">
                            <div className="flex items-center gap-2 mb-1">
                                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                                    <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                </div>
                                <h4 className="text-sm font-extrabold text-slate-900">명예의 전당</h4>
                            </div>
                            <p className="text-xs text-slate-600">함께하는 후원자분들</p>
                        </a>

                        <a href="/guestbook" className="block bg-white rounded-xl p-4 shadow-sm hover:shadow-lg border border-slate-100 hover:border-red-200 transition-all duration-300 group hover:-translate-y-0.5">
                            <div className="flex items-center gap-2 mb-1">
                                <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center group-hover:bg-red-200 transition-colors">
                                    <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </div>
                                <h4 className="text-sm font-extrabold text-slate-900">방명록</h4>
                            </div>
                            <p className="text-xs text-slate-600">응원 메시지 남기기</p>
                        </a>
                    </div>
                </div>

                {/* Footer / Home Link */}
                <div className="mt-20 text-center animate-fade-in-up">
                    <a href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white shadow-md hover:shadow-xl border border-slate-100 text-slate-700 hover:text-orange-600 hover:border-orange-200 hover:-translate-y-1 transition-all duration-300 font-semibold">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        <span>처음으로 돌아가기</span>
                    </a>
                </div>
            </main>
        </div>
    );
}
