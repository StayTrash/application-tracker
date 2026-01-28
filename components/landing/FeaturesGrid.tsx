'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Kanban, Search, Command, Sparkles, MousePointer2, GripVertical, Check } from 'lucide-react';

const FeaturesGrid: React.FC = () => {
    return (
        <section className="w-full max-w-6xl mx-auto px-4 md:px-6 mb-20 md:mb-32 relative z-20">
            {/* Section Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12 md:mb-16"
            >
                <motion.div
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/80 border border-zinc-800 mb-6"
                    whileHover={{ scale: 1.02, borderColor: "rgba(99, 102, 241, 0.3)" }}
                >
                    <motion.div
                        className="w-2 h-2 rounded-full bg-indigo-500"
                        animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="text-xs font-medium text-zinc-400">Powerful Features</span>
                </motion.div>
                <h2 className="text-2xl md:text-4xl font-semibold text-zinc-100 tracking-tight mb-4 px-2">
                    Everything you need to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">succeed</span>
                </h2>
                <p className="text-sm md:text-base text-zinc-500 max-w-lg mx-auto px-4">
                    Built with precision. Designed for speed. Crafted for job seekers who mean business.
                </p>
            </motion.div>

            {/* Bento Grid - Clean 6 column layout */}
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-5">
                <KanbanCard />
                <MetricsCard />
                <KeyboardCard />
                <FluidInteractionsCard />
            </div>
        </section>
    );
};

