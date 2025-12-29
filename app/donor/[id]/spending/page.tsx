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
        <div className="min-h-screen bg-emerald-50/50 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <Link
                    href={`/donor/${id}`}
                    className="inline-flex items-center text-gray-600 hover:text-emerald-700 transition-colors mb-8"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    포털로 돌아가기
                </Link>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-emerald-100">
                    <div className="p-8 border-b border-gray-100 bg-emerald-50">
                        <h1 className="text-2xl font-bold text-gray-900">후원금 사용내역</h1>
                        <p className="text-emerald-700 mt-2">투명하게 공개하는 후원금 사용 내역입니다</p>
                    </div>

                    <div className="p-8">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="pb-4 font-semibold text-gray-600">사용처</th>
                                        <th className="pb-4 font-semibold text-gray-600 text-right">금액</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {spendingData.items.map((item, index) => (
                                        <tr key={index} className="hover:bg-gray-50 transition-colors">
                                            <td className="py-4 text-emerald-600 font-medium">{item.usage}</td>
                                            <td className="py-4 text-gray-900 font-bold text-right">
                                                {parseInt(item.amount).toLocaleString()}원
                                            </td>
                                        </tr>
                                    ))}
                                    <tr className="bg-gray-50">
                                        <td className="py-4 px-4 font-bold text-gray-900">총계</td>
                                        <td className="py-4 px-4 font-bold text-blue-600 text-right">{formattedTotal}</td>
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
