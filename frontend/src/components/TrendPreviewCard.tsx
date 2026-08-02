'use client';

import { useState } from 'react';
import type { TrendItem } from '@/lib/notion';

interface Props {
  items: TrendItem[];
}

export default function TrendPreviewCard({ items }: Props) {
  const [open, setOpen] = useState(false);
  const latest = items[0];

  return (
    <>
      <div
        className="group bg-white border border-gray-200 rounded-2xl p-7 hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <h2 className="text-lg font-bold mb-2 group-hover:text-emerald-700">기출 경향</h2>
        <p className="text-sm text-gray-400 mb-4">최신 시험 출제 경향을 분석했습니다.</p>

        {latest ? (
          <div className="relative rounded-lg bg-gray-50 p-4 overflow-hidden select-none">
            <p className="text-sm text-gray-600 line-clamp-4">
              {latest.summary || latest.title}
            </p>
            <div className="absolute inset-0 backdrop-blur-[3px] bg-white/20 flex items-end justify-center pb-2">
              <span className="text-xs text-gray-500 bg-white/90 px-3 py-1 rounded-full shadow-sm">
                🔒 로그인 후 확인 가능
              </span>
            </div>
          </div>
        ) : (
          <div className="rounded-lg bg-gray-50 p-4 space-y-2">
            <div className="h-3 bg-gray-200 rounded w-full" />
            <div className="h-3 bg-gray-200 rounded w-4/5" />
            <div className="h-3 bg-gray-200 rounded w-3/5" />
          </div>
        )}

        <p className="text-emerald-600 text-sm font-medium mt-4 group-hover:underline">
          자세히 보기 →
        </p>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white rounded-2xl p-10 shadow-2xl max-w-sm w-full mx-4 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-4xl mb-4">🔐</p>
            <h3 className="text-xl font-bold mb-3">준비 중입니다</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              기출 경향 자료는 추후 카카오톡 로그인 후<br />
              이용하실 수 있습니다.
            </p>
            <button
              className="mt-6 px-6 py-2 bg-yellow-400 text-black font-semibold rounded-xl hover:bg-yellow-300 transition"
              onClick={() => setOpen(false)}
            >
              확인
            </button>
          </div>
        </div>
      )}
    </>
  );
}
