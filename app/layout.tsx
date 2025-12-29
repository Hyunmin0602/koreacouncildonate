import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "대한학생회 후원 인증",
  description: "대한학생회 후원자를 위한 투명한 인증서 조회 시스템입니다. 모든 후원 내역을 확인하고 사용 현황을 투명하게 공개합니다.",
  icons: {
    icon: '/images/logo.png',
    apple: '/images/logo.png',
  },
  openGraph: {
    title: "대한학생회 후원 인증",
    description: "투명한 후원금 사용, 확실한 증명. 대한학생회 후원 인증서를 확인하세요.",
    type: "website",
    locale: "ko_KR",
    siteName: "대한학생회 후원 인증",
    images: [
      {
        url: '/images/logo.png',
        width: 1200,
        height: 630,
        alt: '대한학생회 로고',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "대한학생회 후원 인증",
    description: "투명한 후원금 사용, 확실한 증명",
    images: ['/images/logo.png'],
  },
  other: {
    'kakao:title': '대한학생회 후원 인증',
    'kakao:description': '투명한 후원금 사용, 확실한 증명',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
