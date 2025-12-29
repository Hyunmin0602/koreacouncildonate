'use client';

import { useActionState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { checkAndRedirect } from '@/app/actions';

// Define the state type explicitly for better type checking
interface FormState {
    error?: string;
    success?: boolean;
    redirectUrl?: string;
}

const initialState: FormState = {
    error: '',
};

export default function SearchForm() {
    const router = useRouter();
    const [state, formAction, isPending] = useActionState(checkAndRedirect, initialState);

    // Handle redirection when state changes indicate success
    useEffect(() => {
        if (state?.success && state?.redirectUrl) {
            // Force a hard navigation to ensure we leave the page
            window.location.href = state.redirectUrl;
        }
    }, [state]);

    return (
        <form action={formAction} className="space-y-6">
            <div className="space-y-5">
                <div className="space-y-1.5 group">
                    <label htmlFor="name" className="block text-sm font-medium text-slate-600 ml-1">
                        성함
                    </label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        placeholder="홍길동"
                        className="w-full px-4 py-3 bg-white/50 border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all duration-300"
                        required
                        autoComplete="name"
                    />
                </div>

                <div className="space-y-1.5 group">
                    <label htmlFor="certId" className="block text-sm font-medium text-slate-600 ml-1">
                        인증번호
                    </label>
                    <div className="relative">
                        <input
                            id="certId"
                            type="text"
                            name="certId"
                            placeholder="예: 2024-DONATE-001"
                            className={`w-full px-4 py-3 bg-white/50 border rounded-xl text-slate-800 placeholder:text-slate-400 focus:bg-white focus:ring-4 focus:outline-none transition-all duration-300 ${state?.error
                                ? 'border-red-300 focus:border-red-500 focus:ring-red-500/10'
                                : 'border-slate-200 focus:border-blue-500 focus:ring-blue-500/10'
                                }`}
                            required
                            autoComplete="off"
                        />
                        {isPending && (
                            <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        )}
                    </div>
                </div>

                {state?.error && (
                    <div className="p-3 bg-red-50 border border-red-100 rounded-xl flex items-start gap-2 animate-fade-in-up">
                        <svg className="w-5 h-5 text-red-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-red-600 text-sm font-medium">
                            {state.error}
                        </p>
                    </div>
                )}
            </div>

            <button
                type="submit"
                disabled={isPending || (state?.success ?? false)}
                className="group w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:from-blue-800 active:to-indigo-800 text-white text-lg font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 transform flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
            >
                <span>
                    {isPending || state?.success ? '확인 중...' : '인증서 조회하기'}
                </span>
                {!(isPending || state?.success) && (
                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                )}
            </button>
        </form>
    );
}
