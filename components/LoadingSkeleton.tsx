// Reusable Loading Skeleton Component
// Provides pulse animation and flexible sizing

export interface SkeletonProps {
    className?: string;
    width?: string;
    height?: string;
    rounded?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
}

export default function LoadingSkeleton({
    className = '',
    width = 'w-full',
    height = 'h-4',
    rounded = 'md'
}: SkeletonProps) {
    const roundedClass = {
        'sm': 'rounded-sm',
        'md': 'rounded-md',
        'lg': 'rounded-lg',
        'xl': 'rounded-xl',
        '2xl': 'rounded-2xl',
        '3xl': 'rounded-3xl',
        'full': 'rounded-full'
    }[rounded];

    return (
        <div
            className={`${width} ${height} ${roundedClass} bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 animate-pulse ${className}`}
            style={{ backgroundSize: '200% 100%' }}
        />
    );
}

// Specific skeleton components for common use cases
export function CardSkeleton() {
    return (
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
            <LoadingSkeleton height="h-8" width="w-3/4" rounded="lg" className="mb-4" />
            <LoadingSkeleton height="h-4" width="w-full" className="mb-2" />
            <LoadingSkeleton height="h-4" width="w-5/6" className="mb-2" />
            <LoadingSkeleton height="h-4" width="w-4/6" />
        </div>
    );
}

export function TimelineItemSkeleton() {
    return (
        <div className="relative flex flex-col md:flex-row-reverse items-center md:justify-between">
            {/* Icon */}
            <div className="absolute left-6 md:left-1/2 w-14 h-14 rounded-2xl bg-slate-200 animate-pulse -translate-x-1/2" />

            {/* Content */}
            <div className="ml-16 md:ml-0 md:w-[45%] md:text-left pl-6 md:pl-12 md:ml-auto w-full">
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                    <LoadingSkeleton height="h-6" width="w-2/3" rounded="lg" className="mb-3" />
                    <LoadingSkeleton height="h-4" width="w-full" className="mb-2" />
                    <LoadingSkeleton height="h-4" width="w-4/5" className="mb-4" />
                    <LoadingSkeleton height="h-10" width="w-32" rounded="xl" />
                </div>
            </div>
        </div>
    );
}

export function ButtonSkeleton({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
    const sizeClasses = {
        'sm': 'h-8 w-24',
        'md': 'h-10 w-32',
        'lg': 'h-12 w-40'
    };

    return <LoadingSkeleton height={sizeClasses[size]} rounded="xl" />;
}
