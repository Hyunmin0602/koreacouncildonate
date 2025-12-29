import LoadingSkeleton, { CardSkeleton, ButtonSkeleton } from '@/components/LoadingSkeleton';

export default function CertificateLoading() {
    return (
        <div className="min-h-screen bg-orange-50 flex flex-col items-center justify-center p-4 gap-8">
            {/* Certificate Card Skeleton */}
            <div className="w-full max-w-2xl">
                <div className="bg-white rounded-3xl p-8 shadow-2xl border border-slate-100">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <LoadingSkeleton height="h-10" width="w-2/3" rounded="xl" className="mx-auto mb-3" />
                        <LoadingSkeleton height="h-6" width="w-1/2" rounded="lg" className="mx-auto" />
                    </div>

                    {/* Logo/Icon */}
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 bg-slate-200 rounded-2xl animate-pulse" />
                    </div>

                    {/* Content Lines */}
                    <div className="space-y-4 mb-8">
                        <LoadingSkeleton height="h-5" width="w-full" />
                        <LoadingSkeleton height="h-5" width="w-5/6" className="mx-auto" />
                        <LoadingSkeleton height="h-5" width="w-4/6" className="mx-auto" />
                    </div>

                    {/* Amount Box */}
                    <div className="bg-orange-50 rounded-2xl p-6 mb-6">
                        <LoadingSkeleton height="h-8" width="w-2/3" rounded="xl" className="mx-auto" />
                    </div>

                    {/* Details */}
                    <div className="space-y-3 mb-6">
                        <LoadingSkeleton height="h-4" width="w-full" />
                        <LoadingSkeleton height="h-4" width="w-3/4" />
                    </div>

                    {/* QR Code */}
                    <div className="flex justify-center">
                        <div className="w-32 h-32 bg-slate-200 rounded-xl animate-pulse" />
                    </div>
                </div>
            </div>

            {/* Action Buttons Skeleton */}
            <div className="flex flex-wrap gap-3 justify-center">
                <ButtonSkeleton size="lg" />
                <ButtonSkeleton size="lg" />
                <ButtonSkeleton size="lg" />
            </div>

            {/* Back Button */}
            <div className="mt-4">
                <ButtonSkeleton size="md" />
            </div>
        </div>
    );
}
