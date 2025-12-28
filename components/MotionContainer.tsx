'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface MotionContainerProps {
    children: ReactNode;
    className?: string;
}

export default function MotionContainer({ children, className }: MotionContainerProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
