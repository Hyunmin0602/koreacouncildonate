
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { verifyDonorId } from '@/lib/auth';
import FadeInWhenVisible from '@/components/FadeInWhenVisible';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function VideoPage({ params }: PageProps) {
    const { id } = await params;

    const authResult = verifyDonorId(id);

    if (!authResult) {
        redirect('/');
    }

    const { name } = authResult;

    // Sample media items - can be replaced with actual YouTube links or images
    const mediaItems = [
        {
            type: 'video' as const,
            title: '2024년 학생자치 활동 하이라이트',
            description: `${name}님의 후원으로 만들어진 특별한 순간들입니다.`,
            embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Replace with actual video
            date: '2024년 12월'
        },
        {
            type: 'placeholder' as const,
            title: '더 많은 영상이 준비 중입니다',
            description: '학생들의 생생한 활동 모습을 곧 만나보실 수 있습니다.',
            icon: 'camera'
        },
        {
            type: 'placeholder' as const,
            title: '포토 갤러리',
            description: '학생 자치 활동 사진들을 확인해보세요.',
            icon: 'photo'
        }
    ];

    return (
        <div className="min-h-screen bg-orange-50 py-12 px-4">
            <div className="max-w-6xl mx-auto">
                <Link
                    href={`/donor/${id}`}
                    className="inline-flex items-center gap-2 text-slate-700 hover:text-orange-600 transition-colors mb-8 font-semibold bg-white px-4 py-2 rounded-2xl shadow-sm hover:shadow-md border border-slate-100"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    포털로 돌아가기
                </Link>

                <FadeInWhenVisible delay={0}>
                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 mb-8">
                        <div className="p-8 border-b border-slate-100 bg-gradient-to-br from-orange-50 to-orange-100/50">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-200">
                                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">요리 완성 영상</h1>
                            </div>
                            <p className="text-orange-700 font-medium">학생 자치라는 특별한 요리가 완성되는 과정</p>
                        </div>
                    </div>
                </FadeInWhenVisible>

                {/* Media Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {mediaItems.map((item, index) => (
                        <FadeInWhenVisible key={index} delay={0.1 * (index + 1)}>
                            <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-slate-100 hover:shadow-xl transition-all duration-300">
                                {item.type === 'video' ? (
                                    <>
                                        {/* Video Embed */}
                                        <div className="aspect-video bg-slate-900 relative overflow-hidden">
                                            <iframe
                                                className="w-full h-full"
                                                src={item.embedUrl}
                                                title={item.title}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            ></iframe>
                                        </div>
                                        <div className="p-6">
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
                                                    <svg className="w-4 h-4 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                                                    </svg>
                                                </div>
                                                <span className="text-xs font-bold text-orange-600">{item.date}</span>
                                            </div>
                                            <h3 className="text-xl font-extrabold text-slate-900 mb-2 tracking-tight">
                                                {item.title}
                                            </h3>
                                            <p className="text-slate-600 text-sm leading-relaxed">
                                                {item.description}
                                            </p>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        {/* Placeholder Card */}
                                        <div className="aspect-video bg-gradient-to-br from-stone-50 to-stone-100 flex items-center justify-center relative overflow-hidden">
                                            <div className="text-center p-8">
                                                <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-stone-200 flex items-center justify-center">
                                                    {item.icon === 'camera' ? (
                                                        <svg className="w-10 h-10 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                        </svg>
                                                    ) : (
                                                        <svg className="w-10 h-10 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="px-2.5 py-0.5 bg-stone-100 text-stone-600 text-[10px] font-bold rounded-full">Coming Soon</span>
                                            </div>
                                            <h3 className="text-xl font-extrabold text-slate-500 mb-2 tracking-tight">
                                                {item.title}
                                            </h3>
                                            <p className="text-slate-400 text-sm leading-relaxed">
                                                {item.description}
                                            </p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </FadeInWhenVisible>
                    ))}
                </div>

                {/* Additional Info */}
                <FadeInWhenVisible delay={0.4}>
                    <div className="mt-8 bg-orange-50/50 rounded-3xl p-6 border border-orange-100">
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-xl bg-orange-200 flex items-center justify-center flex-shrink-0">
                                <svg className="w-5 h-5 text-orange-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-extrabold text-slate-900 mb-1">새로운 영상이 계속 추가됩니다</h4>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    학생들의 다양한 활동과 성장하는 모습을 정기적으로 업데이트하고 있습니다.
                                    {name}님의 후원이 만들어낸 변화를 함께 확인해보세요.
                                </p>
                            </div>
                        </div>
                    </div>
                </FadeInWhenVisible>
            </div>
        </div>
    );
}
