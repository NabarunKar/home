import React, { useState, useEffect } from 'react';
import { Activity } from 'lucide-react';

const LiveStatusSection = () => {
    const [musicData, setMusicData] = useState(null);
    const [movieData, setMovieData] = useState(null);
    const [musicLoading, setMusicLoading] = useState(true);
    const [movieLoading, setMovieLoading] = useState(true);
    const [musicError, setMusicError] = useState(null);
    const [movieError, setMovieError] = useState(null);

    const LASTFM_PROFILE_URL = 'https://www.last.fm/user/CrushedOreos';
    const LETTERBOXD_PROFILE_URL = 'https://letterboxd.com/CrushedOreos/';

    useEffect(() => {
        const fetchMusicData = async () => {
            try {
                const songRes = await fetch('/api/last-song');
                if (!songRes.ok) throw new Error('Failed to fetch music');
                const songData = await songRes.json();
                if (songData.error) throw new Error(songData.error);
                setMusicData(songData);
            } catch (e) {
                console.error("Music fetch error:", e);
                setMusicError(e.message);
            } finally {
                setMusicLoading(false);
            }
        };

        const fetchMovieData = async () => {
            try {
                const movieRes = await fetch('/api/latest-movie');
                if (!movieRes.ok) throw new Error('Failed to fetch movie');
                const movieDataRes = await movieRes.json();
                if (movieDataRes.error) throw new Error(movieDataRes.error);
                setMovieData(movieDataRes);
            } catch (e) {
                console.error("Movie fetch error:", e);
                setMovieError(e.message);
            } finally {
                setMovieLoading(false);
            }
        };

        fetchMusicData();
        fetchMovieData();
    }, []);

    return (
        <section id="hobbies" className="py-12 bg-cyber-800/30 border-y border-cyber-700">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                        <Activity className="text-cyber-400" size={24} />
                        Beyond code...
                    </h2>
                    <p className="text-slate-400 mt-1">Besides development, I really like film, music, and photography.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Music Player */}
                    <div
                        className="group relative bg-cyber-800 rounded-xl p-1 border border-cyber-700 hover:border-cyber-emerald/50 transition-colors h-40 overflow-hidden cursor-pointer"
                        role="link"
                        tabIndex={0}
                        aria-label="Open Last.fm profile"
                        onClick={() => window.open(LASTFM_PROFILE_URL, '_blank', 'noopener,noreferrer')}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                window.open(LASTFM_PROFILE_URL, '_blank', 'noopener,noreferrer');
                            }
                        }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-cyber-emerald/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        
                        <div className="h-full flex items-center p-4 gap-5">
                            {musicLoading ? (
                                <div className="animate-pulse flex gap-4 w-full items-center">
                                    <div className="w-24 h-24 bg-cyber-700 rounded-lg"></div>
                                    <div className="flex-1 space-y-3">
                                        <div className="h-4 bg-cyber-700 rounded w-3/4"></div>
                                        <div className="h-3 bg-cyber-700 rounded w-1/2"></div>
                                    </div>
                                </div>
                            ) : musicError ? (
                                <div className="text-slate-500 text-sm w-full text-center">
                                    <p>Could not load music data</p>
                                    <p className="text-xs mt-1">{musicError}</p>
                                </div>
                            ) : musicData ? (
                                <>
                                    <img src={musicData.image} alt="Album Art" className="w-24 h-24 rounded-lg shadow-lg border border-cyber-700" />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-xs font-bold text-cyber-emerald uppercase tracking-wider">
                                                {musicData.isPlaying ? 'Now Playing' : 'Last Played'}
                                            </span>
                                            {musicData.isPlaying && (
                                                <div className="flex items-end gap-[2px] h-3">
                                                    <div className="bar"></div>
                                                    <div className="bar"></div>
                                                    <div className="bar"></div>
                                                    <div className="bar"></div>
                                                </div>
                                            )}
                                        </div>
                                        <h3 className="text-white font-bold text-lg truncate">{musicData.name}</h3>
                                        <p className="text-slate-400 text-sm truncate">{musicData.artist}</p>
                                    </div>
                                </>
                            ) : null}
                        </div>
                        
                        <div className="absolute top-3 right-3 opacity-20 group-hover:opacity-100 transition-opacity">
                            <img
                                src="/images/lastfm-logo.png"
                                alt="Last.fm"
                                className="w-6 h-6"
                            />
                        </div>
                    </div>

                    {/* Movie Section */}
                    <div
                        className="group relative bg-cyber-800 rounded-xl p-1 border border-cyber-700 hover:border-orange-500/50 transition-colors h-40 overflow-hidden cursor-pointer"
                        role="link"
                        tabIndex={0}
                        aria-label="Open Letterboxd profile"
                        onClick={() => window.open(LETTERBOXD_PROFILE_URL, '_blank', 'noopener,noreferrer')}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                window.open(LETTERBOXD_PROFILE_URL, '_blank', 'noopener,noreferrer');
                            }
                        }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        
                        <div className="h-full flex items-center p-4 gap-5">
                            {movieLoading ? (
                                <div className="animate-pulse flex gap-4 w-full items-center">
                                    <div className="w-20 h-28 bg-cyber-700 rounded shadow-lg"></div>
                                    <div className="flex-1 space-y-3">
                                        <div className="h-4 bg-cyber-700 rounded w-3/4"></div>
                                        <div className="h-3 bg-cyber-700 rounded w-1/3"></div>
                                    </div>
                                </div>
                            ) : movieError ? (
                                <div className="text-slate-500 text-sm w-full text-center">
                                    <p>Could not load movie data</p>
                                    <p className="text-xs mt-1">{movieError}</p>
                                </div>
                            ) : movieData ? (
                                <div className="flex items-center gap-5 w-full h-full hover:bg-cyber-700/20 rounded-lg p-2 -m-2 transition-colors">
                                    <a
                                        href={movieData.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`Open ${movieData.title} on Letterboxd`}
                                        onClick={(e) => e.stopPropagation()}
                                        onKeyDown={(e) => e.stopPropagation()}
                                        className="shrink-0"
                                    >
                                        <img src={movieData.image} alt="Poster" className="w-20 rounded shadow-lg border border-cyber-700 group-hover:scale-105 transition-transform" />
                                    </a>
                                    <div className="flex-1 min-w-0">
                                        <span className="inline-block bg-orange-500/20 text-orange-400 text-xs px-2 py-0.5 rounded border border-orange-500/30 mb-2">
                                            ★ {movieData.rating}
                                        </span>
                                        <h3 className="text-white font-bold text-lg leading-tight line-clamp-2">{movieData.title}</h3>
                                        <p className="text-slate-500 text-xs mt-1 font-mono">Latest favourite from Letterboxd</p>
                                    </div>
                                </div>
                            ) : null}
                        </div>

                        <div className="absolute top-3 right-3 opacity-20 group-hover:opacity-100 transition-opacity">
                            <img
                                src="/images/letterboxd-logo.png"
                                alt="Letterboxd"
                                className="w-6 h-6"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LiveStatusSection;
