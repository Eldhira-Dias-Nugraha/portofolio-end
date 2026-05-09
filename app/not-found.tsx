import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 bg-[#050505]">
      <h1 className="text-9xl font-extrabold text-primary opacity-20 absolute select-none">404</h1>
      <div className="relative z-10">
        <h2 className="text-4xl font-bold mb-4">Page Not Found</h2>
        <p className="text-gray-400 mb-8">
          The page you are looking for might have been removed or is temporarily unavailable.
        </p>
        <Link
          href="/"
          className="px-6 py-3 border border-primary text-primary hover:bg-primary hover:text-white rounded-full transition-all"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
