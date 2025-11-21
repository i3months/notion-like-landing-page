'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useTabStore } from '@/lib/store/tabStore';

/**
 * Navigation buttons for back/forward history within tabs
 */
export function NavigationButtons() {
  const router = useRouter();
  const { activeTabId, goBack, goForward, canGoBack, canGoForward } = useTabStore();

  const canNavigateBack = activeTabId ? canGoBack(activeTabId) : false;
  const canNavigateForward = activeTabId ? canGoForward(activeTabId) : false;

  const handleBack = () => {
    if (!activeTabId) return;

    const result = goBack(activeTabId);
    if (result) {
      router.push(`/${result.path}`);
    }
  };

  const handleForward = () => {
    if (!activeTabId) return;

    const result = goForward(activeTabId);
    if (result) {
      router.push(`/${result.path}`);
    }
  };

  return (
    <div className="flex items-center gap-1 px-2 py-1 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
      <button
        onClick={handleBack}
        disabled={!canNavigateBack}
        className={`
          p-1.5 rounded-md transition-colors
          ${
            canNavigateBack
              ? 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              : 'text-gray-300 dark:text-gray-700 cursor-not-allowed'
          }
        `}
        aria-label="Go back"
        title="Go back"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={handleForward}
        disabled={!canNavigateForward}
        className={`
          p-1.5 rounded-md transition-colors
          ${
            canNavigateForward
              ? 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              : 'text-gray-300 dark:text-gray-700 cursor-not-allowed'
          }
        `}
        aria-label="Go forward"
        title="Go forward"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
