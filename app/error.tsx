'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 bg-[#050505]">
      <h2 className="text-4xl font-bold text-red-500 mb-4">Something went wrong!</h2>
      <p className="text-gray-400 mb-8 max-w-md">
        An unexpected error occurred. We've been notified and are working to fix it.
      </p>
      <button
        onClick={() => reset()}
        className="px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-full transition-all glow-on-hover"
      >
        Try again
      </button>
    </div>
  );
}
