'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Check } from 'lucide-react';

const PreviewSection: React.FC = () => {
    const { scrollY } = useScroll();
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);

    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <div className="w-full max-w-6xl mx-auto relative mb-32 md:mb-40 px-4" style={{ perspective: '1200px' }}>
            {/* Ambient glow effects */}
            <motion.div
                style={{ y: y2 }}
                className="absolute inset-0 bg-gradient-to-t from-indigo-500/20 via-violet-500/10 to-transparent blur-3xl -z-10 rounded-full opacity-60"
            />
            <motion.div
                className="absolute -top-20 -left-20 w-72 h-72 bg-indigo-600/20 rounded-full blur-[100px]"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div
                className="absolute -bottom-20 -right-20 w-72 h-72 bg-violet-600/20 rounded-full blur-[100px]"
                animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 8, repeat: Infinity }}
            />

            {/* Floating elements around the preview - Hidden on mobile */}
            <motion.div
                className="absolute -left-4 md:-left-8 top-1/4 z-30 hidden md:block"
                animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
                <div className="p-3 md:p-4 rounded-2xl bg-zinc-900/90 backdrop-blur-xl border border-zinc-800 shadow-2xl">
                    <motion.div
                        className="flex items-center gap-2 md:gap-3"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.5 }}
                    >
                        <motion.div
                            className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <Check size={16} className="text-white md:w-5 md:h-5" />
                        </motion.div>
                        <div>
                            <div className="text-[10px] md:text-xs font-semibold text-zinc-200">Offer Received!</div>
                            <div className="text-[9px] md:text-[10px] text-emerald-400">+$125,000/yr</div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            <motion.div
                className="absolute -right-2 md:-right-6 top-1/3 z-30 hidden md:block"
                animate={{ y: [0, 10, 0], rotate: [0, -3, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
                <div className="p-2.5 md:p-3 rounded-xl bg-zinc-900/90 backdrop-blur-xl border border-zinc-800 shadow-2xl">
                    <motion.div
                        className="flex items-center gap-2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 2 }}
                    >
                        <div className="flex -space-x-1.5">
                            {['bg-indigo-500', 'bg-violet-500', 'bg-pink-500'].map((color, i) => (
                                <motion.div
                                    key={i}
                                    className={`w-5 h-5 md:w-6 md:h-6 rounded-full ${color} border-2 border-zinc-900`}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 2.2 + i * 0.1, type: "spring" }}
                                />
                            ))}
                        </div>
                        <span className="text-[9px] md:text-[10px] text-zinc-400">+12 views</span>
                    </motion.div>
                </div>
            </motion.div>

            {/* Main 3D Preview Container */}
            <motion.div
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
                initial={{ rotateX: 15, opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative rounded-2xl md:rounded-3xl border border-zinc-800/80 bg-zinc-950/95 backdrop-blur-xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] overflow-hidden group cursor-default"
            >
                {/* Animated border gradient */}
                <motion.div
                    className="absolute inset-0 rounded-2xl md:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{
                        background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.1), transparent)',
                        backgroundSize: '200% 100%'
                    }}
                    animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />

                {/* Window Chrome */}
                <PreviewWindowChrome />

                {/* Main Dashboard Content */}
                <PreviewDashboardContent />

                {/* Bottom fade */}
                <div className="absolute inset-x-0 bottom-0 h-20 md:h-32 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent pointer-events-none" />

                {/* Reflection effect */}
                <div className="absolute inset-x-0 -bottom-1 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
            </motion.div>

            {/* Bottom floating notification */}
            <motion.div
                className="absolute -bottom-3 md:-bottom-6 left-1/2 -translate-x-1/2 z-30"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.5, duration: 0.5 }}
            >
                <motion.div
                    className="flex items-center gap-2 md:gap-3 px-2.5 md:px-4 py-1.5 md:py-2.5 rounded-full bg-zinc-900/95 backdrop-blur-xl border border-zinc-800 shadow-2xl"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                >
                    <motion.div
                        className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-emerald-500"
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <span className="text-[9px] md:text-xs text-zinc-300 font-medium">All systems operational</span>
                    <span className="text-[9px] md:text-[10px] text-zinc-500 hidden sm:inline">•</span>
                    <span className="text-[9px] md:text-[10px] text-zinc-500 hidden sm:inline">Last sync 2s ago</span>
                </motion.div>
            </motion.div>
        </div>
    );
};

