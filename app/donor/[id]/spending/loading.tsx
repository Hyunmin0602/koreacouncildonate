import LoadingSkeleton from '@/components/LoadingSkeleton';

export default function SpendingLoading() {
    return (
        <div className="min-h-screen bg-orange-50 py-12 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header Skeleton */}
                <div className="mb-8">
                    <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
                        <LoadingSkeleton height="h-8" width="w-1/3" rounded="xl" className="mb-2" />
                        <LoadingSkeleton height="h-5" width="w-2/3" />
                    </div>
                </div>

                {/* Table Skeleton */}
                <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
                    {/* Table Header */}
                    <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 p-6 border-b border-slate-100">
                        <div className="grid grid-cols-4 gap-4">
                            <LoadingSkeleton height="h-6" width="w-20" />
                            <LoadingSkeleton height="h-6" width="w-24" />
                            <LoadingSkeleton height="h-6" width="w-20" />
                            <LoadingSkeleton height="h-6" width="w-24" />
                        </div>
                    </div>

                    {/* Table Rows */}
                    <div className="divide-y divide-slate-100">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="p-6">
                                <div className="grid grid-cols-4 gap-4 items-center">
                                    <LoadingSkeleton height="h-5" width="w-24" />
                                    <LoadingSkeleton height="h-5" width="w-full" />
                                    <LoadingSkeleton height="h-5" width="w-20" />
                                    <LoadingSkeleton height="h-5" width="w-32" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Back Button Skeleton */}
                <div className="mt-8 text-center">
                    <div className="h-12 w-48 bg-slate-200 rounded-2xl animate-pulse mx-auto" />
                </div>
            </div>
        </div>
    );
}
