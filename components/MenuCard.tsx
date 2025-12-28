'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface MenuCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    href: string;
    color: 'blue' | 'purple' | 'emerald' | 'rose';
    disabled?: boolean;
}

export default function MenuCard({ title, description, icon, href, color, disabled }: MenuCardProps) {
    const colorStyles = {
        blue: 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white',
        purple: 'bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white',
        emerald: 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white',
        rose: 'bg-rose-50 text-rose-600 group-hover:bg-rose-600 group-hover:text-white',
    };

    const cardContent = (
        <motion.div
            whileHover={!disabled ? { y: -5 } : undefined}
            className={`group bg-white rounded-2xl p-6 shadow-lg border border-gray-100 h-full relative overflow-hidden
                ${!disabled ? 'hover:shadow-xl transition-all duration-300 cursor-pointer' : 'opacity-70 cursor-not-allowed bg-gray-50'}
            `}
        >
            {disabled && (
                <div className="absolute top-4 right-4 z-10">
                    <span className="px-3 py-1 bg-gray-200 text-gray-500 text-xs font-bold rounded-full">
                        준비중
                    </span>
                </div>
            )}

            <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl transition-colors duration-300 
                    ${!disabled ? colorStyles[color] : 'bg-gray-100 text-gray-400'}
                `}>
                    <div className="w-8 h-8">
                        {icon}
                    </div>
                </div>
                {!disabled && (
                    <div className="opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                )}
            </div>

            <h3 className={`text-xl font-bold mb-2 transition-colors 
                ${!disabled ? 'text-gray-900 group-hover:text-blue-600' : 'text-gray-400'}
            `}>
                {title}
            </h3>
            <p className={`text-sm leading-relaxed
                ${!disabled ? 'text-gray-500' : 'text-gray-400'}
            `}>
                {description}
            </p>
        </motion.div>
    );

    if (disabled) {
        return <div>{cardContent}</div>;
    }

    return (
        <Link href={href}>
            {cardContent}
        </Link>
    );
}