// Sub-component for Window Chrome
const PreviewWindowChrome: React.FC = () => (
    <div className="h-11 md:h-12 border-b border-zinc-800/60 bg-gradient-to-r from-zinc-900/80 via-zinc-900/60 to-zinc-900/80 flex items-center px-3 md:px-5 justify-between select-none relative overflow-hidden">
        <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 4, repeat: Infinity, repeatDelay: 2 }}
        />

        <div className="flex items-center gap-3 md:gap-4">
            <div className="flex gap-1.5 md:gap-2">
                <motion.div
                    className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-zinc-700/60 group-hover:bg-red-500/80 transition-all duration-300 cursor-pointer"
                    whileHover={{ scale: 1.2 }}
                />
                <motion.div
                    className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-zinc-700/60 group-hover:bg-amber-500/80 transition-all duration-300 cursor-pointer"
                    whileHover={{ scale: 1.2 }}
                />
                <motion.div
                    className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-zinc-700/60 group-hover:bg-emerald-500/80 transition-all duration-300 cursor-pointer"
                    whileHover={{ scale: 1.2 }}
                />
            </div>

            <div className="hidden md:flex items-center gap-1 ml-4">
                {['Dashboard', 'Applications', 'Analytics'].map((tab, i) => (
                    <motion.div
                        key={tab}
                        className={`px-3 py-1 rounded-md text-[10px] font-medium transition-all ${i === 0 ? 'bg-zinc-800/80 text-zinc-200' : 'text-zinc-500 hover:text-zinc-300'}`}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                    >
                        {tab}
                    </motion.div>
                ))}
            </div>
        </div>

        <motion.div
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-800/50 border border-zinc-700/30"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
        >
            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-emerald-500/80" />
            <span className="text-[9px] md:text-[10px] text-zinc-500 font-mono hidden sm:block">linearflow.app/dashboard</span>
            <span className="text-[9px] md:text-[10px] text-zinc-500 font-mono sm:hidden">linearflow.app</span>
        </motion.div>

        <motion.div
            className="hidden md:flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
        >
            <motion.div
                className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-[10px] font-bold text-white cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
            >
                JD
            </motion.div>
        </motion.div>
    </div>
);

// Sub-component for Dashboard Content
const PreviewDashboardContent: React.FC = () => (
    <div className="p-3 md:p-6 min-h-[320px] md:min-h-[480px] relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

        {/* Mobile: Horizontal Stats Bar */}
        <motion.div
            className="flex md:hidden items-center gap-3 mb-3 px-1 overflow-x-auto pb-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
        >
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-900/60 border border-zinc-800/50 shrink-0">
                <span className="text-lg font-bold text-zinc-100">47</span>
                <span className="text-[9px] text-zinc-500">total</span>
            </div>
            {[
                { label: 'Applied', count: 23, color: 'bg-zinc-500' },
                { label: 'Interview', count: 12, color: 'bg-indigo-500' },
                { label: 'Offer', count: 3, color: 'bg-emerald-500' },
            ].map((item) => (
                <div key={item.label} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-zinc-900/40 border border-zinc-800/30 shrink-0">
                    <div className={`w-1.5 h-1.5 rounded-full ${item.color}`} />
                    <span className="text-[9px] text-zinc-400">{item.label}</span>
                    <span className="text-[10px] font-semibold text-zinc-300">{item.count}</span>
                </div>
            ))}
        </motion.div>

        <div className="flex md:grid md:grid-cols-12 gap-3 md:gap-5 h-full relative">
            {/* Left Sidebar - Stats (Desktop Only) */}
            <PreviewSidebar />

            {/* Main Content - Kanban Preview */}
            <PreviewKanban />
        </div>

        {/* Animated Cursor */}
        <motion.div
            className="absolute w-4 h-4 md:w-5 md:h-5 pointer-events-none z-50 hidden md:block"
            initial={{ x: '30%', y: '30%', opacity: 0 }}
            animate={{
                x: ['30%', '50%', '50%', '70%', '70%', '30%'],
                y: ['30%', '40%', '60%', '35%', '55%', '30%'],
                opacity: [0, 1, 1, 1, 1, 0]
            }}
            transition={{ duration: 8, repeat: Infinity, repeatDelay: 2 }}
        >
            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full drop-shadow-lg">
                <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87c.48 0 .72-.58.38-.92L6.35 2.85a.5.5 0 0 0-.85.36Z" fill="white" stroke="black" strokeWidth="1" />
            </svg>
            <motion.div
                className="absolute top-0 left-0 w-6 h-6 rounded-full border-2 border-indigo-400"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                    scale: [0, 1.5, 0],
                    opacity: [0, 0.5, 0]
                }}
                transition={{ duration: 8, repeat: Infinity, repeatDelay: 2, times: [0, 0.3, 0.35] }}
            />
        </motion.div>
    </div>
);

