import Head from 'next/head';
import { Code2, Blocks, GraduationCap } from 'lucide-react';
import LiveStatusSection from '../components/LiveStatusSection';
import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Nabarun Kar | CS Graduate Student</title>
      </Head>

      <div className="antialiased min-h-screen flex flex-col font-sans selection:bg-cyber-500 selection:text-white">

        <Navbar variant="home" />

        <main className="flex-grow">
            <section id="about" className="pt-20 pb-16 relative overflow-hidden">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-800 border border-cyber-700 mb-6 animate-fade-in-up">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-emerald opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-cyber-emerald"></span>
                        </span>
                        <span className="text-xs font-mono text-slate-300">Seeking Full Time Roles for Summer 2026</span>
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-12 mb-8">
                        <div className="flex-1">
                            <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6">
                                        Building systems with{' '}
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-400 to-cyber-emerald">data, AI, and software</span>.
                                    </h1>

                            <p className="text-xl text-slate-400 max-w-2xl leading-relaxed mb-8">
                                        I&apos;m a software engineer and recently graduated with a Master&apos;s degree in Computer Science from Texas A&M University. I build software around data, AI, and systems, ranging from machine learning applications and recommendation engines to backend services and interactive products.
                            </p>

                            <div className="flex flex-wrap gap-4 text-sm font-mono text-slate-400">
                                <div className="flex items-center gap-2 bg-cyber-800 px-4 py-2 rounded border border-cyber-700">
                                    <Code2 className="w-4 h-4 text-cyber-400" /> Software Engineering
                                </div>
                                <div className="flex items-center gap-2 bg-cyber-800 px-4 py-2 rounded border border-cyber-700">
                                    <Blocks className="w-4 h-4 text-cyber-purple" /> AI / ML
                                </div>
                                <div className="flex items-center gap-2 bg-cyber-800 px-4 py-2 rounded border border-cyber-700">
                                    <Blocks className="w-4 h-4 text-cyber-purple" /> Data & Backend
                                </div>
                                <div className="flex items-center gap-2 bg-cyber-800 px-4 py-2 rounded border border-cyber-700">
                                    <GraduationCap className="w-4 h-4 text-cyber-emerald" /> Texas A&M &apos;26
                                </div>
                            </div>
                        </div>

                        {/* Profile Picture */}
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-cyber-400 to-cyber-emerald rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300 animate-pulse-slow"></div>
                            <img 
                                src="/images/profile.jpg" 
                                alt="Nabarun Kar" 
                                className="relative w-64 h-64 md:w-80 md:h-80 rounded-full object-cover border-4 border-cyber-800 shadow-2xl"
                            />
                        </div>
                    </div>
                </div>
                
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyber-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            </section>

            <LiveStatusSection /> {/* This is your modularized component */}

        </main>

        <footer className="bg-cyber-900 border-t border-cyber-700 py-8">
            <div className="max-w-5xl mx-auto px-4 text-center">
            </div>
        </footer>

      </div>
    </>
  );
}
