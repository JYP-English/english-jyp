'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { GrammarItem } from '@/lib/notion';

interface Props {
  items: GrammarItem[];
  school: string;
}

const MAX_YEARS = 3;

export default function GrammarList({ items, school }: Props) {
  const [showAll, setShowAll] = useState(false);

  if (items.length === 0) {
    return (
      <div className="bg-white border border-dashed border-gray-200 rounded-2xl p-16 text-center text-gray-400">
        <p className="text-4xl mb-3">📝</p>
        <p className="font-medium">문법 포인트 자료가 준비 중입니다.</p>
      </div>
    );
  }

  const allYears = [...new Set(items.map((i) => i.year))].sort((a, b) => b - a);
  const visibleYears = showAll ? allYears : allYears.slice(0, MAX_YEARS);
  const hiddenYears = allYears.length - MAX_YEARS;

  return (
    <div className="space-y-10">
      {visibleYears.map((year) => {
        const yearItems = items.filter((i) => i.year === year);
        return (
          <section key={year}>
            <h2 className="text-base font-bold text-gray-700 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              {year}년
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {yearItems.map((item) => {
                const points = item.points
                  ? item.points.split(',').map((p) => p.trim()).filter(Boolean)
                  : [];
                return (
                  <Link
                    key={item.id}
                    href={`/school-support/${school}/grammar/${item.id}`}
                    className="group bg-white border border-gray-200 rounded-xl p-5 hover:border-emerald-300 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <h3 className="font-semibold text-gray-800 text-sm group-hover:text-emerald-700 transition-colors">
                        {item.title}
                      </h3>
                      <div className="flex gap-1 shrink-0">
                        {item.semester && (
                          <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full">
                            {item.semester}
                          </span>
                        )}
                        {item.grade && (
                          <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
                            {item.grade}
                          </span>
                        )}
                      </div>
                    </div>

                    {points.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5">
                        {points.map((pt, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                          >
                            {pt}
                          </span>
                        ))}
                      </div>
                    ) : item.points ? (
                      <p className="text-sm text-gray-500 line-clamp-3">{item.points}</p>
                    ) : null}

                    <p className="text-emerald-600 text-xs font-medium mt-4 group-hover:underline">
                      자세히 보기 →
                    </p>
                  </Link>
                );
              })}
            </div>
          </section>
        );
      })}

      {!showAll && hiddenYears > 0 && (
        <button
          className="w-full py-3 border border-gray-300 rounded-xl text-sm font-medium text-gray-500 hover:border-emerald-400 hover:text-emerald-600 transition"
          onClick={() => setShowAll(true)}
        >
          더 보기 ({hiddenYears}년치)
        </button>
      )}
    </div>
  );
}
