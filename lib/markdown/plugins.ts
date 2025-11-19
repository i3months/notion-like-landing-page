import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeKatex from 'rehype-katex';

/**
 * Remark plugins configuration for Markdown processing
 * Remark plugins transform the Markdown AST before conversion to HTML
 */
export const remarkPlugins = [
  // GitHub Flavored Markdown support (tables, strikethrough, task lists, etc.)
  remarkGfm,
  // Math support for LaTeX-style formulas
  remarkMath,
];

/**
 * Rehype plugins configuration for HTML processing
 * Rehype plugins transform the HTML AST after Markdown conversion
 */
export const rehypePlugins = [
  // Parse raw HTML in markdown
  rehypeRaw,
  // Add IDs to headings for anchor links
  rehypeSlug,
  // Syntax highlighting for code blocks
  rehypeHighlight,
  // Render math formulas with KaTeX
  rehypeKatex,
];

/**
 * Combined plugin configuration for react-markdown
 */
export const markdownPlugins = {
  remarkPlugins,
  rehypePlugins,
};
