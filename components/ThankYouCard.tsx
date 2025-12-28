'use client';

import { motion } from 'framer-motion';

interface ThankYouCardProps {
    donorName: string;
}

export default function ThankYouCard({ donorName }: ThankYouCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-8 mb-12 shadow-xl border border-blue-100 relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-bl-full -mr-32 -mt-32 opacity-50" />

            <div className="relative z-10 text-center space-y-6">
                <div className="inline-block p-3 bg-blue-50 rounded-full mb-4">
                    <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                    <span className="text-blue-600">{donorName}</span>님,<br />
                    따뜻한 마음을 나누어주셔서 감사합니다
                </h1>

                <div className="max-w-2xl mx-auto text-gray-600 leading-relaxed space-y-4">
                    <p>
                        보내주신 소중한 후원금은 위기에 처한 학생들을 돕고,<br className="hidden md:block" />
                        더 나은 학교 환경을 만드는 데 투명하게 사용됩니다.
                    </p>
                    <p>
                        여러분의 따뜻한 관심과 사랑이 학생들에게 큰 희망이 됩니다.<br className="hidden md:block" />
                        진심으로 감사드립니다.
                    </p>
                </div>

                <div className="pt-8 flex justify-center items-center gap-2 text-sm text-gray-500 font-medium">
                    <span>대한학생회 드림</span>
                    <span className="block w-1 h-1 bg-gray-300 rounded-full" />
                    <span>{new Date().getFullYear()}</span>
                </div>
            </div>
        </motion.div>
    );
}
