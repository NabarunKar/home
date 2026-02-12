import Head from 'next/head';
import Link from 'next/link';

const PROJECTS = [
  {
    title: 'Project Title (Placeholder)',
    description:
      'A short 2–4 sentence description of what this project does, what problem it solves, and what you built. Replace this with your real write-up later.',
    tags: ['React', 'Next.js', 'Tailwind CSS'],
  },
  {
    title: 'Second Project (Placeholder)',
    description:
      'Another placeholder description. You can include details like APIs used, scalability constraints, or key features once you finalize the content.',
    tags: ['TypeScript', 'APIs', 'UI/UX'],
  },
  {
    title: 'Third Project (Placeholder)',
    description:
      'Placeholder content for a third tile. This layout is meant to match your site’s current dark “cyber” palette and spacing.',
    tags: ['Machine Learning', 'Data', 'Systems'],
  },
];

export default function Projects() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Nabarun Kar | Projects</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&family=JetBrains+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className="antialiased min-h-screen flex flex-col font-sans selection:bg-cyber-500 selection:text-white">
        <nav className="sticky top-0 z-50 glass-panel border-b border-cyber-700">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-3">
                <Link href="/" className="font-bold text-xl tracking-tight text-white font-mono hover:text-cyber-400 transition-colors">
                  Nabarun Kar
                </Link>
              </div>

              <div className="hidden md:block">
                <div className="ml-10 flex items-center space-x-6">
                  <Link href="/" className="text-sm font-medium hover:text-cyber-400 transition-colors">
                    Home
                  </Link>
                  <span className="text-sm font-medium text-cyber-400">Projects</span>
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-cyber-500 hover:bg-blue-600 text-white text-sm font-bold rounded-md transition-all shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                  >
                    Resume
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <main className="flex-grow">
          <section className="pt-14 pb-16 relative overflow-hidden">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="mb-10">
                <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
                  Projects
                </h1>
                <p className="text-lg text-slate-400 mt-4 max-w-2xl leading-relaxed">
                  A curated set of work across product engineering, data-driven systems, and decentralized tech.
                  This page is currently using placeholder tiles—swap in your screenshots, links, and write-ups when you’re ready.
                </p>
              </div>

              <div className="space-y-8">
                {PROJECTS.map((project) => (
                  <div
                    key={project.title}
                    className="group relative bg-cyber-800/40 rounded-2xl border border-cyber-700 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-cyber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                    <div className="relative p-6 md:p-8">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center">
                        <div className="md:col-span-5">
                          <div className="relative aspect-[16/10] rounded-xl border border-cyber-700 overflow-hidden bg-cyber-900">
                            <div className="absolute inset-0 bg-gradient-to-br from-cyber-400/10 to-cyber-emerald/10"></div>
                            <div className="absolute inset-0 flex items-center justify-center text-slate-500 font-mono text-sm">
                              Screenshot placeholder
                            </div>
                          </div>
                        </div>

                        <div className="md:col-span-7">
                          <h2 className="text-3xl md:text-6xl font-extrabold text-white leading-tight">
                            {project.title}
                          </h2>

                          <div className="mt-5 bg-cyber-800 border border-cyber-700 rounded-xl p-4 md:p-5">
                            <p className="text-slate-300 leading-relaxed">{project.description}</p>
                          </div>

                          <div className="mt-5 flex flex-wrap gap-3 text-sm font-mono text-slate-400">
                            {project.tags.map((tag) => (
                              <span key={tag} className="bg-cyber-800 px-3 py-1 rounded border border-cyber-700">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyber-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          </section>
        </main>

        <footer className="bg-cyber-900 border-t border-cyber-700 py-8">
          <div className="max-w-5xl mx-auto px-4 text-center"></div>
        </footer>
      </div>
    </>
  );
}
