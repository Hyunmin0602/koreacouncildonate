"use client";

import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface CertificateData {
  name: string;
  type: string; // 개인 / 단체
  agency: string; // 대한학생회
  date: string;
  certNumber: string;
}

export default function CertificateCard({ data }: { data: CertificateData }) {
  // Current URL for QR code (or verification URL). 
  // For now, we'll point to the current window location if available, or a placeholder.
  const [qrValue, setQrValue] = React.useState('https://example.com');

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setQrValue(window.location.href);
    }
  }, []);

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-2xl overflow-hidden border-4 border-double border-gray-200 p-8 relative">
      {/* Background Pattern or Watermark could go here */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none bg-center bg-no-repeat bg-contain" style={{ backgroundImage: 'url("/logo.png")' }}></div>

      <div className="text-center mb-8 relative z-10">
        <h1 className="text-2xl font-bold text-gray-800 tracking-widest mb-2 border-b-2 border-gray-800 inline-block pb-1">
          후원 인증서
        </h1>
        <p className="text-xs text-gray-500 uppercase tracking-widest">Donation Certificate</p>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-6 flex items-center justify-center space-x-2">
        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <span className="text-green-700 font-semibold text-sm">유효한 후원자 인증서</span>
      </div>

      <div className="space-y-4 relative z-10 mb-8">
        <div className="flex justify-between border-b border-gray-100 pb-2">
          <span className="text-gray-500 text-sm">성명 (Name)</span>
          <span className="font-bold text-gray-800">{data.name}</span>
        </div>
        <div className="flex justify-between border-b border-gray-100 pb-2">
          <span className="text-gray-500 text-sm">후원 구분 (Type)</span>
          <span className="font-medium text-gray-800">{data.type}</span>
        </div>
        <div className="flex justify-between border-b border-gray-100 pb-2">
          <span className="text-gray-500 text-sm">발급 기관 (Agency)</span>
          <span className="font-medium text-gray-800">{data.agency}</span>
        </div>
        <div className="flex justify-between border-b border-gray-100 pb-2">
          <span className="text-gray-500 text-sm">발급일 (Date)</span>
          <span className="font-medium text-gray-800">{data.date}</span>
        </div>
        <div className="flex justify-between border-b border-gray-100 pb-2">
          <span className="text-gray-500 text-sm">인증번호 (No.)</span>
          <span className="font-mono font-medium text-gray-600">{data.certNumber}</span>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center relative z-10 mt-8">
        <div className="p-2 bg-white rounded shadow-sm border border-gray-100">
          <QRCodeSVG value={qrValue} size={100} level="M" />
        </div>
        <p className="text-[10px] text-gray-400 mt-2">QR코드를 스캔하여 진위 여부를 확인하세요.</p>
      </div>

      <div className="mt-8 text-center">
        <div className="text-sm font-serif font-bold text-gray-800">대한학생회</div>
        <div className="text-[10px] text-gray-400">KOREA STUDENTS COUNCIL</div>
      </div>
    </div>
  );
}
