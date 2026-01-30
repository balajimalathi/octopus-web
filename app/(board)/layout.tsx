import { BoardHeader } from '@/components/layout/board-header';

export default function BoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <BoardHeader />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
