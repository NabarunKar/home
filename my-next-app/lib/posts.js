import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';

// Blog posts live as Markdown files in /posts.
//
// To publish a new post:
//   1. Create `posts/my-new-article.md` with frontmatter (title, date, tags,
//      excerpt) followed by the article body in Markdown.
//   2. That's it — the filename is the slug, and the index + article pages
//      pick it up automatically at build time.
//
// No JavaScript needs to change to add a post.

const postsDirectory = path.join(process.cwd(), 'posts');

// Read every Markdown file and return its metadata only. The index page
// needs the list of posts, so we deliberately skip rendering the body here.
export function getAllPosts() {
  const filenames = fs.readdirSync(postsDirectory);

  const posts = filenames
    .filter((filename) => filename.endsWith('.md'))
    .map((filename) => {
      const slug = filename.replace(/\.md$/, '');
      const { data } = matter(readPostFile(filename));
      return {
        slug,
        title: data.title,
        date: data.date,
        tags: Array.isArray(data.tags) ? data.tags : [],
        excerpt: data.excerpt ?? '',
      };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return posts;
}

// Read a single post and render its Markdown body to HTML.
// Returns null when the slug has no matching file.
export function getPostBySlug(slug) {
  // Slugs come from filenames (getStaticPaths), but keep the lookup
  // constrained to plain filename characters just in case.
  const safeSlug = slug.replace(/[^a-zA-Z0-9-]/g, '');
  const filename = `${safeSlug}.md`;

  if (!fs.existsSync(path.join(postsDirectory, filename))) {
    return null;
  }

  const { data, content } = matter(readPostFile(filename));
  return {
    slug: safeSlug,
    title: data.title,
    date: data.date,
    tags: Array.isArray(data.tags) ? data.tags : [],
    excerpt: data.excerpt ?? '',
    contentHtml: renderMarkdown(content),
  };
}

function readPostFile(filename) {
  return fs.readFileSync(path.join(postsDirectory, filename), 'utf8');
}

// remark-html sanitizes by default (GitHub's rules), so raw HTML in the
// Markdown source is dropped rather than injected into the page.
function renderMarkdown(markdown) {
  return remark()
    .use(remarkHtml, { sanitize: true })
    .processSync(markdown)
    .toString();
}