// Kanban Workflow Card
const KanbanCard: React.FC = () => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="md:col-span-4 rounded-2xl md:rounded-3xl border border-zinc-800/60 bg-zinc-900/70 overflow-hidden group hover:border-indigo-500/30 transition-all duration-500"
    >
        <div className="p-5 md:p-6">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                    <Kanban size={16} />
                </div>
                <div>
                    <h3 className="text-sm font-semibold text-zinc-100">Precision Workflow</h3>
                    <p className="text-zinc-500 text-xs">Drag and drop with fluid animations</p>
                </div>
            </div>

            <div className="bg-zinc-950 rounded-lg border border-zinc-800 p-3 relative overflow-hidden">
                <div className="flex gap-2">
                    {/* Applied Column */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
                            <span className="text-[10px] font-medium text-zinc-400">Applied</span>
                            <span className="text-[8px] text-zinc-600 ml-auto">5</span>
                        </div>
                        <div className="space-y-1.5">
                            <div className="p-2 rounded-md bg-zinc-800/50 border border-zinc-700/30">
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 rounded bg-zinc-700 flex items-center justify-center text-[8px] font-bold text-zinc-400">M</div>
                                    <div className="flex-1 min-w-0">
                                        <div className="h-1.5 w-full bg-zinc-700/60 rounded-full" />
                                    </div>
                                </div>
                            </div>
                            <div className="p-2 rounded-md bg-zinc-800/30 border border-zinc-800/30">
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 rounded bg-zinc-700/50" />
                                    <div className="h-1.5 w-3/4 bg-zinc-800/60 rounded-full" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Interview Column */}
                    <div className="flex-1 min-w-0 relative">
                        <div className="flex items-center gap-1.5 mb-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                            <span className="text-[10px] font-medium text-zinc-300">Interview</span>
                            <motion.span
                                className="text-[8px] text-zinc-600 ml-auto"
                                animate={{ opacity: [1, 1, 1, 0.5, 0.5, 1] }}
                                transition={{ duration: 4, repeat: Infinity, times: [0, 0.2, 0.25, 0.3, 0.7, 0.75] }}
                            >
                                <motion.span
                                    animate={{ opacity: [1, 1, 0, 0, 1, 1] }}
                                    transition={{ duration: 4, repeat: Infinity, times: [0, 0.25, 0.3, 0.7, 0.75, 1] }}
                                >2</motion.span>
                            </motion.span>
                        </div>
                        <div className="space-y-1.5">
                            <motion.div
                                className="p-2 rounded-md bg-zinc-900 border-2 border-indigo-500/50 shadow-lg shadow-indigo-500/20 relative z-20"
                                animate={{
                                    x: [0, 0, 0, 135, 135, 135, 0],
                                    y: [0, -4, -4, -4, 0, 0, 0],
                                    scale: [1, 1.02, 1.02, 1.02, 1, 1, 1],
                                    boxShadow: [
                                        '0 4px 12px rgba(99,102,241,0.2)',
                                        '0 8px 24px rgba(99,102,241,0.3)',
                                        '0 8px 24px rgba(99,102,241,0.3)',
                                        '0 8px 24px rgba(16,185,129,0.3)',
                                        '0 4px 12px rgba(16,185,129,0.2)',
                                        '0 4px 12px rgba(16,185,129,0.2)',
                                        '0 4px 12px rgba(99,102,241,0.2)'
                                    ],
                                    borderColor: [
                                        'rgba(99,102,241,0.5)',
                                        'rgba(99,102,241,0.7)',
                                        'rgba(99,102,241,0.7)',
                                        'rgba(16,185,129,0.7)',
                                        'rgba(16,185,129,0.5)',
                                        'rgba(16,185,129,0.5)',
                                        'rgba(99,102,241,0.5)'
                                    ]
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    times: [0, 0.2, 0.25, 0.45, 0.5, 0.85, 1],
                                    ease: "easeInOut"
                                }}
                            >
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 rounded bg-indigo-500 flex items-center justify-center text-[8px] font-bold text-white">G</div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[9px] text-zinc-200 font-medium truncate">Google</p>
                                        <p className="text-[7px] text-zinc-500">Frontend</p>
                                    </div>
                                    <GripVertical size={10} className="text-zinc-600" />
                                </div>
                            </motion.div>

                            <div className="p-2 rounded-md bg-zinc-800/40 border border-zinc-800/40">
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 rounded bg-violet-500/50 flex items-center justify-center text-[8px] font-bold text-white">S</div>
                                    <div className="flex-1">
                                        <div className="h-1.5 w-full bg-zinc-700/50 rounded-full" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Offer Column */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            <span className="text-[10px] font-medium text-zinc-300">Offer</span>
                            <motion.span
                                className="text-[8px] text-zinc-600 ml-auto"
                                animate={{ opacity: [1, 1, 1, 1, 1, 1] }}
                                transition={{ duration: 4, repeat: Infinity }}
                            >
                                <motion.span
                                    animate={{ opacity: [1, 1, 0, 0, 1, 1] }}
                                    transition={{ duration: 4, repeat: Infinity, times: [0, 0.45, 0.5, 0.85, 0.9, 1] }}
                                >1</motion.span>
                                <motion.span
                                    className="absolute"
                                    animate={{ opacity: [0, 0, 1, 1, 0, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, times: [0, 0.45, 0.5, 0.85, 0.9, 1] }}
                                >2</motion.span>
                            </motion.span>
                        </div>
                        <div className="space-y-1.5">
                            <div className="p-2 rounded-md bg-zinc-800/40 border border-emerald-500/20">
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 rounded bg-emerald-500/30 flex items-center justify-center">
                                        <Check size={10} className="text-emerald-400" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="h-1.5 w-full bg-zinc-700/50 rounded-full" />
                                    </div>
                                </div>
                            </div>

                            <motion.div
                                className="p-2 rounded-md border border-dashed"
                                animate={{
                                    borderColor: ['rgba(63,63,70,0.3)', 'rgba(63,63,70,0.3)', 'rgba(16,185,129,0.5)', 'rgba(16,185,129,0.5)', 'rgba(63,63,70,0)', 'rgba(63,63,70,0.3)'],
                                    backgroundColor: ['transparent', 'transparent', 'rgba(16,185,129,0.05)', 'rgba(16,185,129,0.1)', 'transparent', 'transparent']
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    times: [0, 0.2, 0.35, 0.45, 0.55, 1]
                                }}
                            >
                                <div className="h-5" />
                            </motion.div>
                        </div>
                    </div>
                </div>

                <motion.div
                    className="absolute z-30 pointer-events-none"
                    animate={{
                        x: [130, 130, 130, 245, 245, 245, 130],
                        y: [75, 65, 65, 65, 75, 75, 75],
                        opacity: [0, 1, 1, 1, 0, 0, 0]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        times: [0, 0.18, 0.25, 0.45, 0.5, 0.85, 1],
                        ease: "easeInOut"
                    }}
                >
                    <MousePointer2 size={14} className="text-white fill-white drop-shadow-lg" />
                </motion.div>
            </div>

            <div className="flex items-center justify-center gap-2 mt-3">
                <motion.div
                    className="flex items-center gap-1.5 text-[10px]"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <GripVertical size={10} className="text-zinc-600" />
                    <span className="text-zinc-500">Drag to move</span>
                </motion.div>
            </div>
        </div>
    </motion.div>
);

