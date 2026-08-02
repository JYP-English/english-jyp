export const SCHOOLS = [
  { slug: '센텀중',  name: '센텀중학교' },
  { slug: '센텀고',  name: '센텀고등학교' },
  { slug: '남일고',  name: '남일고등학교' },
  { slug: '충렬고',  name: '충렬고등학교' },
  { slug: '해운대고', name: '해운대고등학교' },
  { slug: '센텀여고', name: '센텀여자고등학교' },
  { slug: '해강고',  name: '해강고등학교' },
] as const;

export type SchoolSlug = typeof SCHOOLS[number]['slug'];

export const SCHOOL_TABS = [
  { slug: 'trend',      label: '기출 경향' },
  { slug: 'grammar',    label: '학기별 문법 포인트' },
  { slug: 'past-exams', label: '기출문제' },
  { slug: 'workbook',   label: '워크북' },
] as const;

export const GAMES = [
  { slug: 'vocabulary-check', name: '단어인증소',   icon: '⭐', desc: '단어의 뜻을 맞춰보세요' },
  { slug: 'infinite-words',   name: '무한의단어',   icon: '♾️', desc: '끝없이 이어지는 단어 퀴즈' },
  { slug: 'same-same',        name: 'sameSAME',    icon: '⇄',  desc: '같은 뜻의 단어를 찾아요' },
  { slug: 'blank-lol',        name: '빈칸LOL',      icon: '🎮', desc: '문장의 빈칸을 채워보세요' },
  { slug: 'word-order-pop',   name: '어순버블팝',   icon: '🫧', desc: '올바른 순서로 버블을 팝!' },
  { slug: 'find-subject',     name: '주어찾기',     icon: '🔍', desc: '문장에서 주어를 찾아요' },
  { slug: 'find-verb',        name: '동사찾기',     icon: '🏃', desc: '문장에서 동사를 찾아요' },
  { slug: 'find-preposition', name: '전치사찾기',   icon: '📍', desc: '전치사를 정확히 찾아요' },
] as const;

export const MOCK_GRADES = ['중1', '중2', '중3', '고1', '고2', '고3'];
export const MOCK_BOARDS = ['서울', '인천', '경기', '부산', '대구', '광주', '대전', '전국연합'];
