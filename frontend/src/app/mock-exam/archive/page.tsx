'use client';

import { useCallback, useEffect, useState } from 'react';
import PageShell from '@/components/layout/PageShell';
import { MOCK_GRADES, MOCK_BOARDS } from '@/lib/constants';

interface MockExamRow {
  id: string;
  시험명: string;
  학년: string;
  학년도: number | null;
  월: number | null;
  교육청: string;
  문제지: string | null;
  정답: string | null;
  듣기: string | null;
}

const YEARS = Array.from({ length: 7 }, (_, i) => 27 - i); // 27~21학년도

// ── 필터 버튼 (데스크탑) ────────────────────────────────────────────────────────
function FilterBtn({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1.5 text-sm rounded-full border transition-colors ${
        active
          ? 'bg-emerald-700 text-white border-emerald-700 font-semibold'
          : 'border-gray-200 hover:border-emerald-400 hover:text-emerald-700'
      }`}
    >
      {label}
    </button>
  );
}

// ── 셀렉트박스 (모바일) ─────────────────────────────────────────────────────────
function MobileSelect({
  label, value, onChange, options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="flex-1 min-w-0">
      <p className="text-xs font-semibold text-gray-500 mb-1">{label}</p>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none border border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 pr-8"
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  );
}

// ── 파일 버튼 ───────────────────────────────────────────────────────────────────
function FileBtn({ url, label, emoji }: { url: string | null; label: string; emoji: string }) {
  if (!url) return (
    <span className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-lg text-gray-300 bg-gray-50 cursor-not-allowed select-none">
      {emoji}
    </span>
  );
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      title={label}
      className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-lg text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-colors font-medium"
    >
      {emoji} {label}
    </a>
  );
}

// ── 메인 ────────────────────────────────────────────────────────────────────────
export default function MockExamArchivePage() {
  const [items, setItems] = useState<MockExamRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [grade, setGrade] = useState('');
  const [year, setYear] = useState<number | null>(null);
  const [board, setBoard] = useState('');

  const fetchData = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (grade) params.set('학년', grade);
    if (year) params.set('학년도', String(year));
    if (board) params.set('교육청', board);

    const res = await fetch(`/api/mock-exam/archive?${params}`);
    const json = await res.json();
    setItems(json.success ? json.data : []);
    setLoading(false);
  }, [grade, year, board]);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { fetchData(); }, [fetchData]);

  function toggle<T>(cur: T, val: T, set: (v: T) => void) {
    set(cur === val ? (typeof val === 'string' ? '' : null) as T : val);
  }

  const gradeOptions = [{ value: '', label: '전체 학년' }, ...MOCK_GRADES.map((g) => ({ value: g, label: g }))];
  const yearOptions = [{ value: '', label: '전체 학년도' }, ...YEARS.map((y) => ({ value: String(y), label: `${y}학년도` }))];
  const boardOptions = [{ value: '', label: '전체 교육청' }, ...MOCK_BOARDS.map((b) => ({ value: b, label: b }))];

  return (
    <PageShell>
      <div className="mb-8">
        <nav className="text-sm text-gray-400 mb-3">
          <span>모의고사</span> / <span className="text-gray-700 font-medium">자료실</span>
        </nav>
        <h1 className="text-3xl font-bold mb-2">모의고사 자료실</h1>
        <p className="text-gray-500">학년별 · 학년도별 · 교육청 모의고사를 한곳에서 찾아보세요.</p>
      </div>

      {/* 필터 — 데스크탑: 버튼, 모바일: 셀렉트 */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-6">

        {/* 모바일 셀렉트 */}
        <div className="flex gap-3 md:hidden">
          <MobileSelect
            label="학년"
            value={grade}
            onChange={setGrade}
            options={gradeOptions}
          />
          <MobileSelect
            label="학년도"
            value={year !== null ? String(year) : ''}
            onChange={(v) => setYear(v === '' ? null : Number(v))}
            options={yearOptions}
          />
          <MobileSelect
            label="교육청"
            value={board}
            onChange={setBoard}
            options={boardOptions}
          />
        </div>

        {/* 데스크탑 버튼 */}
        <div className="hidden md:flex flex-wrap gap-6">
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">학년</p>
            <div className="flex flex-wrap gap-2">
              <FilterBtn label="전체" active={grade === ''} onClick={() => setGrade('')} />
              {MOCK_GRADES.map((g) => (
                <FilterBtn key={g} label={g} active={grade === g} onClick={() => toggle(grade, g, setGrade)} />
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">학년도</p>
            <div className="flex flex-wrap gap-2">
              <FilterBtn label="전체" active={year === null} onClick={() => setYear(null)} />
              {YEARS.map((y) => (
                <FilterBtn key={y} label={`${y}학년도`} active={year === y} onClick={() => toggle(year, y, setYear)} />
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">교육청</p>
            <div className="flex flex-wrap gap-2">
              <FilterBtn label="전체" active={board === ''} onClick={() => setBoard('')} />
              {MOCK_BOARDS.map((b) => (
                <FilterBtn key={b} label={b} active={board === b} onClick={() => toggle(board, b, setBoard)} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 자료 목록 */}
      {loading ? (
        <div className="py-16 text-center text-gray-400 text-sm">불러오는 중...</div>
      ) : items.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-2xl px-6 py-16 text-center text-gray-400">
          <p className="text-4xl mb-3">📂</p>
          <p className="font-medium">자료가 아직 등록되지 않았습니다.</p>
          <p className="text-sm mt-1">관리자가 자료를 업로드하면 여기에 표시됩니다.</p>
        </div>
      ) : (
        <>
          {/* 데스크탑 테이블 */}
          <div className="hidden md:block bg-white border border-gray-200 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 grid grid-cols-[2fr_1fr_1.5fr_1fr_160px] text-sm font-semibold text-gray-600 gap-4">
              <span>시험명</span>
              <span className="flex justify-center">학년</span>
              <span className="flex justify-center">학년도 / 월</span>
              <span className="flex justify-center">교육청</span>
              <span className="flex justify-center">파일</span>
            </div>
            <div className="divide-y divide-gray-100">
              {items.map((row) => (
                <div
                  key={row.id}
                  className="px-6 py-4 grid grid-cols-[2fr_1fr_1.5fr_1fr_160px] gap-4 items-center hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-sm text-gray-800">{row.시험명}</span>
                  <span className="text-sm text-gray-600 flex justify-center">{row.학년}</span>
                  <span className="text-sm text-gray-600 flex justify-center">
                    {row.학년도 != null ? `${row.학년도}학년도` : ''}
                    {row.월 != null ? ` ${row.월}월` : ''}
                  </span>
                  <span className="text-sm text-gray-600 flex justify-center">{row.교육청}</span>
                  <div className="flex items-center justify-center gap-1.5">
                    <FileBtn url={row.문제지} label="문제지" emoji="📄" />
                    <FileBtn url={row.정답} label="정답" emoji="✅" />
                    <FileBtn url={row.듣기} label="듣기" emoji="🔊" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 모바일 카드 */}
          <div className="md:hidden space-y-2">
            {items.map((row) => (
              <div
                key={row.id}
                className="bg-white border border-gray-200 rounded-xl px-4 py-4"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="font-semibold text-sm text-gray-800 leading-snug">{row.시험명}</span>
                  <div className="flex gap-1 shrink-0">
                    {row.학년 && (
                      <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">{row.학년}</span>
                    )}
                  </div>
                </div>
                <p className="text-xs text-gray-400 mb-3">
                  {row.학년도 != null ? `${row.학년도}학년도` : ''}
                  {row.월 != null ? ` ${row.월}월` : ''}
                  {row.교육청 ? ` · ${row.교육청}` : ''}
                </p>
                <div className="flex flex-col gap-1.5">
                  <FileBtn url={row.문제지} label="문제지" emoji="📄" />
                  <FileBtn url={row.정답} label="정답" emoji="✅" />
                  <FileBtn url={row.듣기} label="듣기" emoji="🔊" />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </PageShell>
  );
}
