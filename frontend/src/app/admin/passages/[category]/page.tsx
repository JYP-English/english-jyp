'use client';

import { use, useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAdminAuth } from '@/stores/adminAuthStore';
import { passageApi, type Passage } from '@/lib/adminApi';
import { PASSAGE_CATEGORIES } from '../page';

interface Props { params: Promise<{ category: string }> }

export default function PassageCategoryPage({ params }: Props) {
  const { category: slug } = use(params);
  const { isAuthed } = useAdminAuth();
  const router = useRouter();

  const cat = PASSAGE_CATEGORIES.find((c) => c.slug === slug);

  const [passages, setPassages] = useState<Passage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 폼 상태
  const [showForm, setShowForm] = useState(false);
  const [editTarget, setEditTarget] = useState<Passage | null>(null);
  const [formTitle, setFormTitle] = useState('');
  const [formContent, setFormContent] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isAuthed) { router.replace('/admin'); return; }
    if (!cat) { router.replace('/admin/passages'); return; }
  }, [isAuthed, cat, router]);

  const fetchPassages = useCallback(async () => {
    if (!cat) return;
    try {
      setLoading(true);
      const res = await passageApi.list(cat.value);
      setPassages(res.items.sort((a, b) => a.sortOrder - b.sortOrder));
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : '불러오기 실패');
    } finally {
      setLoading(false);
    }
  }, [cat]);

  useEffect(() => { fetchPassages(); }, [fetchPassages]);

  function openCreate() {
    setEditTarget(null);
    setFormTitle('');
    setFormContent('');
    setShowForm(true);
  }

  function openEdit(p: Passage) {
    setEditTarget(p);
    setFormTitle(p.title);
    setFormContent(p.content);
    setShowForm(true);
  }

  async function handleSave() {
    if (!cat || !formTitle.trim() || !formContent.trim()) return;
    setSaving(true);
    try {
      if (editTarget) {
        await passageApi.update(editTarget.id, { title: formTitle, content: formContent });
      } else {
        await passageApi.create({ category: cat.value, title: formTitle, content: formContent });
      }
      setShowForm(false);
      await fetchPassages();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : '저장 실패');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    try {
      await passageApi.delete(id);
      await fetchPassages();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : '삭제 실패');
    }
  }

  async function handleMove(index: number, direction: 'up' | 'down') {
    const next = [...passages];
    const swap = direction === 'up' ? index - 1 : index + 1;
    if (swap < 0 || swap >= next.length) return;
    [next[index], next[swap]] = [next[swap], next[index]];
    const updated = next.map((p, i) => ({ ...p, sortOrder: i }));
    setPassages(updated);
    try {
      await passageApi.reorder(updated.map((p) => ({ id: p.id, sortOrder: p.sortOrder })));
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : '순서 변경 실패');
      await fetchPassages();
    }
  }

  if (!cat || !isAuthed) return null;

  return (
    <div className="p-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <Link href="/admin/passages" className="text-sm text-gray-400 hover:text-gray-700">← 지문 관리</Link>
          <h1 className="text-2xl font-bold mt-1">
            {cat.icon} {cat.label} 지문
          </h1>
          <p className="text-gray-400 text-sm">총 {passages.length}개의 지문</p>
        </div>
        <button
          onClick={openCreate}
          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 text-sm"
        >
          + 지문 추가
        </button>
      </div>

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 rounded-xl p-4 text-red-600 text-sm flex justify-between">
          <span>{error}</span>
          <button onClick={() => setError('')} className="text-red-400 hover:text-red-600">✕</button>
        </div>
      )}

      {/* 지문 목록 */}
      {loading ? (
        <div className="text-gray-400 text-sm py-10 text-center">불러오는 중...</div>
      ) : passages.length === 0 ? (
        <div className="text-center py-16 bg-white border border-dashed border-gray-200 rounded-2xl text-gray-400">
          <p className="text-3xl mb-2">📄</p>
          <p>등록된 지문이 없습니다.</p>
          <button onClick={openCreate} className="mt-4 text-blue-600 text-sm hover:underline">지문 추가하기</button>
        </div>
      ) : (
        <div className="space-y-3">
          {passages.map((p, i) => (
            <div key={p.id} className="bg-white border border-gray-200 rounded-2xl p-5 flex gap-4">
              {/* 순서 버튼 */}
              <div className="flex flex-col gap-1 shrink-0 pt-0.5">
                <button
                  onClick={() => handleMove(i, 'up')}
                  disabled={i === 0}
                  className="text-gray-300 hover:text-gray-600 disabled:opacity-20 text-xs px-1"
                >▲</button>
                <span className="text-xs text-gray-300 text-center">{i + 1}</span>
                <button
                  onClick={() => handleMove(i, 'down')}
                  disabled={i === passages.length - 1}
                  className="text-gray-300 hover:text-gray-600 disabled:opacity-20 text-xs px-1"
                >▼</button>
              </div>

              {/* 내용 */}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 truncate">{p.title}</p>
                <p className="text-sm text-gray-400 mt-1 line-clamp-2">{p.content}</p>
              </div>

              {/* 액션 */}
              <div className="flex items-start gap-2 shrink-0">
                <button
                  onClick={() => openEdit(p)}
                  className="text-sm text-blue-600 hover:text-blue-800 px-2 py-1 border border-blue-200 rounded-lg"
                >수정</button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="text-sm text-red-500 hover:text-red-700 px-2 py-1 border border-red-200 rounded-lg"
                >삭제</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 추가/수정 폼 모달 */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h2 className="font-bold text-lg">{editTarget ? '지문 수정' : '지문 추가'}</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-700 text-xl">✕</button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">제목 (지문 첫 문장 또는 주제)</label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="예) Commercial businesses aim for predictability..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">지문 내용</label>
                <textarea
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                  rows={10}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none font-mono text-sm"
                  placeholder="영어 지문 전문을 입력하세요..."
                />
              </div>
            </div>
            <div className="px-6 py-4 border-t flex justify-end gap-3">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-sm border border-gray-300 rounded-xl hover:bg-gray-50"
              >취소</button>
              <button
                onClick={handleSave}
                disabled={saving || !formTitle.trim() || !formContent.trim()}
                className="px-4 py-2 text-sm bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 disabled:opacity-50"
              >
                {saving ? '저장 중...' : editTarget ? '수정 완료' : '추가하기'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
