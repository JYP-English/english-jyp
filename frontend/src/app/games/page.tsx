import Link from 'next/link';
import PageShell from '@/components/layout/PageShell';
import { GAMES } from '@/lib/constants';

export const metadata = { title: 'Games' };

export default function GamesPage() {
  return (
    <PageShell>
      <div className="mb-10">
        <p className="text-pink-500 font-medium text-sm mb-1">Games</p>
        <h1 className="text-4xl font-bold mb-3">영어 학습 게임</h1>
        <p className="text-gray-500">게임으로 재미있게 영어 실력을 키워보세요!</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {GAMES.map((game) => (
          <Link
            key={game.slug}
            href={`/games/${game.slug}`}
            className="group bg-white border border-gray-200 rounded-2xl p-6 text-center hover:border-pink-300 hover:shadow-md transition-all"
          >
            <span className="text-5xl">{game.icon}</span>
            <h2 className="font-bold mt-4 mb-1 group-hover:text-pink-600">{game.name}</h2>
            <p className="text-xs text-gray-400">{game.desc}</p>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
