import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Service Maintenance',
    description: 'We are currently performing scheduled maintenance.',
}

export default function MaintenancePage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
            <div className="max-w-lg w-full text-center space-y-8">
                <div className="space-y-4">
                    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight sm:text-5xl">
                        Maintenance in Progress
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                        We're currently updating our system to provide you effectively.
                        <br className="hidden sm:inline" />
                        Please check back soon.
                    </p>
                </div>

                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative px-7 py-6 bg-white dark:bg-gray-800 ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-6">
                        <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6.75 7.5l3 2.25-3 2.25m4.5-2.25h9.75M9 16.5l3-2.25-3-2.25m4.5 2.25h9.75" />
                        </svg>
                        <div className="space-y-2">
                            <p className="text-slate-800 dark:text-gray-100 font-medium">System Update</p>
                            <p className="text-slate-600 dark:text-gray-400 text-sm">Our team is working hard to bring you the new changes.</p>
                        </div>
                    </div>
                </div>

                <div className="text-sm text-gray-500 dark:text-gray-500">
                    Expected completion: Shortly
                </div>
            </div>
        </div>
    )
}
