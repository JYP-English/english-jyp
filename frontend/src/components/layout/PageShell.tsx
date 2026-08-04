import Link from 'next/link';
import Header from './Header';

interface Props {
  children: React.ReactNode;
  className?: string;
  backHref?: string;
}

export default function PageShell({ children, className = '', backHref }: Props) {
  return (
    <>
      <Header />
      <main className={`max-w-7xl mx-auto px-4 py-10 ${className}`}>
        {backHref && (
          <Link
            href={backHref}
            className="md:hidden inline-flex items-center gap-1.5 text-gray-400 hover:text-gray-700 mb-5 -mt-2 py-1 pr-3"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
            <span className="text-sm font-medium">뒤로</span>
          </Link>
        )}
        {children}
      </main>
    </>
  );
}
