import Header from './Header';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function PageShell({ children, className = '' }: Props) {
  return (
    <>
      <Header />
      <main className={`max-w-7xl mx-auto px-4 py-10 ${className}`}>
        {children}
      </main>
    </>
  );
}
