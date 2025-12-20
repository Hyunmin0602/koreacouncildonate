"use client";

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';
import CertificateCard from './CertificateCard';

interface CertificateData {
    name: string;
    content: string;
    type: string;
    agency: string;
    date: string;
    certNumber: string;
}

export default function CertificateView({ data }: { data: CertificateData }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownloadPdf = async () => {
        if (!cardRef.current) return;

        try {
            setIsDownloading(true);

            const dataUrl = await toPng(cardRef.current, {
                cacheBust: true,
                backgroundColor: '#ffffff',
                style: {
                    borderRadius: '0',
                    boxShadow: 'none',
                    margin: '0', // Ensure no margin
                }
            });

            // Calculate PDF dimensions (A4 size generally, or match the card aspect ratio)
            // A4 is 210mm x 297mm
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            const img = new Image();
            img.src = dataUrl;
            await new Promise((resolve) => { img.onload = resolve; });

            const imgWidth = img.width;
            const imgHeight = img.height;

            // Scale image to fit A4 width exactly (as requested)
            const finalWidth = pdfWidth;
            const finalHeight = (imgHeight * finalWidth) / imgWidth;

            // If finalHeight exceeds pdfHeight (which shouldn't happen often after CSS tightening),
            // it might clip. But user prioritized "Border match width".
            // Ideally the CSS change makes it fit perfectly.

            pdf.addImage(dataUrl, 'PNG', 0, 0, finalWidth, finalHeight);
            pdf.save(`certificate_${data.certNumber}.pdf`);

        } catch (error) {
            console.error('PDF Download Error:', error);
            alert('PDF 저장 중 오류가 발생했습니다.');
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 gap-8">
            {/* Wrapper to capture */}
            <div className="w-full flex justify-center bg-gray-100">
                {/* We pass the ref directly to the inner card container now for precise cropping */}
                <div className="w-full max-w-2xl">
                    <CertificateCard data={data} containerRef={cardRef} />
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md justify-center">
                <Link
                    href="/"
                    className="px-6 py-3 rounded-xl border-2 border-slate-300 text-slate-500 font-bold hover:border-blue-600 hover:text-blue-600 transition-colors flex items-center justify-center gap-2 bg-white"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    메인으로
                </Link>

                <button
                    onClick={handleDownloadPdf}
                    disabled={isDownloading}
                    className="px-6 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 hover:-translate-y-1 transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isDownloading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            저장 중...
                        </>
                    ) : (
                        <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            PDF로 저장하기
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
