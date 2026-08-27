"use client";

import React, { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Application error captured:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-bg-alt flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-white rounded-2xl p-8 border border-border shadow-xl">
        <span className="text-4xl mb-4 block">⚠️</span>
        <h2 className="text-2xl font-bold text-navy mb-3">Something went wrong</h2>
        <p className="text-body text-sm mb-6 leading-relaxed">
          An error occurred while loading this page. Our systems have been notified. Please try refreshing or reloading the screen.
        </p>
        <button
          onClick={reset}
          className="w-full py-3 rounded-lg bg-berry hover:bg-navy text-white font-bold text-sm transition-colors cursor-pointer"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
