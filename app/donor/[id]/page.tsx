import { redirect } from 'next/navigation';
import { getCertificateFromSheet } from '@/lib/google-sheets';
import { verifyDonorId } from '@/lib/auth';
import ThankYouCard from '@/components/ThankYouCard';
import MenuCard from '@/components/MenuCard';

interface DonorPageProps {
    params: Promise<{ id: string }>;
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
        <div className="min-h-screen relative overflow-hidden bg-slate-50 font-sans selection:bg-blue-100">

            {/* Dynamic Background Elements - Fixed position to stay while scrolling */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-400 rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-blob"></div>
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-400 rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-[-10%] left-[20%] w-[500px] h-[500px] bg-indigo-400 rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            <main className="max-w-3xl mx-auto px-4 py-20 relative z-10">

                {/* 1. Hero / Intro Section */}
                <div className="text-center mb-24 animate-fade-in-up">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/40 backdrop-blur-md border border-white/50 text-slate-600 text-sm font-medium mb-8 shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                        Verification Complete
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
                        <span className="text-blue-600">{donorData.name}</span>님의<br />
                        소중한 후원 여정
                    </h1>
                    <p className="text-lg text-slate-600 leading-relaxed max-w-lg mx-auto">
                        투명하게 기록된 후원 내역을 타임라인으로 확인해보세요.<br />
                        여러분의 나눔이 만든 변화를 증명합니다.
                    </p>
                </div>

                {/* Timeline Layout */}
                <div className="relative space-y-12">
                    {/* Vertical Line */}
                    <div className="absolute left-8 md:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-blue-200 via-purple-200 to-transparent -translate-x-1/2 hidden md:block"></div>
                    <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-slate-200 md:hidden"></div>

                    {/* Timeline Item 1: Certificate */}
                    <div className="relative flex flex-col md:flex-row items-center md:justify-between group">
                        {/* Timeline Dot */}
                        <div className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full bg-white border-4 border-blue-500 shadow-[0_0_0_4px_rgba(59,130,246,0.2)] md:-translate-x-1/2 z-20"></div>

                        {/* Content */}
                        <div className="ml-16 md:ml-0 md:w-[45%] md:text-right pr-6 md:pr-12 md:mr-auto">
                            <div className="glass-panel p-6 rounded-2xl hover:shadow-lg transition-all duration-300">
                                <h3 className="text-xl font-bold text-slate-900 mb-2">후원 인증서</h3>
                                <p className="text-slate-500 text-sm mb-4">공식 후원 인증서를 발급받고 확인하세요.</p>
                                <a href={`/donor/${id}/certificate`} className="inline-flex items-center text-blue-600 font-semibold hover:underline">
                                    인증서 보기
                                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                </a>
                            </div>
                        </div>
                        <div className="hidden md:block md:w-[45%] text-slate-400 text-sm pl-12">
                            Step 01
                        </div>
                    </div>

                    {/* Timeline Item 2: Spending Report */}
                    <div className="relative flex flex-col md:flex-row-reverse items-center md:justify-between group">
                        {/* Timeline Dot */}
                        <div className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full bg-white border-4 border-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.2)] md:-translate-x-1/2 z-20"></div>

                        {/* Content */}
                        <div className="ml-16 md:ml-0 md:w-[45%] md:text-left pl-6 md:pl-12 md:ml-auto">
                            <div className="glass-panel p-6 rounded-2xl hover:shadow-lg transition-all duration-300">
                                <h3 className="text-xl font-bold text-slate-900 mb-2">후원금 사용내역</h3>
                                <p className="text-slate-500 text-sm mb-4">후원금이 어디에, 어떻게 쓰였는지 투명하게 공개합니다.</p>
                                <a href={`/donor/${id}/spending`} className="inline-flex items-center text-emerald-600 font-semibold hover:underline">
                                    내역 확인하기
                                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                </a>
                            </div>
                        </div>
                        <div className="hidden md:block md:w-[45%] md:text-right text-slate-400 text-sm pr-12">
                            Step 02
                        </div>
                    </div>

                    {/* Timeline Item 3: Letter */}
                    <div className="relative flex flex-col md:flex-row items-center md:justify-between group">
                        {/* Timeline Dot */}
                        <div className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full bg-slate-200 border-4 border-slate-50 md:-translate-x-1/2 z-20"></div>

                        {/* Content */}
                        <div className="ml-16 md:ml-0 md:w-[45%] md:text-right pr-6 md:pr-12 md:mr-auto">
                            <div className="glass-panel p-6 rounded-2xl opacity-75 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                                <div className="absolute top-4 left-4"><span className="px-2 py-1 bg-slate-100 text-slate-500 text-[10px] font-bold rounded-full">준비중</span></div>
                                <h3 className="text-xl font-bold text-slate-700 mb-2">감사의 편지</h3>
                                <p className="text-slate-500 text-sm mb-4">학생들이 직접 작성한 손편지입니다.</p>
                                <span className="inline-flex items-center text-slate-400 font-medium cursor-not-allowed">
                                    오픈 예정
                                </span>
                            </div>
                        </div>
                        <div className="hidden md:block md:w-[45%] text-slate-400 text-sm pl-12">
                            Step 03
                        </div>
                    </div>

                    {/* Timeline Item 4: Video */}
                    <div className="relative flex flex-col md:flex-row-reverse items-center md:justify-between group">
                        {/* Timeline Dot */}
                        <div className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full bg-slate-200 border-4 border-slate-50 md:-translate-x-1/2 z-20"></div>

                        {/* Content */}
                        <div className="ml-16 md:ml-0 md:w-[45%] md:text-left pl-6 md:pl-12 md:ml-auto">
                            <div className="glass-panel p-6 rounded-2xl opacity-75 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                                <div className="absolute top-4 right-4"><span className="px-2 py-1 bg-slate-100 text-slate-500 text-[10px] font-bold rounded-full">준비중</span></div>
                                <h3 className="text-xl font-bold text-slate-700 mb-2">애프터 영상</h3>
                                <p className="text-slate-500 text-sm mb-4">후원으로 만들어진 순간을 영상으로 만나보세요.</p>
                                <span className="inline-flex items-center text-slate-400 font-medium cursor-not-allowed">
                                    오픈 예정
                                </span>
                            </div>
                        </div>
                        <div className="hidden md:block md:w-[45%] md:text-right text-slate-400 text-sm pr-12">
                            Step 04
                        </div>
                    </div>

                </div>

                {/* Footer / Home Link */}
                <div className="mt-20 text-center animate-fade-in-up">
                    <a href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white shadow-md text-slate-600 hover:text-blue-600 hover:scale-105 transition-all duration-300">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        <span>홈으로 돌아가기</span>
                    </a>
                </div>
            </main>
        </div>
    );
}
