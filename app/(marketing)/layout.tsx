import { Header } from '@/components/layout/header';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; 2026 {process.env.NEXT_PUBLIC_APP_NAME || 'Octopus'}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
