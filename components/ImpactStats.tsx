"use client";

import { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface ImpactStatsProps {
    totalDonors: number;
    totalAmount: number;
}

export default function ImpactStats({ totalDonors, totalAmount }: ImpactStatsProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const [donorCount, setDonorCount] = useState(0);
    const [amountCount, setAmountCount] = useState(0);

    // Animated counter effect
    useEffect(() => {
        if (!isInView) return;

        const donorDuration = 2000;
        const donorSteps = 50;
        const donorIncrement = totalDonors / donorSteps;
        let donorCurrent = 0;

        const donorInterval = setInterval(() => {
            donorCurrent += donorIncrement;
            if (donorCurrent >= totalDonors) {
                setDonorCount(totalDonors);
                clearInterval(donorInterval);
            } else {
                setDonorCount(Math.floor(donorCurrent));
            }
        }, donorDuration / donorSteps);

        // Amount counter (if available)
        if (totalAmount > 0) {
            const amountDuration = 2000;
            const amountSteps = 50;
            const amountIncrement = totalAmount / amountSteps;
            let amountCurrent = 0;

            const amountInterval = setInterval(() => {
                amountCurrent += amountIncrement;
                if (amountCurrent >= totalAmount) {
                    setAmountCount(totalAmount);
                    clearInterval(amountInterval);
                } else {
                    setAmountCount(Math.floor(amountCurrent));
                }
            }, amountDuration / amountSteps);

            return () => {
                clearInterval(donorInterval);
                clearInterval(amountInterval);
            };
        }

        return () => clearInterval(donorInterval);
    }, [isInView, totalDonors, totalAmount]);

    return (
        <div ref={ref} className="w-full py-12 bg-gradient-to-br from-orange-50 to-orange-100/50">
            <div className="max-w-6xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-8"
                >
                    <h2 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">
                        함께 만드는 학생 자치
                    </h2>
                    <p className="text-orange-700 font-medium">
                        여러분의 따뜻한 마음이 모여 큰 변화를 만들고 있습니다
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Total Donors Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 hover:shadow-2xl transition-all duration-300"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-200">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm text-slate-500 font-medium">총 후원자</p>
                                <h3 className="text-4xl font-extrabold text-slate-900 tracking-tight">
                                    {donorCount.toLocaleString()}
                                    <span className="text-2xl text-orange-600 ml-1">명</span>
                                </h3>
                            </div>
                        </div>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            소중한 후원으로 학생 자치의 기반을 함께 만들어주셨습니다
                        </p>
                    </motion.div>

                    {/* Total Projects/Impact Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 hover:shadow-2xl transition-all duration-300"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-200">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm text-slate-500 font-medium">투명한 사용</p>
                                <h3 className="text-4xl font-extrabold text-slate-900 tracking-tight">
                                    100
                                    <span className="text-2xl text-amber-600 ml-1">%</span>
                                </h3>
                            </div>
                        </div>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            모든 후원금은 투명하게 공개되며 학생 자치 발전에 사용됩니다
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
