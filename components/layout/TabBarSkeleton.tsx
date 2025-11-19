'use client';

import { useState } from 'react';

// Read tab count from localStorage synchronously
function getInitialTabCount(): number {
  if (typeof window === 'undefined') return 3;

  try {
    const stored = localStorage.getItem('tab-storage');
    if (stored) {
      const data = JSON.parse(stored);
      const count = data.state?.tabs?.length || 3;
      return Math.max(1, count); // Minimum 1 tab
    }
  } catch (error) {
    // Use default value on error
  }
  return 3;
}

export function TabBarSkeleton() {
  const [tabCount] = useState(getInitialTabCount);

  return (
    <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 overflow-x-auto px-2 py-1">
      {/* Skeleton tabs - matches actual tab count */}
      {Array.from({ length: tabCount }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-2 px-3 py-1.5 rounded-md w-[180px] flex-shrink-0 bg-gray-50 dark:bg-gray-800/50 animate-pulse"
        >
          <div className="flex-1 h-4 bg-gray-300 dark:bg-gray-700 rounded" />
          <div className="w-3.5 h-3.5 bg-gray-300 dark:bg-gray-700 rounded" />
        </div>
      ))}

      {/* New tab button skeleton */}
      <div className="flex-shrink-0 p-2 w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse" />
    </div>
  );
}
