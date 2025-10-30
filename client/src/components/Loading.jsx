import React from 'react';

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] bg-transparent space-y-6">
      {/* Spinner */}
      <div className="relative">
        <div className="h-16 w-16 border-4 border-gray-700 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-t-primary border-transparent rounded-full animate-spin"></div>
        {/* Glow Effect */}
        <div className="absolute inset-0 blur-md border-4 border-t-primary border-transparent rounded-full opacity-60 animate-pulse"></div>
      </div>

      {/* Loading text */}
      <p className="text-gray-300 text-lg tracking-wide font-medium animate-pulse">
        Loading<span className="text-primary">...</span>
      </p>
    </div>
  );
};

export default Loading;
