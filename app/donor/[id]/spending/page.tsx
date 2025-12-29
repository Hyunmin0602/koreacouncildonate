import Link from 'next/link';
import { redirect } from 'next/navigation';
import { verifyDonorId } from '@/lib/auth';
import { getSpendingData } from '@/lib/google-sheets';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function SpendingPage({ params }: PageProps) {
    const { id } = await params;

    const authResult = verifyDonorId(id);

    if (!authResult) {
        redirect('/');
    }

    // Hardcoded sample data as requested
    const { name, certNumber } = authResult;

    // Fetch real spending data
    const spendingData = await getSpendingData(certNumber);

    if (!spendingData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-red-50">
                <div className="bg-white p-8 rounded-xl shadow-lg border border-red-200">
                    <h1 className="text-xl font-bold text-red-600 mb-2">데이터 오류</h1>
                    <p className="text-gray-600">사용 내역 정보를 불러올 수 없습니다.</p>
                    <Link href={`/donor/${id}`} className="mt-4 inline-block text-blue-600 underline">돌아가기</Link>
                </div>
            </div>
        );
    }

    // Verify name match again for security
    const sheetName = spendingData.name.replace(/\s+/g, '').toLowerCase();
    const paramName = name.replace(/\s+/g, '').toLowerCase();

    if (sheetName !== paramName) {
        redirect('/');
    }

    // Calculate Total
    const totalAmount = spendingData.items.reduce((sum, item) => {
        const value = parseInt(item.amount.replace(/[^0-9]/g, ''), 10) || 0;
        return sum + value;
    }, 0);
    const formattedTotal = totalAmount.toLocaleString() + '원';

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

                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
                    <div className="p-8 border-b border-slate-100 bg-gradient-to-br from-orange-50 to-orange-100/50">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-200">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                </svg>
                            </div>
                            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">후원금 사용내역</h1>
                        </div>
                        <p className="text-orange-700 font-medium">투명하게 공개하는 후원금 사용 내역입니다</p>
                    </div>

                    <div className="p-8">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b-2 border-slate-200">
                                        <th className="pb-4 font-extrabold text-slate-700 text-sm tracking-wide">사용처</th>
                                        <th className="pb-4 font-extrabold text-slate-700 text-sm tracking-wide text-right">금액</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {spendingData.items.map((item, index) => (
                                        <tr key={index} className="hover:bg-orange-50/50 transition-colors group">
                                            <td className="py-4 text-slate-700 font-semibold group-hover:text-orange-700 transition-colors">{item.usage}</td>
                                            <td className="py-4 text-slate-900 font-bold text-right tracking-tight">
                                                {parseInt(item.amount).toLocaleString()}원
                                            </td>
                                        </tr>
                                    ))}
                                    <tr className="bg-gradient-to-r from-orange-50 to-stone-50 border-t-2 border-orange-200">
                                        <td className="py-5 px-4 font-extrabold text-slate-900 text-lg">총계</td>
                                        <td className="py-5 px-4 font-extrabold text-orange-600 text-right text-xl tracking-tight">{formattedTotal}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
}
