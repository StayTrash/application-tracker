'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useTheme } from '@/components/providers/ThemeProvider';

interface HeroSectionProps {
    onLogin: () => void;
    onGuestLogin: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onLogin, onGuestLogin }) => {
    const { theme } = useTheme();

    return (
        <>
            {/* Hero Title */}
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className={`text-6xl md:text-8xl font-semibold tracking-tighter text-transparent bg-clip-text mb-6 max-w-4xl leading-[1.1] ${
                    theme === 'dark'
                        ? 'bg-gradient-to-b from-white via-zinc-200 to-zinc-500'
                        : 'bg-gradient-to-b from-zinc-900 via-zinc-700 to-zinc-500'
                }`}
            >
                Master your <br className="hidden md:block" /> job search.
            </motion.h1>

            {/* Hero Description */}
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className={`text-lg md:text-xl max-w-2xl mb-10 leading-relaxed font-light ${
                    theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
                }`}
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
                    className={`group relative h-12 px-8 rounded-full font-medium transition-all overflow-hidden ${
                        theme === 'dark'
                            ? 'bg-zinc-100 hover:bg-white text-zinc-950 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]'
                            : 'bg-zinc-900 hover:bg-zinc-800 text-white shadow-[0_0_40px_-10px_rgba(0,0,0,0.3)]'
                    }`}
                >
                    <div className="relative z-10 flex items-center gap-2">
                        Start Tracking
                    </div>
                </button>

                <button
                    onClick={onGuestLogin}
                    className={`h-12 px-8 rounded-full border font-medium transition-all ${
                        theme === 'dark'
                            ? 'bg-zinc-900/50 hover:bg-zinc-800 border-zinc-800 text-zinc-300'
                            : 'bg-white/50 hover:bg-zinc-50 border-zinc-200 text-zinc-700'
                    }`}
                >
                    Guest Demo
                </button>
                <div className={`h-8 w-px hidden md:block ${theme === 'dark' ? 'bg-zinc-800' : 'bg-zinc-300'}`} />
                <div className={`hidden md:flex items-center gap-4 text-sm ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-600'}`}>
                    <span className="flex items-center gap-1.5"><Check size={14} className="text-indigo-500" /> Free for individuals</span>
                    <span className="flex items-center gap-1.5"><Check size={14} className="text-indigo-500" /> No credit card</span>
                </div>
            </motion.div>
        </>
    );
};

export default HeroSection;
