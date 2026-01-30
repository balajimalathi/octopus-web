import Link from 'next/link';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="mb-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold">
            O
          </div>
          <span className="text-2xl font-bold">
            {process.env.NEXT_PUBLIC_APP_NAME || 'Octopus'}
          </span>
        </Link>
      </div>
      {children}
    </div>
  );
}
