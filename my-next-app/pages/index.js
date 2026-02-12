import Head from 'next/head';
import { Code2, Blocks, GraduationCap, Github, Linkedin, Twitter, Mail } from 'lucide-react';
import LiveStatusSection from '../components/LiveStatusSection';

export default function Home() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Nabarun Kar | CS Graduate Student</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" />
      </Head>

      <div className="antialiased min-h-screen flex flex-col font-sans selection:bg-cyber-500 selection:text-white">

        <nav className="sticky top-0 z-50 glass-panel border-b border-cyber-700">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center gap-3">
                        <span className="font-bold text-xl tracking-tight text-white font-mono">Nabarun Kar</span>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-6">
                            <a href="#about" className="text-sm font-medium hover:text-cyber-400 transition-colors">About</a>
                            <a href="#projects" className="text-sm font-medium hover:text-cyber-400 transition-colors">Projects</a>
                            <a href="#hobbies" className="text-sm font-medium hover:text-cyber-400 transition-colors">Interests</a>
                            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-cyber-500 hover:bg-blue-600 text-white text-sm font-bold rounded-md transition-all shadow-[0_0_10px_rgba(59,130,246,0.5)]">
                                Resume
                            </a>
                            <div className="flex items-center gap-4 pl-4 border-l border-cyber-700">
                                <a href="https://github.com/NabarunKar" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                                    <Github className="w-5 h-5" />
                                </a>
                                <a href="https://www.linkedin.com/in/nabarun-kar/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                                    <Linkedin className="w-5 h-5" />
                                </a>
                                <a href="mailto:nabarunkar01@gmail.com" className="text-slate-400 hover:text-white transition-colors">
                                    <Mail className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>

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
                                        Turning data and decentralized systems into{' '}
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-400 to-cyber-emerald">scalable products</span>
                                    </h1>

                            <p className="text-xl text-slate-400 max-w-2xl leading-relaxed mb-8">
                                I'm a Master's student in Computer Science at Texas A&M University, with a strong focus on machine learning, data driven optimization, and scalable system design. My work explores how data, algorithms, and decentralized technologies can be combined to build robust, real world systems.
                            </p>

                            <div className="flex flex-wrap gap-4 text-sm font-mono text-slate-400">
                                <div className="flex items-center gap-2 bg-cyber-800 px-4 py-2 rounded border border-cyber-700">
                                    <Code2 className="w-4 h-4 text-cyber-400" /> Data Science
                                </div>
                                <div className="flex items-center gap-2 bg-cyber-800 px-4 py-2 rounded border border-cyber-700">
                                    <Blocks className="w-4 h-4 text-cyber-purple" /> Blockchain
                                </div>
                                <div className="flex items-center gap-2 bg-cyber-800 px-4 py-2 rounded border border-cyber-700">
                                    <GraduationCap className="w-4 h-4 text-cyber-emerald" /> TAMU '26
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