// Preview Sidebar component
const PreviewSidebar: React.FC = () => (
    <div className="hidden md:block md:col-span-3 space-y-3 md:space-y-4">
        <motion.div
            className="p-3 md:p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/50 relative overflow-hidden"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
        >
            <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] md:text-xs text-zinc-500 font-medium">This Week</span>
                <motion.div
                    className="px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <span className="text-[8px] md:text-[9px] text-emerald-400 font-semibold">+24%</span>
                </motion.div>
            </div>

            <div className="flex items-end gap-2">
                <motion.span
                    className="text-2xl md:text-3xl font-bold text-zinc-100"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    47
                </motion.span>
                <span className="text-[10px] md:text-xs text-zinc-500 mb-1">applications</span>
            </div>

            <div className="flex items-end gap-1 mt-3 h-8 md:h-10">
                {[40, 65, 45, 80, 55, 90, 70].map((height, i) => (
                    <motion.div
                        key={i}
                        className="flex-1 bg-gradient-to-t from-indigo-500/40 to-indigo-400/60 rounded-sm"
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ delay: 1 + i * 0.1, duration: 0.5, ease: "easeOut" }}
                    />
                ))}
            </div>

            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            />
        </motion.div>

        <motion.div
            className="space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
        >
            {[
                { label: 'Applied', count: 23, color: 'bg-zinc-500' },
                { label: 'Interview', count: 12, color: 'bg-indigo-500' },
                { label: 'Offer', count: 3, color: 'bg-emerald-500' },
            ].map((item, i) => (
                <motion.div
                    key={item.label}
                    className="flex items-center gap-2 md:gap-3 p-2 md:p-2.5 rounded-lg bg-zinc-900/40 border border-zinc-800/30 cursor-pointer hover:bg-zinc-800/40 hover:border-zinc-700/50 transition-all group/stat"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + i * 0.15 }}
                    whileHover={{ x: 4 }}
                >
                    <motion.div
                        className={`w-2 h-2 rounded-full ${item.color}`}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                    />
                    <span className="text-[10px] md:text-xs text-zinc-400 flex-1">{item.label}</span>
                    <span className="text-[10px] md:text-xs font-semibold text-zinc-300 group-hover/stat:text-indigo-400 transition-colors">{item.count}</span>
                </motion.div>
            ))}
        </motion.div>
    </div>
);