// Metrics Card
const MetricsCard: React.FC = () => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="md:col-span-2 rounded-2xl md:rounded-3xl border border-zinc-800/60 bg-gradient-to-br from-zinc-900/80 to-emerald-950/10 overflow-hidden group hover:border-emerald-500/40 hover:shadow-[0_0_50px_-15px_rgba(16,185,129,0.4)] transition-all duration-500 relative"
    >
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="p-5 md:p-6 h-full flex flex-col relative z-10">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                        <Sparkles size={16} />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-zinc-100">Insights</h3>
                        <p className="text-zinc-500 text-xs">Track your progress</p>
                    </div>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span className="text-[9px] text-emerald-400 font-semibold">LIVE</span>
                </div>
            </div>

            <div className="flex justify-center mb-4">
                <div className="relative w-24 h-24">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(39, 39, 42, 0.5)" strokeWidth="8" />
                        <motion.circle
                            cx="50" cy="50" r="40" fill="none"
                            stroke="url(#progressGradientSimple)"
                            strokeWidth="8" strokeLinecap="round"
                            strokeDasharray="251"
                            initial={{ strokeDashoffset: 251 }}
                            whileInView={{ strokeDashoffset: 63 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                        />
                        <defs>
                            <linearGradient id="progressGradientSimple" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#10b981" />
                                <stop offset="100%" stopColor="#14b8a6" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-xl font-bold text-zinc-100">75%</span>
                        <span className="text-xs text-zinc-500">Success</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-auto">
                {[
                    { label: 'Applied', value: '24', trend: '+3' },
                    { label: 'Interview', value: '8', trend: '+2' },
                ].map((stat) => (
                    <motion.div
                        key={stat.label}
                        whileHover={{ scale: 1.02, y: -1 }}
                        className="p-2.5 rounded-lg bg-zinc-800/40 border border-zinc-800/50 hover:border-emerald-500/20 transition-colors"
                    >
                        <div className="flex items-center justify-between mb-0.5">
                            <span className="text-xs text-zinc-500">{stat.label}</span>
                            <span className="text-xs text-emerald-400 font-medium">{stat.trend}</span>
                        </div>
                        <span className="text-base font-bold text-zinc-100">{stat.value}</span>
                    </motion.div>
                ))}
            </div>
        </div>
    </motion.div>
);

// Keyboard First Card
const KeyboardCard: React.FC = () => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="md:col-span-3 rounded-2xl md:rounded-3xl border border-zinc-800/60 bg-zinc-900/60 overflow-hidden group hover:border-amber-500/30 hover:shadow-[0_0_40px_-15px_rgba(245,158,11,0.3)] transition-all duration-500"
    >
        <div className="p-5 md:p-6">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                    <Command size={16} />
                </div>
                <div>
                    <h3 className="text-sm font-semibold text-zinc-100">Keyboard First</h3>
                    <p className="text-zinc-500 text-xs">Search anything instantly</p>
                </div>
            </div>

            <div className="bg-zinc-950 rounded-lg border border-zinc-800 overflow-hidden">
                <div className="px-3 py-2.5 flex items-center gap-2 border-b border-zinc-800/50">
                    <Search size={14} className="text-zinc-600" />
                    <div className="flex-1 relative">
                        <motion.span
                            className="text-sm text-zinc-300 font-light"
                            animate={{
                                width: ['0ch', '0ch', '1ch', '2ch', '3ch', '4ch', '5ch', '6ch', '7ch', '8ch', '9ch', '9ch', '9ch', '0ch']
                            }}
                            transition={{
                                duration: 6,
                                repeat: Infinity,
                                times: [0, 0.08, 0.12, 0.16, 0.2, 0.24, 0.28, 0.32, 0.36, 0.4, 0.44, 0.75, 0.9, 1],
                                ease: "linear"
                            }}
                            style={{ display: 'inline-block', overflow: 'hidden', whiteSpace: 'nowrap', verticalAlign: 'bottom' }}
                        >
                            interview
                        </motion.span>
                        <motion.span
                            className="inline-block w-[2px] h-4 bg-amber-400 ml-px align-middle"
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                        />
                    </div>
                    <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-[9px] text-zinc-500 font-mono">⌘K</kbd>
                </div>

                <motion.div
                    className="overflow-hidden"
                    animate={{ height: ['0px', '0px', '132px', '132px', '0px'] }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        times: [0, 0.44, 0.5, 0.9, 0.95],
                        ease: "easeOut"
                    }}
                >
                    <div className="p-2">
                        <p className="px-2 py-0.5 text-[9px] text-zinc-600 uppercase tracking-wider">Applications</p>

                        <motion.div
                            className="px-2.5 py-2 rounded-md bg-amber-500/10 flex items-center gap-2.5 mt-1"
                            animate={{
                                backgroundColor: ['rgba(245,158,11,0.1)', 'rgba(245,158,11,0.15)', 'rgba(245,158,11,0.1)']
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <div className="w-6 h-6 rounded bg-indigo-500 flex items-center justify-center text-[10px] font-bold text-white">G</div>
                            <div className="flex-1 min-w-0">
                                <p className="text-[11px] text-zinc-200 font-medium truncate">Google - Interview</p>
                                <p className="text-[9px] text-zinc-500">Senior Frontend Engineer</p>
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                                <span className="text-[9px] text-amber-400">Today</span>
                            </div>
                        </motion.div>

                        <motion.div
                            className="px-2.5 py-2 rounded-md flex items-center gap-2.5 mt-1"
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: [0, 0, 1, 1, 0], y: [5, 5, 0, 0, 5] }}
                            transition={{ duration: 6, repeat: Infinity, times: [0, 0.48, 0.54, 0.9, 0.95] }}
                        >
                            <div className="w-6 h-6 rounded bg-emerald-600 flex items-center justify-center text-[10px] font-bold text-white">S</div>
                            <div className="flex-1 min-w-0">
                                <p className="text-[11px] text-zinc-400 truncate">Spotify - Interview</p>
                                <p className="text-[9px] text-zinc-600">Product Designer</p>
                            </div>
                            <span className="text-[9px] text-zinc-600">Tomorrow</span>
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            <div className="flex items-center gap-3 mt-3 text-[10px] text-zinc-600">
                <span className="flex items-center gap-1"><kbd className="text-amber-500/70">↑↓</kbd> navigate</span>
                <span className="flex items-center gap-1"><kbd className="text-amber-500/70">↵</kbd> open</span>
                <span className="flex items-center gap-1"><kbd className="text-amber-500/70">esc</kbd> close</span>
            </div>
        </div>
    </motion.div>
);

