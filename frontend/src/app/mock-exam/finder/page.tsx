'use client';

import { useState } from 'react';
import PageShell from '@/components/layout/PageShell';

export default function FinderPage() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setResult(null);
    // TODO: AI API 연동
    await new Promise((r) => setTimeout(r, 1500));
    setResult('AI 분석 기능은 준비 중입니다. 곧 서비스됩니다!');
    setLoading(false);
  }

  return (
    <PageShell>
      <div className="mb-8">
        <nav className="text-sm text-gray-400 mb-3">
          <span>모의고사</span> / <span className="text-gray-700 font-medium">AI 시험 찾기</span>
        </nav>
        <h1 className="text-3xl font-bold mb-2">AI 시험 찾기</h1>
        <p className="text-gray-500">
          기억나는 문장을 입력하면 AI가 몇 년도 몇 월 시험인지 찾아드립니다.
        </p>
      </div>

      <div className="max-w-2xl">
        <form onSubmit={handleSearch} className="bg-white border border-gray-200 rounded-2xl p-8">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            기억나는 문장을 입력하세요
          </label>
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="예) The study found that people who exercise regularly tend to..."
            rows={4}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none mb-4"
          />
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="w-full py-3 bg-blue-700 text-white font-semibold rounded-xl hover:bg-blue-800 transition-colors disabled:opacity-50"
          >
            {loading ? 'AI 분석 중...' : '🤖 AI로 찾기'}
          </button>
        </form>

        {result && (
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-2xl p-6">
            <p className="text-blue-700 font-medium">{result}</p>
          </div>
        )}
      </div>
    </PageShell>
  );
}
