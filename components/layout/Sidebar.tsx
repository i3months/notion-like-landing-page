'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavigationItem } from '@/lib/payload/types';

interface SidebarProps {
  navigation: NavigationItem[];
}

interface NavigationItemComponentProps {
  item: NavigationItem;
  currentPath: string;
  level: number;
}

/**
 * Recursive navigation item component with expand/collapse functionality
 */
function NavigationItemComponent({ item, currentPath, level }: NavigationItemComponentProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const hasChildren = item.children && item.children.length > 0;
  const isActive = item.path === currentPath;
  const indentClass = level > 0 ? `ml-${level * 4}` : '';

  const handleToggle = (e: React.MouseEvent) => {
    if (hasChildren) {
      e.preventDefault();
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div className="mb-1">
      <div className={`flex items-center ${indentClass}`}>
        {hasChildren && (
          <button
            onClick={handleToggle}
            className="mr-1 p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors touch-manipulation"
            aria-label={isExpanded ? 'Collapse' : 'Expand'}
            aria-expanded={isExpanded}
          >
            <svg
              className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
        {item.path ? (
          <Link
            href={`/${item.path}`}
            className={`flex-1 px-3 py-2 rounded-md text-sm transition-colors touch-manipulation ${
              isActive
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 font-medium'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 active:bg-gray-200 dark:active:bg-gray-700'
            } ${!hasChildren ? 'ml-5' : ''}`}
          >
            {item.icon && <span className="mr-2">{item.icon}</span>}
            {item.name}
          </Link>
        ) : (
          <div
            className={`flex-1 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-gray-100 ${
              !hasChildren ? 'ml-5' : ''
            }`}
          >
            {item.icon && <span className="mr-2">{item.icon}</span>}
            {item.name}
          </div>
        )}
      </div>
      {hasChildren && isExpanded && (
        <div className="mt-1">
          {item.children!.map((child, index) => (
            <NavigationItemComponent
              key={`${child.name}-${index}`}
              item={child}
              currentPath={currentPath}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Sidebar component displaying hierarchical navigation
 * Hidden on mobile, visible on desktop
 */
export function Sidebar({ navigation }: SidebarProps) {
  const pathname = usePathname();
  const currentPath = pathname === '/' ? '' : pathname.slice(1);

  return (
    <aside className="hidden md:block w-64 h-screen sticky top-0 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 overflow-y-auto">
      <nav className="p-4">
        {navigation.map((item, index) => (
          <NavigationItemComponent
            key={`${item.name}-${index}`}
            item={item}
            currentPath={currentPath}
            level={0}
          />
        ))}
      </nav>
    </aside>
  );
}
