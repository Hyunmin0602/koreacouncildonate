import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { encryptId } from "@/lib/crypto";

export default function Home() {
  async function searchAction(formData: FormData) {
    'use server';
    const id = formData.get('certId')?.toString();
    if (id) {
      const encryptedId = encryptId(id);
      redirect(`/cert/${encryptedId}`);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <main className="flex flex-col items-center gap-8 text-center max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800">
          후원 인증서 조회
        </h1>
        <p className="text-gray-600">
          발급받은 인증번호를 입력하여<br />인증서를 조회할 수 있습니다.
        </p>

        <form action={searchAction} className="flex flex-col gap-4 w-full">
          <input
            type="text"
            name="certId"
            placeholder="인증번호 입력 (예: 12345)"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-md"
          >
            조회하기
          </button>
        </form>

        <div className="mt-8 text-xs text-gray-400">
          Powered by 대한학생회
        </div>
      </main>
    </div>
  );
}
