"use client";

import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import Image from 'next/image';

interface CertificateData {
  name: string;
  content: string;
  type: string; // 개인 / 단체
  agency: string; // 대한학생회
  date: string;
  certNumber: string;
}

export default function CertificateCard({ data, containerRef }: { data: CertificateData; containerRef?: React.RefObject<HTMLDivElement | null> }) {
  const [qrValue, setQrValue] = useState<string>('');
  const [viewTime, setViewTime] = useState<string>('');

  useEffect(() => {
    // Current time formatting
    const now = new Date();
    // YYYY. MM. DD. HH:mm:ss format
    const formatted = `${now.getFullYear()}. ${String(now.getMonth() + 1).padStart(2, '0')}. ${String(now.getDate()).padStart(2, '0')}. ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    setViewTime(formatted);

    // QR Code value: just the verification URL
    setQrValue(`https://donateds.vercel.app/cert/${data.certNumber}`); // Adjust domain as needed
  }, [data.certNumber]); // Added dependency

  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in-up">
      {/* Card Container */}
      <div ref={containerRef} className="bg-white rounded-xl md:rounded-2xl shadow-2xl overflow-hidden relative">

        {/* Top Decoration Bar */}
        <div className="h-4 bg-gradient-to-r from-[#2563eb] via-[#3b82f6] to-[#4f46e5]"></div>

        <div className="p-6 md:p-10 relative">
          {/* Background Logo Watermark */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-96 md:h-96 opacity-[0.03] pointer-events-none">
            <Image src="/images/logo.png" alt="Watermark" fill className="object-contain grayscale" />
          </div>

          {/* Timestamp */}
          <div className="absolute top-4 right-4 md:top-8 md:right-8 text-[10px] text-[#cbd5e1] font-mono text-right z-20">
            조회 일자 및 시각<br />
            {viewTime}
          </div>

          {/* Header */}
          <div className="text-center mb-8 relative z-10">
            <div className="flex justify-center mb-6">
              <div className="relative w-20 h-20 md:w-24 md:h-24">
                <Image src="/images/logo.png" alt="Logo" fill className="object-contain" priority />
              </div>
            </div>
            <p className="text-[#2563eb] font-bold tracking-widest text-sm uppercase mb-2">
              Official Donation Certificate
            </p>
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-[#0f172a] mb-4">
              후원 인증서
            </h1>
            <div className="w-16 h-1 bg-[#2563eb] mx-auto rounded-full"></div>
          </div>

          {/* Content Body */}
          <div className="relative z-10 space-y-6 md:space-y-8">
            <div className="text-center space-y-2">
              <p className="text-[#64748b] text-lg">
                귀하는 대한학생회의 투명한 후원 문화에 동참하여<br className="hidden md:block" />
                학생 자치의 발전을 위해 기여하였음을 인증합니다.
              </p>
            </div>

            <div className="bg-[#f8fafc] border border-[#f1f5f9] rounded-2xl p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                <div className="space-y-1">
                  <span className="text-[#94a3b8] text-sm font-medium">성명 (Name)</span>
                  <p className="text-xl md:text-2xl font-bold text-[#0f172a]">{data.name}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[#94a3b8] text-sm font-medium">후원 내용 (Content)</span>
                  <p className="text-lg font-semibold text-[#1e293b]">{data.content}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[#94a3b8] text-sm font-medium">후원 구분 (Type)</span>
                  <p className="text-lg font-semibold text-[#1e293b]">{data.type}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[#94a3b8] text-sm font-medium">발급 기관 (Agency)</span>
                  <p className="text-lg font-semibold text-[#1e293b]">{data.agency}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[#94a3b8] text-sm font-medium">발급일 (Date)</span>
                  <p className="text-lg font-semibold text-[#1e293b]">{data.date}</p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#e2e8f0] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <span className="text-[#94a3b8] text-xs font-medium uppercase tracking-wider block mb-1">Certificate ID</span>
                  <p className="font-mono text-[#64748b] font-medium tracking-wide">{data.certNumber}</p>
                </div>
                <div className="bg-[#dbeafe]/50 text-[#1d4ed8] px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                  Verified Document
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
            <div className="text-center md:text-left">
              <div className="text-2xl font-serif font-bold text-[#0f172a] mb-1">
                대한학생회
              </div>
              <p className="text-xs text-[#94a3b8] uppercase tracking-wider">
                KOREA STUDENTS COUNCIL
              </p>
            </div>

            <div className="flex items-center gap-4 bg-white p-2 rounded-xl shadow-sm border border-[#f1f5f9]">
              <QRCodeSVG value={qrValue} size={64} level="M" fgColor="#1e293b" />
              <div className="text-[10px] text-[#94a3b8] leading-tight w-24">
                스캔하여<br />
                인증서의 진위여부를<br />
                확인하세요
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Decoration */}
        <div className="h-2 bg-[#0f172a]"></div>
      </div>
    </div>
  );
}
