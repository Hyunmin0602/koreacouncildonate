import { TimelineItemSkeleton } from '@/components/LoadingSkeleton';

export default function DonorPageLoading() {
    return (
        <div className="min-h-screen bg-orange-50 py-12 px-4">
            <main className="w-full max-w-6xl mx-auto">
                {/* Hero Skeleton */}
                <div className="text-center mb-16 animate-fade-in-up">
                    <div className="inline-block mb-4">
                        <div className="w-48 h-8 bg-slate-200 rounded-2xl animate-pulse" />
                    </div>
                    <div className="w-full max-w-2xl mx-auto space-y-3">
                        <div className="h-12 bg-slate-200 rounded-2xl animate-pulse mx-auto" style={{ width: '60%' }} />
                        <div className="h-6 bg-slate-200 rounded-xl animate-pulse mx-auto" style={{ width: '80%' }} />
                        <div className="h-6 bg-slate-200 rounded-xl animate-pulse mx-auto" style={{ width: '70%' }} />
                    </div>
                </div>

                {/* Timeline Skeleton */}
                <div className="relative space-y-12">
                    {/* Vertical Line */}
                    <div className="absolute left-8 md:left-1/2 top-4 bottom-4 w-px bg-slate-200 -translate-x-1/2 hidden md:block" />

                    {/* Timeline Items */}
                    <TimelineItemSkeleton />
                    <TimelineItemSkeleton />
                    <TimelineItemSkeleton />
                    <TimelineItemSkeleton />
                </div>

                {/* Footer Skeleton */}
                <div className="mt-20 text-center">
                    <div className="h-12 w-48 bg-slate-200 rounded-2xl animate-pulse mx-auto" />
                </div>
            </main>
        </div>
    );
}
