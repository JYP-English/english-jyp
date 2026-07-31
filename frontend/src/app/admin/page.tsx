'use client';

import { useState } from 'react';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [authed, setAuthed] = useState(false);
  const [error, setError] = useState('');

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    // TODO: replace with real JWT auth call
    if (password === 'admin1234') {
      setAuthed(true);
      setError('');
    } else {
      setError('비밀번호가 올바르지 않습니다.');
    }
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl border border-gray-200 p-10 w-full max-w-sm shadow-sm">
          <h1 className="text-2xl font-bold mb-1">관리자 로그인</h1>
          <p className="text-gray-400 text-sm mb-8">카르마 영어학원 관리자 전용 페이지입니다.</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">비밀번호</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-gray-900"
                placeholder="관리자 비밀번호"
                autoFocus
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full py-2.5 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-700 transition-colors"
            >
              로그인
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <h1 className="text-lg font-bold">카르마 학원 관리자</h1>
        <button
          onClick={() => setAuthed(false)}
          className="text-sm text-gray-500 hover:text-gray-900"
        >
          로그아웃
        </button>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ADMIN_SECTIONS.map((sec) => (
            <div
              key={sec.label}
              className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-gray-400 transition-colors cursor-pointer"
            >
              <span className="text-3xl">{sec.icon}</span>
              <h2 className="font-bold mt-3 mb-1">{sec.label}</h2>
              <p className="text-sm text-gray-400">{sec.desc}</p>
              <p className="text-xs text-gray-300 mt-3">준비 중</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

const ADMIN_SECTIONS = [
  { icon: '📝', label: '게시물 관리', desc: '공지사항, 학원 게시판 글 작성 및 수정' },
  { icon: '📊', label: '모의고사 자료', desc: '기출문제 및 분석 자료 업로드' },
  { icon: '🏫', label: '내신 자료', desc: '학교별 기출 경향, 문법, 기출문제 관리' },
  { icon: '🎓', label: '졸업생 후기', desc: '후기 등록 및 노출 관리' },
  { icon: '🏆', label: '우수 학생', desc: '우수 학생 등록 및 관리' },
  { icon: '📬', label: '문의 관리', desc: '학생·학부모 문의 확인 및 답변' },
];
