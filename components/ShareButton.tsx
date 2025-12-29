'use client';

import { useState } from 'react';

export default function ShareButton() {
    const [copied, setCopied] = useState(false);
    const [sharing, setSharing] = useState(false);

    const handleShare = async () => {
        if (sharing) return;

        setSharing(true);
        const url = window.location.href;
        const title = document.title;
        const text = '대한학생회 후원 인증서를 확인해보세요!';

        // Try Native Share API first (Mobile)
        if (navigator.share) {
            try {
                await navigator.share({
                    title,
                    text,
                    url,
                });
                setSharing(false);
                return;
            } catch (error) {
                // User cancelled or error occurred
                setSharing(false);
                if ((error as Error).name === 'AbortError') {
                    return; // User cancelled, don't show copied message
                }
            }
        }

        // Fallback to Clipboard (Desktop)
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        } catch (error) {
            console.error('Failed to copy:', error);
            alert('링크를 복사할 수 없습니다. 브라우저 설정을 확인해주세요.');
        } finally {
            setSharing(false);
        }
    };

    return (
        <button
            onClick={handleShare}
            disabled={sharing}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl font-bold transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {copied ? (
                <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>링크 복사 완료!</span>
                </>
            ) : (
                <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    <span>공유하기</span>
                </>
            )}
        </button>
    );
}
