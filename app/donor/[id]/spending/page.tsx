

import Link from 'next/link';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function SpendingPage({ params }: PageProps) {
    const { id } = await params;

    // Hardcoded sample data as requested
    const spendingData = [
        { category: '학생 행사 운영', amount: '1,500,000원', detail: '제7회 학생회 정보 교류의 장' },
        { category: '학생 복지 지원', amount: '800,000원', detail: '시험기간 간식 사업' },
        { category: '운영비', amount: '200,000원', detail: '회의실 대관 및 사무용품' },
        { category: '동아리 지원', amount: '500,000원', detail: '우수 동아리 시상금' },
    ];

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
                                        <th className="pb-4 font-semibold text-gray-600">카테고리</th>
                                        <th className="pb-4 font-semibold text-gray-600">상세내용</th>
                                        <th className="pb-4 font-semibold text-gray-600 text-right">금액</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {spendingData.map((item, index) => (
                                        <tr key={index} className="hover:bg-gray-50 transition-colors">
                                            <td className="py-4 text-emerald-600 font-medium">{item.category}</td>
                                            <td className="py-4 text-gray-600">{item.detail}</td>
                                            <td className="py-4 text-gray-900 font-bold text-right">{item.amount}</td>
                                        </tr>
                                    ))}
                                    <tr className="bg-gray-50">
                                        <td colSpan={2} className="py-4 px-4 font-bold text-gray-900">총계</td>
                                        <td className="py-4 px-4 font-bold text-blue-600 text-right">3,000,000원</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-8 p-4 bg-gray-50 rounded-lg text-sm text-gray-500 text-center">
                            * 본 내역은 예시 데이터이며, 실제 후원금 내역은 추후 연동될 예정입니다.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
