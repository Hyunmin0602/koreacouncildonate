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

    const handleDownloadImage = async () => {
        if (!cardRef.current) return;

        try {
            setIsDownloading(true);

            // Wait for all images and fonts to load
            await document.fonts.ready;
            await new Promise(resolve => setTimeout(resolve, 300));

            // Generate initial image
            const dataUrl = await toPng(cardRef.current, {
                cacheBust: true,
                backgroundColor: '#ffffff',
                pixelRatio: 2,
                skipFonts: false,
                includeQueryParams: true,
                style: {
                    borderRadius: '0',
                    boxShadow: 'none',
                    margin: '0',
                }
            });

            if (!dataUrl || dataUrl === 'data:,' || dataUrl.length < 100) {
                throw new Error('Generated image is empty or invalid');
            }

            // Create A4 canvas (210mm x 297mm at 300 DPI = 2480 x 3508 pixels)
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (!ctx) throw new Error('Could not get canvas context');

            // A4 dimensions at 300 DPI
            const a4Width = 2480;
            const a4Height = 3508;
            canvas.width = a4Width;
            canvas.height = a4Height;

            // Fill with white background
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, a4Width, a4Height);

            // Load the certificate image
            const img = new Image();
            await new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = reject;
                img.src = dataUrl;
            });

            // Calculate scaling to fit within A4 (with some margin)
            const margin = 100; // 100px margin on each side
            const maxWidth = a4Width - (margin * 2);
            const maxHeight = a4Height - (margin * 2);

            const scale = Math.min(maxWidth / img.width, maxHeight / img.height);
            const scaledWidth = img.width * scale;
            const scaledHeight = img.height * scale;

            // Center the certificate on the A4 canvas
            const x = (a4Width - scaledWidth) / 2;
            const y = (a4Height - scaledHeight) / 2;

            // Draw the certificate image onto the A4 canvas
            ctx.drawImage(img, x, y, scaledWidth, scaledHeight);

            // Convert canvas to blob and download
            canvas.toBlob((blob) => {
                if (!blob) {
                    throw new Error('Failed to create image blob');
                }
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.download = `certificate_${data.certNumber}_A4.png`;
                link.href = url;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            }, 'image/png');

        } catch (error) {
            console.error('Image Download Error:', error);
            alert('이미지 저장 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
        } finally {
            setIsDownloading(false);
        }
    };

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

            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-2xl justify-center px-4">
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
                    onClick={handleDownloadImage}
                    disabled={isDownloading}
                    className="px-6 py-3 rounded-xl bg-green-600 text-white font-bold hover:bg-green-700 hover:-translate-y-1 transition-all shadow-lg shadow-green-600/30 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
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
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4 4m0 0l4-4m-4 4V4" />
                            </svg>
                            이미지로 저장
                        </>
                    )}
                </button>

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
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                            PDF로 저장
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
