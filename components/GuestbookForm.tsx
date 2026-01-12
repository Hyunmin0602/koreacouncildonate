"use client";

import { useActionState } from 'react';
import { submitGuestbookMessage } from '@/app/actions';
import { useFormStatus } from 'react-dom';

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-orange-200 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
            {pending ? (
                <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>저장 중...</span>
                </>
            ) : (
                <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    <span>응원 메시지 남기기</span>
                </>
            )}
        </button>
    );
}

interface GuestbookFormProps {
    donorName: string;
}

export default function GuestbookForm({ donorName }: GuestbookFormProps) {
    const initialState = { success: false, error: '' };
    const [state, formAction] = useActionState(submitGuestbookMessage, initialState);

    return (
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
            <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-2xl">
                    ✍️
                </div>
                <div>
                    <h3 className="text-xl font-extrabold text-slate-900">방명록 남기기</h3>
                    <p className="text-sm text-slate-500">학생 자치를 응원하는 따뜻한 한마디를 남겨주세요.</p>
                </div>
            </div>

            <form action={formAction} className="space-y-4">
                <input type="hidden" name="donorName" value={donorName} />

                <div>
                    <textarea
                        name="message"
                        required
                        placeholder="여기에 메시지를 입력하세요... (예: 항상 응원합니다!)"
                        className="w-full h-32 px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all resize-none text-slate-700 placeholder-slate-400"
                    ></textarea>
                </div>

                {state?.error && (
                    <div className="p-3 bg-red-50 text-red-600 text-sm rounded-xl flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        {state.error}
                    </div>
                )}

                {state?.success && (
                    <div className="p-3 bg-green-50 text-green-600 text-sm rounded-xl flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        메시지가 성공적으로 등록되었습니다!
                    </div>
                )}

                <SubmitButton />
            </form>
        </div>
    );
}
