import { useState } from 'react';
import Link from 'next/link';
import { Space_Grotesk } from 'next/font/google';
import { Github, Linkedin, Mail, Menu, X, ArrowRight } from 'lucide-react';

const spaceGrotesk = Space_Grotesk({
    subsets: ['latin'],
    weight: ['400', '500', '600'],
    display: 'swap',
});

/**
 * Site-wide top navigation.
 *
 * Props:
 *   - variant: 'home' | 'internal'
 *       'home'     -> "About" and "Interests" are same-page anchors (#about, #hobbies).
 *       'internal' -> They link back to the homepage sections (/#about, /#hobbies)
 *                     which is what we want on /blog and /blog/[slug].
 */
export default function Navbar({ variant = 'home' }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const aboutHref = variant === 'home' ? '#about' : '/#about';
    const interestsHref = variant === 'home' ? '#hobbies' : '/#hobbies';

    return (
        <nav className="sticky top-0 z-50 glass-panel border-b border-cyber-700">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center gap-3">
                        <Link
                            href="/"
                            className="font-bold text-xl tracking-tight text-white font-mono hover:text-cyber-400 transition-colors"
                        >
                            Nabarun Kar
                        </Link>
                    </div>

                    {/* Desktop nav */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-6">
                            <a href={aboutHref} className="text-sm font-medium hover:text-cyber-400 transition-colors">
                                About
                            </a>
                            <a href={interestsHref} className="text-sm font-medium hover:text-cyber-400 transition-colors">
                                Interests
                            </a>
                            <Link href="/blog" className="text-sm font-medium hover:text-cyber-400 transition-colors">
                                Blog
                            </Link>
                            <a
                                href="/resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 bg-cyber-500 hover:bg-blue-600 text-white text-sm font-bold rounded-md transition-all shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                            >
                                Resume
                            </a>
                            <a
                                href="https://nabarun3d.vercel.app/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`${spaceGrotesk.className} projects-nav-link`}
                                aria-label="Projects"
                            >
                                <span className="projects-nav-link__text">Projects</span>
                                <ArrowRight className="projects-nav-link__icon" aria-hidden="true" />
                            </a>
                            <div className="flex items-center gap-4 pl-4 border-l border-cyber-700">
                                <a href="https://github.com/NabarunKar" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors" aria-label="GitHub">
                                    <Github className="w-5 h-5" />
                                </a>
                                <a href="https://www.linkedin.com/in/nabarun-kar/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors" aria-label="LinkedIn">
                                    <Linkedin className="w-5 h-5" />
                                </a>
                                <a href="mailto:nabarunkar01@gmail.com" className="text-slate-400 hover:text-white transition-colors" aria-label="Email">
                                    <Mail className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Mobile hamburger */}
                    <div className="md:hidden">
                        <button
                            type="button"
                            className="inline-flex items-center justify-center rounded-md p-2 text-slate-300 hover:text-white hover:bg-cyber-800 transition-colors"
                            aria-controls="mobile-nav"
                            aria-expanded={mobileMenuOpen}
                            onClick={() => setMobileMenuOpen((open) => !open)}
                        >
                            <span className="sr-only">Toggle navigation menu</span>
                            {mobileMenuOpen ? (
                                <X className="h-6 w-6" aria-hidden="true" />
                            ) : (
                                <Menu className="h-6 w-6" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                {mobileMenuOpen && (
                    <div id="mobile-nav" className="md:hidden border-t border-cyber-700">
                        <div className="px-4 py-4 space-y-3">
                            <a
                                href={aboutHref}
                                className="block text-sm font-medium text-slate-200 hover:text-cyber-400 transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                About
                            </a>
                            <a
                                href={interestsHref}
                                className="block text-sm font-medium text-slate-200 hover:text-cyber-400 transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Interests
                            </a>
                            <Link
                                href="/blog"
                                className="block text-sm font-medium text-slate-200 hover:text-cyber-400 transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Blog
                            </Link>
                            <a
                                href="/resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center w-full px-4 py-2 bg-cyber-500 hover:bg-blue-600 text-white text-sm font-bold rounded-md transition-all"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Resume
                            </a>
                            <a
                                href="https://nabarun3d.vercel.app/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`${spaceGrotesk.className} projects-nav-link projects-nav-link--mobile`}
                                aria-label="Projects"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <span className="projects-nav-link__text">Projects</span>
                                <ArrowRight className="projects-nav-link__icon" aria-hidden="true" />
                            </a>

                            <div className="flex items-center gap-4 pt-3 border-t border-cyber-700">
                                <a href="https://github.com/NabarunKar" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors" aria-label="GitHub">
                                    <Github className="w-5 h-5" />
                                </a>
                                <a href="https://www.linkedin.com/in/nabarun-kar/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors" aria-label="LinkedIn">
                                    <Linkedin className="w-5 h-5" />
                                </a>
                                <a href="mailto:nabarunkar01@gmail.com" className="text-slate-400 hover:text-white transition-colors" aria-label="Email">
                                    <Mail className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
