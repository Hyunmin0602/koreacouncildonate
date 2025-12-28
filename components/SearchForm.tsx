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
        <form action={formAction} className="space-y-8">
            <div className="space-y-2 group">
                <label htmlFor="name" className="block text-sm font-semibold text-slate-700 ml-1 transition-colors group-focus-within:text-blue-600">
                    후원자 성함
                </label>
                <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="성함을 입력해주세요"
                    className="w-full px-4 py-4 mb-6 bg-slate-50 border-2 border-slate-100 rounded-xl text-lg text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none transition-all duration-300"
                    required
                    autoComplete="name"
                />

                <label htmlFor="certId" className="block text-sm font-semibold text-slate-700 ml-1 transition-colors group-focus-within:text-blue-600">
                    인증번호
                </label>
                <div className="relative">
                    <input
                        id="certId"
                        type="text"
                        name="certId"
                        placeholder="예: 2024-DONATE-001"
                        className={`w-full px-4 py-4 bg-slate-50 border-2 rounded-xl text-lg text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none transition-all duration-300 ${state?.error
                            ? 'border-red-500 focus:border-red-500'
                            : 'border-slate-100 focus:border-blue-600'
                            }`}
                        required
                        autoComplete="off"
                        onChange={() => {
                            // Optional: Clear error on input change if we managed state manually
                        }}
                    />
                    {isPending && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                            <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    )}
                </div>

                {state?.error && (
                    <p className="text-red-500 text-sm ml-1 animate-fade-in-up">
                        {state.error}
                    </p>
                )}
            </div>

            <button
                type="submit"
                disabled={isPending || (state?.success ?? false)}
                className="group w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xl font-bold py-5 px-6 rounded-xl transition-all duration-300 shadow-xl shadow-blue-600/30 hover:shadow-blue-600/40 hover:-translate-y-1 transform flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
                <span>
                    {isPending || state?.success ? '확인 중...' : '인증서 확인하기'}
                </span>
                {!(isPending || state?.success) && (
                    <svg className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                )}
            </button>
        </form>
    );
}