// Preview Kanban component
const PreviewKanban: React.FC = () => (
    <div className="flex-1 md:col-span-9 overflow-x-auto md:overflow-visible scrollbar-hide">
        <div className="flex md:grid md:grid-cols-3 gap-2 md:gap-3 min-w-max md:min-w-0">
            {/* Column 1 - Applied */}
            <motion.div
                className="w-[140px] md:w-auto shrink-0 md:shrink rounded-xl bg-zinc-900/40 border border-zinc-800/40 p-2 md:p-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
            >
                <div className="flex items-center gap-1.5 md:gap-2 mb-2 md:mb-3 px-1">
                    <div className="w-2 h-2 rounded-full bg-zinc-500" />
                    <span className="text-[9px] md:text-xs font-medium text-zinc-400">Applied</span>
                    <span className="ml-auto text-[8px] md:text-[10px] text-zinc-600 bg-zinc-800/50 px-1.5 py-0.5 rounded">8</span>
                </div>

                <div className="space-y-2">
                    {[
                        { company: 'Stripe', role: 'Senior Engineer', logo: 'S', color: 'from-violet-500 to-indigo-600' },
                        { company: 'Vercel', role: 'Full Stack Dev', logo: 'V', color: 'from-zinc-600 to-zinc-800' },
                    ].map((job, i) => (
                        <motion.div
                            key={job.company}
                            className="p-2 md:p-3 rounded-lg bg-zinc-800/40 border border-zinc-700/30 cursor-pointer hover:border-zinc-600/50 hover:bg-zinc-800/60 transition-all group/card"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.2 + i * 0.15 }}
                            whileHover={{ y: -2, scale: 1.02 }}
                        >
                            <div className="flex items-center gap-2">
                                <div className={`w-6 h-6 md:w-7 md:h-7 rounded-lg bg-gradient-to-br ${job.color} flex items-center justify-center text-[8px] md:text-[10px] font-bold text-white shrink-0`}>
                                    {job.logo}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-[9px] md:text-xs font-medium text-zinc-200 truncate">{job.company}</div>
                                    <div className="text-[8px] md:text-[10px] text-zinc-500 truncate">{job.role}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    <div className="hidden md:block p-2 md:p-3 rounded-lg bg-zinc-800/20 border border-zinc-800/20 opacity-40">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 md:w-7 md:h-7 rounded-lg bg-zinc-800/60" />
                            <div className="flex-1 space-y-1.5">
                                <div className="h-2 md:h-2.5 w-16 bg-zinc-800/60 rounded" />
                                <div className="h-1.5 md:h-2 w-12 bg-zinc-800/40 rounded" />
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Column 2 - Interview (Active) */}
            <motion.div
                className="w-[160px] md:w-auto shrink-0 md:shrink rounded-xl bg-indigo-500/5 border border-indigo-500/20 p-2 md:p-3 relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
            >
                <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 to-transparent"
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity }}
                />

                <div className="flex items-center gap-1.5 md:gap-2 mb-2 md:mb-3 px-1 relative">
                    <motion.div
                        className="w-2 h-2 rounded-full bg-indigo-500"
                        animate={{ scale: [1, 1.3, 1], boxShadow: ['0 0 0 rgba(99,102,241,0)', '0 0 8px rgba(99,102,241,0.6)', '0 0 0 rgba(99,102,241,0)'] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="text-[9px] md:text-xs font-medium text-indigo-300">Interview</span>
                    <span className="ml-auto text-[8px] md:text-[10px] text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded border border-indigo-500/20">3</span>
                </div>

                <div className="space-y-2 relative">
                    <motion.div
                        className="p-2 md:p-3 rounded-xl bg-zinc-900/90 border border-indigo-500/40 shadow-lg shadow-indigo-500/10 relative overflow-hidden"
                        animate={{
                            y: [0, -4, 0],
                            boxShadow: ['0 4px 12px rgba(99,102,241,0.1)', '0 8px 20px rgba(99,102,241,0.2)', '0 4px 12px rgba(99,102,241,0.1)']
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <motion.div
                            className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-indigo-400 to-violet-500"
                            animate={{ opacity: [0.7, 1, 0.7] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />

                        <div className="flex items-start gap-2 pl-2">
                            <motion.div
                                className="w-6 h-6 md:w-8 md:h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-[9px] md:text-xs font-bold text-white shadow-lg shrink-0"
                                whileHover={{ rotate: 5, scale: 1.1 }}
                            >
                                G
                            </motion.div>
                            <div className="flex-1 min-w-0">
                                <div className="text-[9px] md:text-xs font-semibold text-zinc-100">Google</div>
                                <div className="text-[8px] md:text-[10px] text-zinc-400 truncate">Software Engineer</div>
                                <div className="flex items-center gap-1 md:gap-1.5 mt-1 md:mt-1.5 flex-wrap">
                                    <motion.div
                                        className="px-1 md:px-1.5 py-0.5 rounded bg-indigo-500/20 border border-indigo-500/30"
                                        animate={{ borderColor: ['rgba(99,102,241,0.3)', 'rgba(99,102,241,0.6)', 'rgba(99,102,241,0.3)'] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    >
                                        <span className="text-[7px] md:text-[9px] text-indigo-300 font-medium">Round 2</span>
                                    </motion.div>
                                    <span className="text-[7px] md:text-[9px] text-zinc-500 hidden md:inline">Tomorrow</span>
                                </div>
                            </div>
                        </div>

                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent -skew-x-12"
                            animate={{ x: ['-100%', '200%'] }}
                            transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                        />
                    </motion.div>

                    <motion.div
                        className="p-2 md:p-2.5 rounded-lg bg-zinc-800/40 border border-zinc-700/30 opacity-70"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.7 }}
                        transition={{ delay: 1.5 }}
                    >
                        <div className="flex items-center gap-2">
                            <div className="w-5 h-5 md:w-6 md:h-6 rounded-lg bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-[7px] md:text-[9px] font-bold text-white shrink-0">M</div>
                            <div className="flex-1 min-w-0">
                                <div className="text-[8px] md:text-[10px] font-medium text-zinc-300">Meta</div>
                                <div className="text-[7px] md:text-[9px] text-zinc-500 truncate">Product Engineer</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Column 3 - Offer */}
            <motion.div
                className="w-[140px] md:w-auto shrink-0 md:shrink rounded-xl bg-emerald-500/5 border border-emerald-500/20 p-2 md:p-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
            >
                <div className="flex items-center gap-1.5 md:gap-2 mb-2 md:mb-3 px-1">
                    <motion.div
                        className="w-2 h-2 rounded-full bg-emerald-500"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    />
                    <span className="text-[9px] md:text-xs font-medium text-emerald-300">Offer</span>
                    <span className="ml-auto text-[8px] md:text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">2</span>
                </div>

                <div className="space-y-2">
                    <motion.div
                        className="p-2 md:p-3 rounded-xl bg-zinc-900/80 border border-emerald-500/30 relative overflow-hidden"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.6 }}
                    >
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent"
                            animate={{ opacity: [0.3, 0.6, 0.3] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        />

                        <div className="flex items-start gap-2 relative">
                            <motion.div
                                className="w-6 h-6 md:w-7 md:h-7 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shrink-0"
                                animate={{ rotate: [0, 5, -5, 0] }}
                                transition={{ duration: 4, repeat: Infinity }}
                            >
                                <Check size={12} className="text-white" />
                            </motion.div>
                            <div className="flex-1 min-w-0">
                                <div className="text-[9px] md:text-xs font-semibold text-zinc-100">Shopify</div>
                                <div className="text-[8px] md:text-[10px] text-zinc-400">Senior SWE</div>
                                <motion.div
                                    className="text-[9px] md:text-[11px] font-bold text-emerald-400 mt-1"
                                    animate={{ opacity: [0.7, 1, 0.7] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    $185K
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>

        {/* Mobile scroll indicator */}
        <div className="flex md:hidden justify-center mt-2 gap-1">
            <div className="w-4 h-1 rounded-full bg-indigo-500/60" />
            <div className="w-1 h-1 rounded-full bg-zinc-700" />
            <div className="w-1 h-1 rounded-full bg-zinc-700" />
        </div>
    </div>
);

export default PreviewSection;
