import React from "react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-white py-16 px-4 md:px-8 animate-pulse flex flex-col items-center">
      <div className="max-w-xl w-full flex flex-col items-center gap-6">
        {/* Title skeleton */}
        <div className="h-10 bg-zinc-200 rounded-lg w-3/4"></div>
        <div className="h-6 bg-zinc-200 rounded-lg w-1/2"></div>
        
        {/* Media box skeleton */}
        <div className="w-full aspect-video bg-zinc-200 rounded-xl my-6"></div>
        
        {/* Button skeleton */}
        <div className="h-12 bg-zinc-200 rounded-lg w-1/3"></div>
      </div>
    </div>
  );
}
