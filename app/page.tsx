import { parseMarkdownFile } from '@/lib/markdown/parser';
import { MarkdownRenderer } from '@/components/markdown/MarkdownRenderer';
import { payload } from '@/payload/config';
import type { Metadata } from 'next';

/**
 * Generate metadata for home page based on intro.md frontmatter
 */
export async function generateMetadata(): Promise<Metadata> {
  try {
    const { frontmatter } = await parseMarkdownFile('intro');

    return {
      title: frontmatter.title || payload.global.title,
      description: frontmatter.description || payload.global.description,
      icons: {
        icon: frontmatter.favicon || payload.global.favicon || '/favicon.ico',
      },
      openGraph: {
        title: frontmatter.title || payload.global.title,
        description: frontmatter.description || payload.global.description,
        images: frontmatter.ogImage ? [frontmatter.ogImage] : undefined,
      },
    };
  } catch {
    return {
      title: payload.global.title,
      description: payload.global.description,
    };
  }
}

/**
 * Home page - renders the intro/default content
 */
export default async function Home() {
  // Load the intro/default content
  const { content } = await parseMarkdownFile('intro');

  return (
    <article className="prose prose-slate max-w-none dark:prose-invert">
      <MarkdownRenderer content={content} />
    </article>
  );
}
