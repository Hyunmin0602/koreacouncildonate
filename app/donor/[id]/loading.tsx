export default function Loading() {
    return (
        <div className="min-h-screen relative overflow-hidden bg-slate-50 font-sans py-12 px-4">
            {/* Background Placeholder */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-100 rounded-full blur-[100px] opacity-50"></div>
                <div className="absolute bottom-[-10%] left-[20%] w-[500px] h-[500px] bg-indigo-100 rounded-full blur-[100px] opacity-50"></div>
            </div>

            <main className="max-w-3xl mx-auto px-4 py-20 relative z-10 animate-pulse">

                {/* Hero Skeleton */}
                <div className="text-center mb-24 flex flex-col items-center">
                    <div className="w-32 h-8 bg-slate-200 rounded-full mb-8"></div>
                    <div className="w-48 h-12 bg-slate-200 rounded-xl mb-4"></div>
                    <div className="w-64 h-6 bg-slate-200 rounded-md"></div>
                </div>

                {/* Timeline Skeleton */}
                <div className="relative space-y-12">
                    {/* Line */}
                    <div className="absolute left-8 md:left-1/2 top-4 bottom-4 w-0.5 bg-slate-200 -translate-x-1/2 hidden md:block"></div>

                    {/* Item 1 */}
                    <div className="relative flex flex-col md:flex-row items-center md:justify-between">
                        <div className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full bg-slate-200 md:-translate-x-1/2 z-20"></div>
                        <div className="ml-16 md:ml-0 md:w-[45%] md:text-right md:mr-auto w-full">
                            <div className="h-40 bg-white/50 border border-white/60 rounded-2xl w-full"></div>
                        </div>
                    </div>

                    {/* Item 2 */}
                    <div className="relative flex flex-col md:flex-row-reverse items-center md:justify-between">
                        <div className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full bg-slate-200 md:-translate-x-1/2 z-20"></div>
                        <div className="ml-16 md:ml-0 md:w-[45%] md:text-left md:ml-auto w-full">
                            <div className="h-40 bg-white/50 border border-white/60 rounded-2xl w-full"></div>
                        </div>
                    </div>

                    {/* Item 3 */}
                    <div className="relative flex flex-col md:flex-row items-center md:justify-between">
                        <div className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full bg-slate-200 md:-translate-x-1/2 z-20"></div>
                        <div className="ml-16 md:ml-0 md:w-[45%] md:text-right md:mr-auto w-full">
                            <div className="h-40 bg-white/50 border border-white/60 rounded-2xl w-full"></div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
