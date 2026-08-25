import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import { getAllPosts } from '../../lib/posts';
import { formatDate } from '../../lib/date';

function groupByYear(posts) {
  const groups = [];
  for (const post of posts) {
    const year = post.date.slice(0, 4);
    const last = groups[groups.length - 1];
    if (last && last.year === year) {
      last.posts.push(post);
    } else {
      groups.push({ year, posts: [post] });
    }
  }
  return groups;
}

export async function getStaticProps() {
  const posts = getAllPosts();
  return { props: { posts } };
}

export default function BlogIndex({ posts }) {
  const groups = groupByYear(posts);

  return (
    <>
      <Head>
        <title>Blog — Nabarun Kar</title>
        <meta
          name="description"
          content="Notes on things I build, break, debug, and learn."
        />
      </Head>

      <div className="antialiased min-h-screen flex flex-col font-sans selection:bg-cyber-500 selection:text-white">
        <Navbar variant="internal" />

        <main className="flex-grow">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <header className="mb-14">
              <h1 className="font-mono text-2xl sm:text-3xl font-bold text-white tracking-tight">
                <span className="text-cyber-400">~/</span>blog
              </h1>
              <p className="mt-3 text-slate-400 leading-relaxed">
                writing about things I build, break, debug, and learn.
              </p>
            </header>

            {groups.map((group) => (
              <section key={group.year} className="mb-14">
                <h2 className="font-mono text-sm tracking-widest text-cyber-emerald mb-7">
                  {group.year}
                </h2>
                <ul className="space-y-9">
                  {group.posts.map((post) => (
                    <li key={post.slug}>
                      <Link href={`/blog/${post.slug}`} className="group block">
                        <h3 className="text-lg font-semibold text-slate-100 group-hover:text-cyber-400 transition-colors leading-snug">
                          {post.title}
                        </h3>
                      </Link>
                      <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1.5 font-mono text-sm text-slate-500">
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
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
