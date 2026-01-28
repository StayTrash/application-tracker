'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface HeroSectionProps {
    onLogin: () => void;
    onGuestLogin: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onLogin, onGuestLogin }) => {
    return (
        <>
            {/* Hero Title */}
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-6xl md:text-8xl font-semibold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-500 mb-6 max-w-4xl leading-[1.1]"
            >
                Master your <br className="hidden md:block" /> job search.
            </motion.h1>

            {/* Hero Description */}
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg md:text-xl text-zinc-400 max-w-2xl mb-10 leading-relaxed font-light"
            >
                Every application tracked. Every interview prepared. <br className="hidden md:block" />
                Every offer compared.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-4 mb-24"
            >
                <button
                    onClick={onLogin}
                    className="group relative h-12 px-8 rounded-full bg-zinc-100 hover:bg-white text-zinc-950 font-medium transition-all shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] overflow-hidden"
                >
                    <div className="relative z-10 flex items-center gap-2">
                        Start Tracking
                    </div>
                </button>

                <button
                    onClick={onGuestLogin}
                    className="h-12 px-8 rounded-full bg-zinc-900/50 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 font-medium transition-all"
                >
                    Guest Demo
                </button>
                <div className="h-8 w-px bg-zinc-800 hidden md:block" />
                <div className="hidden md:flex items-center gap-4 text-sm text-zinc-500">
                    <span className="flex items-center gap-1.5"><Check size={14} className="text-indigo-400" /> Free for individuals</span>
                    <span className="flex items-center gap-1.5"><Check size={14} className="text-indigo-400" /> No credit card</span>
                </div>
            </motion.div>
        </>
    );
};

export default HeroSection;
