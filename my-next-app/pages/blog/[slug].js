import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import { getAllPosts, getPostBySlug } from '../../lib/posts';
import { formatDate } from '../../lib/date';

export async function getStaticPaths() {
  const paths = getAllPosts().map((post) => ({ params: { slug: post.slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug);
  if (!post) {
    return { notFound: true };
  }
  return { props: { post } };
}

export default function BlogPost({ post }) {
  return (
    <>
      <Head>
        <title>{`${post.title} — Nabarun Kar`}</title>
        <meta name="description" content={post.excerpt} />
      </Head>

      <div className="antialiased min-h-screen flex flex-col font-sans selection:bg-cyber-500 selection:text-white">
        <Navbar variant="internal" />

        <main className="flex-grow">
          <article className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <Link
              href="/blog"
              className="font-mono text-sm text-slate-500 hover:text-cyber-400 transition-colors"
            >
              ← back to /blog
            </Link>

            <header className="mt-6 mb-10">
              <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight tracking-tight">
                {post.title}
              </h1>
              <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1.5 font-mono text-sm text-slate-500">
                <span>{formatDate(post.date)}</span>
                <span className="text-slate-700">•</span>
                <span className="flex flex-wrap gap-x-2 gap-y-1">
                  {post.tags.map((tag) => (
                    <span key={tag} className="text-cyber-emerald/70">
                      {`#${tag}`}
                    </span>
                  ))}
                </span>
              </div>
            </header>

            <div
              className="post-body"
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />

            <footer className="mt-16 pt-8 border-t border-cyber-700">
              <Link
                href="/blog"
                className="font-mono text-sm text-slate-500 hover:text-cyber-400 transition-colors"
              >
                ← back to /blog
              </Link>
            </footer>
          </article>
        </main>
      </div>
    </>
  );
}
