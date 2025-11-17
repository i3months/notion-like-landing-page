import { NavigationItem } from '../payload/types';

/**
 * Recursively extracts all paths from a navigation tree structure
 *
 * This function traverses the entire navigation hierarchy and collects
 * all path values, which are used to generate static pages at build time.
 * Items without a path property are skipped (they act as section headers).
 *
 * @param items - Array of navigation items to process
 * @returns Flat array of all path strings found in the navigation tree
 *
 * @example
 * ```typescript
 * const navigation = [
 *   { name: 'Home', path: 'home' },
 *   {
 *     name: 'Guides',
 *     children: [
 *       { name: 'Quick Start', path: 'guides/quick-start' },
 *       { name: 'Config', path: 'guides/config' }
 *     ]
 *   }
 * ];
 *
 * const paths = extractAllPaths(navigation);
 * // Returns: ['home', 'guides/quick-start', 'guides/config']
 * ```
 */
export function extractAllPaths(items: NavigationItem[]): string[] {
  const paths: string[] = [];

  function traverse(items: NavigationItem[]) {
    for (const item of items) {
      if (item.path) {
        paths.push(item.path);
      }
      if (item.children) {
        traverse(item.children);
      }
    }
  }

  traverse(items);
  return paths;
}

/**
 * Recursively searches navigation tree to find the item matching the current path
 *
 * This function is used to highlight the active navigation item in the sidebar.
 * It performs a depth-first search through the navigation hierarchy to find
 * the item whose path matches the current page path.
 *
 * @param items - Array of navigation items to search
 * @param currentPath - Current page path to match against
 * @returns The matching NavigationItem if found, null otherwise
 *
 * @example
 * ```typescript
 * const navigation = [
 *   { name: 'Home', path: 'home' },
 *   {
 *     name: 'Guides',
 *     children: [
 *       { name: 'Quick Start', path: 'guides/quick-start' }
 *     ]
 *   }
 * ];
 *
 * const activeItem = findActiveItem(navigation, 'guides/quick-start');
 * // Returns: { name: 'Quick Start', path: 'guides/quick-start' }
 *
 * const notFound = findActiveItem(navigation, 'nonexistent');
 * // Returns: null
 * ```
 */
export function findActiveItem(
  items: NavigationItem[],
  currentPath: string,
): NavigationItem | null {
  for (const item of items) {
    if (item.path === currentPath) {
      return item;
    }
    if (item.children) {
      const found = findActiveItem(item.children, currentPath);
      if (found) return found;
    }
  }
  return null;
}
