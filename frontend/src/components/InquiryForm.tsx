'use client';

import { useState } from 'react';
import { inquiryApi } from '@/lib/api';

export default function InquiryForm() {
  const [form, setForm] = useState({
    name: '', phone: '', email: '', school: '', grade: '', message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setError('');

    try {
      await inquiryApi.submit({
        name: form.name,
        phone: form.phone,
        email: form.email || undefined,
        school: form.school || undefined,
        grade: form.grade ? Number(form.grade) : undefined,
        message: form.message,
      });
      setStatus('success');
      setForm({ name: '', phone: '', email: '', school: '', grade: '', message: '' });
    } catch {
      setStatus('error');
      setError('문의 접수에 실패했습니다. 잠시 후 다시 시도해 주세요.');
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
        <p className="text-2xl mb-2">✅</p>
        <p className="text-green-700 font-semibold text-lg">문의가 접수되었습니다!</p>
        <p className="text-green-600 mt-2 text-sm">빠른 시일 내에 연락드리겠습니다.</p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-4 text-sm text-green-700 underline"
        >
          다시 문의하기
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">이름 *</label>
          <input
            name="name" value={form.name} onChange={handleChange} required
            placeholder="홍길동"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">연락처 *</label>
          <input
            name="phone" value={form.phone} onChange={handleChange} required
            placeholder="010-0000-0000"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
          <input
            name="email" value={form.email} onChange={handleChange}
            type="email" placeholder="example@email.com"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">학교</label>
          <input
            name="school" value={form.school} onChange={handleChange}
            placeholder="OO중학교 / OO고등학교"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">학년</label>
        <select
          name="grade" value={form.grade} onChange={handleChange}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="">선택 안함</option>
          <option value="1">1학년</option>
          <option value="2">2학년</option>
          <option value="3">3학년</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">문의 내용 *</label>
        <textarea
          name="message" value={form.message} onChange={handleChange} required rows={5}
          placeholder="수강 관련 궁금한 점을 자유롭게 작성해 주세요."
          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full py-4 bg-blue-700 text-white font-semibold rounded-xl hover:bg-blue-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? '제출 중...' : '문의 접수하기'}
      </button>
    </form>
  );
}
