import { Metadata } from 'next';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import { tutorApi } from '@/lib/api';

export const metadata: Metadata = { title: '강사 소개' };

async function getTutorProfile() {
  try {
    const res = await tutorApi.getProfile();
    return res.data.data;
  } catch {
    return null;
  }
}

export default async function AboutPage() {
  const profile = await getTutorProfile();

  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-16">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row gap-10 items-start mb-16">
          <div className="w-40 h-40 rounded-full bg-blue-700 flex items-center justify-center text-white text-5xl font-bold shrink-0">
            {profile?.profileImageUrl ? (
              <Image
                src={profile.profileImageUrl}
                alt="강사 프로필"
                width={160}
                height={160}
                className="w-full h-full rounded-full object-cover"
                unoptimized
              />
            ) : 'JYP'}
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">영어강사 JYP</h1>
            <p className="text-gray-500 mb-4">중고등학생 영어 전문 · 부산광역시</p>
            {profile?.bio && (
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{profile.bio}</p>
            )}
            <div className="flex gap-4 mt-6">
              {profile?.youtubeUrl && (
                <a href={profile.youtubeUrl} target="_blank" rel="noopener noreferrer"
                  className="text-red-600 hover:underline text-sm font-medium">
                  📺 YouTube
                </a>
              )}
              {profile?.instagramUrl && (
                <a href={profile.instagramUrl} target="_blank" rel="noopener noreferrer"
                  className="text-pink-600 hover:underline text-sm font-medium">
                  📸 Instagram
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Teaching Style */}
        {profile?.teachingStyle && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">수업 방식</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line bg-blue-50 rounded-2xl p-6">
              {profile.teachingStyle}
            </p>
          </section>
        )}

        {/* Career */}
        {profile?.career && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">경력</h2>
            <div className="space-y-3">
              {(JSON.parse(profile.career) as Array<{ year: string; desc: string }>).map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <span className="text-blue-700 font-bold shrink-0">{item.year}</span>
                  <span className="text-gray-700">{item.desc}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Achievements */}
        {profile?.achievements && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">수상 / 실적</h2>
            <ul className="space-y-2">
              {(JSON.parse(profile.achievements) as string[]).map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-gray-700">
                  <span className="text-blue-500">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        )}

        {!profile?.bio && !profile?.career && !profile?.achievements && (
          <div className="text-center py-20 text-gray-400">
            <p className="text-4xl mb-4">🏗️</p>
            <p>강사 프로필이 준비 중입니다.</p>
          </div>
        )}
      </main>
    </>
  );
}
