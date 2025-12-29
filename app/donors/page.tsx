import Link from 'next/link';
import { getCertificateFromSheet } from '@/lib/google-sheets';
import FadeInWhenVisible from '@/components/FadeInWhenVisible';

// This would normally fetch from Google Sheets
// For now, we'll use the donor data structure
async function getAllDonors() {
    // TODO: Implement actual fetching from Google Sheets
    // This is a placeholder - in real implementation, fetch all rows from Sheet
    return [];
}

export default async function HallOfFamePage() {
    const donors = await getAllDonors();

    // Helper function to anonymize names
    const anonymize = (name: string) => {
        if (name.length === 1) return name;
        if (name.length === 2) return name[0] + '*';
        return name[0] + '*'.repeat(name.length - 1);
    };

    return (
        <div className="min-h-screen bg-orange-50 py-12 px-4">
            <div className="max-w-5xl mx-auto">
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
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                </div>
                                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">후원자 명예의 전당</h1>
                            </div>
                            <p className="text-orange-700 font-medium">함께 학생 자치를 만들어가는 소중한 분들</p>
                        </div>
                    </div>
                </FadeInWhenVisible>

                {/* Summary Stats */}
                <FadeInWhenVisible delay={0.1}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                            <div className="flex items-center gap-3">
                                <div className="text-3xl">🥇</div>
                                <div>
                                    <p className="text-sm text-slate-500 font-medium">최고 후원</p>
                                    <p className="text-2xl font-extrabold text-orange-600">Coming Soon</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                            <div className="flex items-center gap-3">
                                <div className="text-3xl">👥</div>
                                <div>
                                    <p className="text-sm text-slate-500 font-medium">총 후원자</p>
                                    <p className="text-2xl font-extrabold text-slate-900">{donors.length}명</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                            <div className="flex items-center gap-3">
                                <div className="text-3xl">❤️</div>
                                <div>
                                    <p className="text-sm text-slate-500 font-medium">따뜻한 마음</p>
                                    <p className="text-2xl font-extrabold text-amber-600">100%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </FadeInWhenVisible>

                {/* Donor List */}
                {donors.length > 0 ? (
                    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
                        <div className="p-6 border-b border-slate-100">
                            <h2 className="text-xl font-extrabold text-slate-900">후원자 목록</h2>
                            <p className="text-sm text-slate-500 mt-1">개인정보 보호를 위해 익명으로 표시됩니다</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
                            {donors.map((donor: any, index: number) => (
                                <FadeInWhenVisible key={index} delay={0.05 * (index + 1)}>
                                    <div className="flex items-center gap-3 p-4 bg-orange-50/50 rounded-xl border border-orange-100/50 hover:bg-orange-100/50 transition-colors">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold shadow-md">
                                            {index + 1}
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-extrabold text-slate-900">{anonymize(donor.name || '익명')}</p>
                                            <p className="text-xs text-slate-500">{donor.date}</p>
                                        </div>
                                        <div className="text-xl">
                                            {index < 3 ? '🥇' : index < 10 ? '🥈' : '⭐'}
                                        </div>
                                    </div>
                                </FadeInWhenVisible>
                            ))}
                        </div>
                    </div>
                ) : (
                    <FadeInWhenVisible delay={0.2}>
                        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-12 text-center">
                            <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-orange-100 flex items-center justify-center">
                                <svg className="w-12 h-12 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-extrabold text-slate-900 mb-2">곧 공개됩니다</h3>
                            <p className="text-slate-600 leading-relaxed max-w-md mx-auto">
                                후원자분들의 소중한 마음을 담아 명예의 전당을 준비하고 있습니다.
                            </p>
                        </div>
                    </FadeInWhenVisible>
                )}

                {/* Thank You Message */}
                <FadeInWhenVisible delay={0.3}>
                    <div className="mt-8 bg-gradient-to-br from-amber-100 to-amber-50 rounded-3xl p-6 border border-amber-200">
                        <div className="text-center">
                            <h4 className="font-extrabold text-slate-900 mb-2 text-lg">모든 후원자분들께 감사드립니다</h4>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                여러분의 따뜻한 마음이 학생 자치의 기반이 되고 있습니다.<br />
                                앞으로도 투명하고 책임있게 운영하겠습니다.
                            </p>
                        </div>
                    </div>
                </FadeInWhenVisible>
            </div>
        </div>
    );
}