// Fluid Interactions Card
const FluidInteractionsCard: React.FC = () => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="md:col-span-3 rounded-2xl md:rounded-3xl border border-zinc-800/60 bg-gradient-to-br from-zinc-900/80 to-pink-950/10 overflow-hidden group hover:border-pink-500/40 hover:shadow-[0_0_50px_-15px_rgba(236,72,153,0.4)] transition-all duration-500 relative"
    >
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-pink-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="p-5 md:p-6 relative z-10">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400">
                    <MousePointer2 size={16} />
                </div>
                <div>
                    <h3 className="text-sm font-semibold text-zinc-100">Fluid Interactions</h3>
                    <p className="text-zinc-500 text-xs">Natural, responsive animations</p>
                </div>
            </div>

            <div className="relative h-[140px] bg-zinc-950/30 rounded-xl border border-zinc-800/30 p-2 overflow-hidden">
                <motion.div
                    className="absolute left-2 right-2 p-2.5 rounded-lg bg-zinc-900 border-2 flex items-center gap-3 z-20"
                    animate={{
                        top: [8, 52, 52, 8],
                        borderColor: ["#27272a", "#ec4899", "#ec4899", "#27272a"],
                        boxShadow: [
                            "0 2px 8px rgba(0,0,0,0.2)",
                            "0 8px 20px rgba(236,72,153,0.25)",
                            "0 8px 20px rgba(236,72,153,0.25)",
                            "0 2px 8px rgba(0,0,0,0.2)"
                        ]
                    }}
                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 1.5, ease: "easeInOut" }}
                >
                    <GripVertical size={14} className="text-zinc-500" />
                    <div className="w-6 h-6 rounded-md bg-gradient-to-br from-pink-500/30 to-pink-600/20 border border-pink-500/30 flex items-center justify-center text-pink-400 text-[10px] font-bold">1</div>
                    <div className="flex-1 space-y-1">
                        <div className="h-1.5 w-20 bg-zinc-700 rounded-full" />
                        <div className="h-1 w-14 bg-zinc-800 rounded-full" />
                    </div>
                    <motion.div
                        className="w-1.5 h-1.5 rounded-full bg-pink-500"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1, repeat: Infinity }}
                    />
                </motion.div>

                <motion.div
                    className="absolute left-2 right-2 p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800/60 flex items-center gap-3 z-10"
                    animate={{ top: [52, 8, 8, 52] }}
                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 1.5, ease: "easeInOut" }}
                >
                    <GripVertical size={14} className="text-zinc-600" />
                    <div className="w-6 h-6 rounded-md bg-zinc-800 flex items-center justify-center text-zinc-500 text-[10px] font-bold">2</div>
                    <div className="flex-1 space-y-1">
                        <div className="h-1.5 w-24 bg-zinc-800 rounded-full" />
                        <div className="h-1 w-16 bg-zinc-800/60 rounded-full" />
                    </div>
                </motion.div>

                <div className="absolute left-2 right-2 top-[96px] p-2.5 rounded-lg bg-zinc-900/30 border border-zinc-800/30 flex items-center gap-3 opacity-40">
                    <GripVertical size={14} className="text-zinc-700" />
                    <div className="w-6 h-6 rounded-md bg-zinc-800/60 flex items-center justify-center text-zinc-600 text-[10px] font-bold">3</div>
                    <div className="flex-1 space-y-1">
                        <div className="h-1.5 w-16 bg-zinc-800/50 rounded-full" />
                        <div className="h-1 w-10 bg-zinc-800/30 rounded-full" />
                    </div>
                </div>
            </div>
        </div>
    </motion.div>
);

export default FeaturesGrid;
