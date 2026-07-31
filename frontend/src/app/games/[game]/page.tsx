import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageShell from '@/components/layout/PageShell';
import { GAMES } from '@/lib/constants';

interface Props { params: Promise<{ game: string }> }

export async function generateStaticParams() {
  return GAMES.map((g) => ({ game: g.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { game } = await params;
  const found = GAMES.find((g) => g.slug === game);
  return { title: found ? `${found.name} | Games` : 'Games' };
}

export default async function GamePage({ params }: Props) {
  const { game } = await params;
  const found = GAMES.find((g) => g.slug === game);
  if (!found) notFound();

  return (
    <PageShell>
      <nav className="text-sm text-gray-400 mb-6">
        <Link href="/games" className="hover:text-gray-700">Games</Link>
        {' / '}
        <span className="text-gray-700 font-medium">{found.name}</span>
      </nav>

      <div className="text-center py-10">
        <span className="text-7xl">{found.icon}</span>
        <h1 className="text-3xl font-bold mt-6 mb-2">{found.name}</h1>
        <p className="text-gray-500 mb-10">{found.desc}</p>

        <div className="bg-white border border-dashed border-gray-200 rounded-2xl p-16 text-gray-400 max-w-xl mx-auto">
          <p className="text-4xl mb-3">🚧</p>
          <p className="font-medium">게임이 준비 중입니다.</p>
          <p className="text-sm mt-1">곧 플레이할 수 있습니다!</p>
        </div>

        <Link
          href="/games"
          className="inline-block mt-8 px-6 py-2.5 bg-pink-500 text-white font-semibold rounded-xl hover:bg-pink-600 transition-colors text-sm"
        >
          ← 게임 목록으로
        </Link>
      </div>
    </PageShell>
  );
}
