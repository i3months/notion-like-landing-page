export function MarkdownSkeleton() {
  return (
    <div className="prose prose-slate max-w-none dark:prose-invert animate-pulse">
      {/* Title skeleton */}
      <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-4" />

      {/* Paragraph skeletons */}
      <div className="space-y-3 mb-6">
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full" />
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full" />
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-5/6" />
      </div>

      {/* Subtitle skeleton */}
      <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-2/3 mb-4 mt-8" />

      {/* More paragraph skeletons */}
      <div className="space-y-3 mb-6">
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full" />
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full" />
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-4/5" />
      </div>

      {/* Code block skeleton */}
      <div className="h-32 bg-gray-300 dark:bg-gray-700 rounded mb-6" />

      {/* More paragraphs */}
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full" />
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full" />
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4" />
      </div>
    </div>
  );
}
