'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface NavbarProps {
    onLogin: () => void;
    onGuestLogin: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLogin, onGuestLogin }) => {
    return (
        <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed top-0 inset-x-0 z-50"
        >
            <div className="mx-auto px-4 sm:px-6 lg:px-8 pt-4">
                <div className="flex items-center justify-between h-14 px-4 sm:px-6 rounded-2xl bg-zinc-900/70 backdrop-blur-xl border border-zinc-800/60 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <div className="relative h-8 w-8 flex items-center justify-center">
                            <motion.div
                                className="absolute inset-0 rounded-lg bg-indigo-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            />
                            <img src="/logo.png" alt="LinearFlow" className="h-full w-full object-contain relative z-10" />
                        </div>
                        <span className="font-semibold text-zinc-100 tracking-tight hidden sm:block">LinearFlow</span>
                    </Link>

                    {/* Center Navigation */}
                    <div className="hidden md:flex items-center">
                        <div className="flex items-center gap-1 p-1 rounded-xl bg-zinc-800/40">
                            {[
                                { label: 'Features', active: true },
                                { label: 'Pricing', active: false },
                                { label: 'Changelog', active: false },
                            ].map((item) => (
                                <button
                                    key={item.label}
                                    className={`relative px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${item.active
                                        ? 'text-zinc-100'
                                        : 'text-zinc-400 hover:text-zinc-200'
                                        }`}
                                >
                                    {item.active && (
                                        <motion.div
                                            layoutId="navbar-pill"
                                            className="absolute inset-0 bg-zinc-700/50 rounded-lg"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    <span className="relative z-10">{item.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center gap-3">
                        {/* Status Badge - Hidden on mobile */}
                        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                            <motion.div
                                className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                            <span className="text-[11px] text-emerald-400 font-medium">Free Beta</span>
                        </div>

                        {/* Divider */}
                        <div className="hidden lg:block h-5 w-px bg-zinc-700/50" />

                        {/* CTA Buttons */}
                        <button
                            onClick={onGuestLogin}
                            className="hidden sm:block px-4 py-2 text-sm font-medium text-zinc-400 hover:text-zinc-200 transition-colors"
                        >
                            Demo
                        </button>

                        <motion.button
                            onClick={onLogin}
                            className="group relative flex items-center gap-2 px-4 sm:px-5 py-2 rounded-xl bg-zinc-100 text-zinc-900 text-sm font-medium overflow-hidden"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-indigo-200 to-violet-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            />
                            <span className="relative z-10">Get Started</span>
                            <ArrowRight size={14} className="relative z-10 group-hover:translate-x-0.5 transition-transform" />
                        </motion.button>
                    </div>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
