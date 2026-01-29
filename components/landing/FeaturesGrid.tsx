'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Kanban, Search, Command, Sparkles, MousePointer2, GripVertical, Check } from 'lucide-react';
import { useTheme } from '@/components/providers/ThemeProvider';

const FeaturesGrid: React.FC = () => {
    const { theme } = useTheme();

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
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6 ${
                        theme === 'dark' 
                            ? 'bg-zinc-900/80 border-zinc-800' 
                            : 'bg-white/80 border-zinc-200 shadow-sm'
                    }`}
                    whileHover={{ scale: 1.02, borderColor: "rgba(99, 102, 241, 0.3)" }}
                >
                    <motion.div
                        className="w-2 h-2 rounded-full bg-indigo-500"
                        animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className={`text-xs font-medium ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>Powerful Features</span>
                </motion.div>
                <h2 className={`text-2xl md:text-4xl font-semibold tracking-tight mb-4 px-2 ${
                    theme === 'dark' ? 'text-zinc-100' : 'text-zinc-900'
                }`}>
                    Everything you need to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-violet-500">succeed</span>
                </h2>
                <p className={`text-sm md:text-base max-w-lg mx-auto px-4 ${
                    theme === 'dark' ? 'text-zinc-500' : 'text-zinc-600'
                }`}>
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
const KanbanCard: React.FC = () => {
    const { theme } = useTheme();
    
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`md:col-span-4 rounded-2xl md:rounded-3xl border overflow-hidden group transition-all duration-500 ${
                theme === 'dark'
                    ? 'border-zinc-800/60 bg-zinc-900/70 hover:border-indigo-500/30'
                    : 'border-zinc-200 bg-white/80 hover:border-indigo-400/40 shadow-sm hover:shadow-md'
            }`}
        >
            <div className="p-5 md:p-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                        theme === 'dark'
                            ? 'bg-indigo-500/10 border border-indigo-500/20 text-indigo-400'
                            : 'bg-indigo-100 border border-indigo-200 text-indigo-600'
                    }`}>
                        <Kanban size={16} />
                    </div>
                    <div>
                        <h3 className={`text-sm font-semibold ${theme === 'dark' ? 'text-zinc-100' : 'text-zinc-900'}`}>Precision Workflow</h3>
                        <p className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'}`}>Drag and drop with fluid animations</p>
                    </div>
                </div>

                <div className={`rounded-lg border p-3 relative overflow-hidden ${
                    theme === 'dark'
                        ? 'bg-zinc-950 border-zinc-800'
                        : 'bg-zinc-50 border-zinc-200'
                }`}>
                    <div className="flex gap-2">
                        {/* Applied Column */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 mb-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
                                <span className={`text-[10px] font-medium ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>Applied</span>
                                <span className={`text-[8px] ml-auto ${theme === 'dark' ? 'text-zinc-600' : 'text-zinc-400'}`}>5</span>
                            </div>
                            <div className="space-y-1.5">
                                <div className={`p-2 rounded-md border ${
                                    theme === 'dark'
                                        ? 'bg-zinc-800/50 border-zinc-700/30'
                                        : 'bg-white border-zinc-200'
                                }`}>
                                    <div className="flex items-center gap-2">
                                        <div className={`w-5 h-5 rounded flex items-center justify-center text-[8px] font-bold ${
                                            theme === 'dark'
                                                ? 'bg-zinc-700 text-zinc-400'
                                                : 'bg-zinc-200 text-zinc-600'
                                        }`}>M</div>
                                        <div className="flex-1 min-w-0">
                                            <div className={`h-1.5 w-full rounded-full ${theme === 'dark' ? 'bg-zinc-700/60' : 'bg-zinc-200'}`} />
                                        </div>
                                    </div>
                                </div>
                                <div className={`p-2 rounded-md border ${
                                    theme === 'dark'
                                        ? 'bg-zinc-800/30 border-zinc-800/30'
                                        : 'bg-zinc-50 border-zinc-200/50'
                                }`}>
                                    <div className="flex items-center gap-2">
                                        <div className={`w-5 h-5 rounded ${theme === 'dark' ? 'bg-zinc-700/50' : 'bg-zinc-200/80'}`} />
                                        <div className={`h-1.5 w-3/4 rounded-full ${theme === 'dark' ? 'bg-zinc-800/60' : 'bg-zinc-200/60'}`} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Interview Column */}
                        <div className="flex-1 min-w-0 relative">
                            <div className="flex items-center gap-1.5 mb-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                                <span className={`text-[10px] font-medium ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`}>Interview</span>
                                <motion.span
                                    className={`text-[8px] ml-auto ${theme === 'dark' ? 'text-zinc-600' : 'text-zinc-400'}`}
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
                                    className={`p-2 rounded-md border-2 shadow-lg relative z-20 ${
                                        theme === 'dark'
                                            ? 'bg-zinc-900 border-indigo-500/50 shadow-indigo-500/20'
                                            : 'bg-white border-indigo-400/60 shadow-indigo-500/10'
                                    }`}
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
                                            <p className={`text-[9px] font-medium truncate ${theme === 'dark' ? 'text-zinc-200' : 'text-zinc-800'}`}>Google</p>
                                            <p className={`text-[7px] ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'}`}>Frontend</p>
                                        </div>
                                        <GripVertical size={10} className={theme === 'dark' ? 'text-zinc-600' : 'text-zinc-400'} />
                                    </div>
                                </motion.div>

                                <div className={`p-2 rounded-md border ${
                                    theme === 'dark'
                                        ? 'bg-zinc-800/40 border-zinc-800/40'
                                        : 'bg-zinc-50/80 border-zinc-200/60'
                                }`}>
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 rounded bg-violet-500/50 flex items-center justify-center text-[8px] font-bold text-white">S</div>
                                        <div className="flex-1">
                                            <div className={`h-1.5 w-full rounded-full ${theme === 'dark' ? 'bg-zinc-700/50' : 'bg-zinc-200/80'}`} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Offer Column */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 mb-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                <span className={`text-[10px] font-medium ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`}>Offer</span>
                                <motion.span
                                    className={`text-[8px] ml-auto ${theme === 'dark' ? 'text-zinc-600' : 'text-zinc-400'}`}
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
                                <div className={`p-2 rounded-md border ${
                                    theme === 'dark'
                                        ? 'bg-zinc-800/40 border-emerald-500/20'
                                        : 'bg-emerald-50/50 border-emerald-200'
                                }`}>
                                    <div className="flex items-center gap-2">
                                        <div className={`w-5 h-5 rounded flex items-center justify-center ${
                                            theme === 'dark'
                                                ? 'bg-emerald-500/30'
                                                : 'bg-emerald-100'
                                        }`}>
                                            <Check size={10} className="text-emerald-500" />
                                        </div>
                                        <div className="flex-1">
                                            <div className={`h-1.5 w-full rounded-full ${theme === 'dark' ? 'bg-zinc-700/50' : 'bg-zinc-200/80'}`} />
                                        </div>
                                    </div>
                                </div>

                                <motion.div
                                    className="p-2 rounded-md border border-dashed"
                                    animate={{
                                        borderColor: theme === 'dark' 
                                            ? ['rgba(63,63,70,0.3)', 'rgba(63,63,70,0.3)', 'rgba(16,185,129,0.5)', 'rgba(16,185,129,0.5)', 'rgba(63,63,70,0)', 'rgba(63,63,70,0.3)']
                                            : ['rgba(212,212,216,0.5)', 'rgba(212,212,216,0.5)', 'rgba(16,185,129,0.6)', 'rgba(16,185,129,0.6)', 'rgba(212,212,216,0)', 'rgba(212,212,216,0.5)'],
                                        backgroundColor: theme === 'dark'
                                            ? ['transparent', 'transparent', 'rgba(16,185,129,0.05)', 'rgba(16,185,129,0.1)', 'transparent', 'transparent']
                                            : ['transparent', 'transparent', 'rgba(16,185,129,0.08)', 'rgba(16,185,129,0.12)', 'transparent', 'transparent']
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
                        <MousePointer2 size={14} className={`drop-shadow-lg ${theme === 'dark' ? 'text-white fill-white' : 'text-zinc-800 fill-zinc-800'}`} />
                    </motion.div>
                </div>

                <div className="flex items-center justify-center gap-2 mt-3">
                    <motion.div
                        className="flex items-center gap-1.5 text-[10px]"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <GripVertical size={10} className={theme === 'dark' ? 'text-zinc-600' : 'text-zinc-400'} />
                        <span className={theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'}>Drag to move</span>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

// Animated Counter Component
const AnimatedCounter: React.FC<{ value: number; suffix?: string }> = ({ value, suffix = '' }) => {
    const [count, setCount] = React.useState(0);
    const [hasAnimated, setHasAnimated] = React.useState(false);
    const ref = React.useRef<HTMLSpanElement>(null);

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    let start = 0;
                    const duration = 1500;
                    const startTime = performance.now();
                    
                    const animate = (currentTime: number) => {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        const easeOut = 1 - Math.pow(1 - progress, 3);
                        setCount(Math.floor(easeOut * value));
                        
                        if (progress < 1) {
                            requestAnimationFrame(animate);
                        }
                    };
                    requestAnimationFrame(animate);
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [value, hasAnimated]);

    return <span ref={ref}>{count}{suffix}</span>;
};

// Floating Sparkle Component
const FloatingSparkle: React.FC<{ delay: number; x: number; y: number; theme: string }> = ({ delay, x, y, theme }) => (
    <motion.div
        className={`absolute w-1 h-1 rounded-full ${theme === 'dark' ? 'bg-emerald-400' : 'bg-emerald-500'}`}
        style={{ left: `${x}%`, top: `${y}%` }}
        animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
            y: [0, -10, -20],
        }}
        transition={{
            duration: 2,
            repeat: Infinity,
            delay,
            ease: "easeOut"
        }}
    />
);

// Metrics Card
const MetricsCard: React.FC = () => {
    const { theme } = useTheme();
    const [isHovered, setIsHovered] = React.useState(false);
    
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className={`md:col-span-2 rounded-2xl md:rounded-3xl border overflow-hidden group transition-all duration-500 relative ${
                theme === 'dark'
                    ? 'border-zinc-800/60 bg-gradient-to-br from-zinc-900/80 to-emerald-950/10 hover:border-emerald-500/40 hover:shadow-[0_0_50px_-15px_rgba(16,185,129,0.4)]'
                    : 'border-zinc-200 bg-gradient-to-br from-white to-emerald-50/30 hover:border-emerald-400/50 hover:shadow-lg shadow-sm'
            }`}
        >
            {/* Animated background glow */}
            <motion.div 
                className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl pointer-events-none ${
                    theme === 'dark' ? 'bg-emerald-500/5' : 'bg-emerald-400/10'
                }`}
                animate={{
                    scale: isHovered ? [1, 1.2, 1] : 1,
                    opacity: isHovered ? [0.5, 0.8, 0.5] : 0.5,
                }}
                transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
            />
            
            {/* Floating sparkles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <FloatingSparkle delay={0} x={20} y={30} theme={theme} />
                <FloatingSparkle delay={0.5} x={80} y={40} theme={theme} />
                <FloatingSparkle delay={1} x={60} y={70} theme={theme} />
                <FloatingSparkle delay={1.5} x={30} y={60} theme={theme} />
            </div>

            <div className="p-5 md:p-6 h-full flex flex-col relative z-10">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                        {/* Animated icon container */}
                        <motion.div 
                            className={`w-9 h-9 rounded-lg flex items-center justify-center relative ${
                                theme === 'dark'
                                    ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                                    : 'bg-emerald-100 border border-emerald-200 text-emerald-600'
                            }`}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                            {/* Glow ring on hover */}
                            <motion.div
                                className="absolute inset-0 rounded-lg"
                                animate={{
                                    boxShadow: isHovered 
                                        ? ['0 0 0 0 rgba(16, 185, 129, 0)', '0 0 0 4px rgba(16, 185, 129, 0.3)', '0 0 0 0 rgba(16, 185, 129, 0)']
                                        : '0 0 0 0 rgba(16, 185, 129, 0)'
                                }}
                                transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0 }}
                            />
                            <motion.div
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <Sparkles size={16} />
                            </motion.div>
                        </motion.div>
                        <div>
                            <h3 className={`text-sm font-semibold ${theme === 'dark' ? 'text-zinc-100' : 'text-zinc-900'}`}>Insights</h3>
                            <p className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'}`}>Track your progress</p>
                        </div>
                    </div>
                    
                    {/* Enhanced LIVE badge */}
                    <motion.div 
                        className={`flex items-center gap-1.5 px-2 py-1 rounded-full border ${
                            theme === 'dark'
                                ? 'bg-emerald-500/10 border-emerald-500/20'
                                : 'bg-emerald-100 border-emerald-200'
                        }`}
                        animate={{ scale: [1, 1.02, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <motion.div 
                            className="w-1.5 h-1.5 rounded-full bg-emerald-500 relative"
                            animate={{ 
                                scale: [1, 1.2, 1],
                                opacity: [1, 0.7, 1]
                            }}
                            transition={{ duration: 1, repeat: Infinity }}
                        >
                            {/* Pulse ring */}
                            <motion.div
                                className="absolute inset-0 rounded-full bg-emerald-500"
                                animate={{ 
                                    scale: [1, 2.5],
                                    opacity: [0.6, 0]
                                }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            />
                        </motion.div>
                        <span className={`text-[9px] font-semibold ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`}>LIVE</span>
                    </motion.div>
                </div>

                {/* Enhanced Progress Ring */}
                <div className="flex justify-center mb-4">
                    <motion.div 
                        className="relative w-24 h-24"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        {/* Outer glow ring */}
                        <motion.div
                            className="absolute inset-0 rounded-full"
                            animate={{
                                boxShadow: [
                                    '0 0 20px rgba(16, 185, 129, 0.1)',
                                    '0 0 30px rgba(16, 185, 129, 0.2)',
                                    '0 0 20px rgba(16, 185, 129, 0.1)'
                                ]
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                        />
                        
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                            {/* Background track */}
                            <circle 
                                cx="50" cy="50" r="40" 
                                fill="none" 
                                stroke={theme === 'dark' ? 'rgba(39, 39, 42, 0.5)' : 'rgba(228, 228, 231, 0.8)'} 
                                strokeWidth="8" 
                            />
                            
                            {/* Animated progress arc */}
                            <motion.circle
                                cx="50" cy="50" r="40" fill="none"
                                stroke="url(#progressGradientSimple)"
                                strokeWidth="8" strokeLinecap="round"
                                strokeDasharray="251"
                                initial={{ strokeDashoffset: 251 }}
                                whileInView={{ strokeDashoffset: 63 }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                            />
                            
                            {/* Animated glow overlay */}
                            <motion.circle
                                cx="50" cy="50" r="40" fill="none"
                                stroke="url(#progressGlowGradient)"
                                strokeWidth="10" strokeLinecap="round"
                                strokeDasharray="251"
                                style={{ filter: 'blur(4px)' }}
                                initial={{ strokeDashoffset: 251, opacity: 0 }}
                                whileInView={{ strokeDashoffset: 63, opacity: 0.5 }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                            />
                            
                            <defs>
                                <linearGradient id="progressGradientSimple" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#10b981" />
                                    <stop offset="100%" stopColor="#14b8a6" />
                                </linearGradient>
                                <linearGradient id="progressGlowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#10b981" />
                                    <stop offset="100%" stopColor="#14b8a6" />
                                </linearGradient>
                            </defs>
                        </svg>
                        
                        {/* Center content with animated counter */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <motion.span 
                                className={`text-xl font-bold ${theme === 'dark' ? 'text-zinc-100' : 'text-zinc-900'}`}
                                initial={{ scale: 0.5, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 1, type: "spring", stiffness: 200 }}
                            >
                                <AnimatedCounter value={75} suffix="%" />
                            </motion.span>
                            <motion.span 
                                className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'}`}
                                initial={{ opacity: 0, y: 5 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.2 }}
                            >
                                Success
                            </motion.span>
                        </div>
                        
                        {/* Rotating highlight dot */}
                        <motion.div
                            className="absolute w-2 h-2 rounded-full bg-emerald-400 shadow-lg shadow-emerald-500/50"
                            style={{ top: '50%', left: '50%', transformOrigin: '0 0' }}
                            animate={{ 
                                rotate: [0, 270],
                                opacity: [0, 1, 1, 0]
                            }}
                            transition={{ 
                                duration: 1.5, 
                                ease: "easeOut",
                                times: [0, 0.1, 0.9, 1]
                            }}
                            initial={{ x: 40, y: -4 }}
                        />
                    </motion.div>
                </div>

                {/* Enhanced Stats Grid */}
                <div className="grid grid-cols-2 gap-2 mt-auto">
                    {[
                        { label: 'Applied', value: 24, trend: '+3', color: 'emerald' },
                        { label: 'Interview', value: 8, trend: '+2', color: 'teal' },
                    ].map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                            whileHover={{ 
                                scale: 1.03, 
                                y: -2,
                                transition: { type: "spring", stiffness: 400 }
                            }}
                            className={`p-2.5 rounded-lg border transition-all duration-300 cursor-pointer relative overflow-hidden group/stat ${
                                theme === 'dark'
                                    ? 'bg-zinc-800/40 border-zinc-800/50 hover:border-emerald-500/30 hover:bg-zinc-800/60'
                                    : 'bg-white/80 border-zinc-200 hover:border-emerald-300 hover:bg-emerald-50/30'
                            }`}
                        >
                            {/* Hover shine effect */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/stat:translate-x-full transition-transform duration-700"
                            />
                            
                            <div className="flex items-center justify-between mb-0.5 relative z-10">
                                <span className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'}`}>{stat.label}</span>
                                <motion.span 
                                    className="text-xs text-emerald-500 font-medium flex items-center gap-0.5"
                                    animate={{ y: [0, -2, 0] }}
                                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                                >
                                    <motion.svg 
                                        width="8" 
                                        height="8" 
                                        viewBox="0 0 8 8" 
                                        fill="currentColor"
                                        animate={{ y: [0, -1, 0] }}
                                        transition={{ duration: 1, repeat: Infinity, delay: index * 0.2 }}
                                    >
                                        <path d="M4 0L7 4H5V8H3V4H1L4 0Z" />
                                    </motion.svg>
                                    {stat.trend}
                                </motion.span>
                            </div>
                            <span className={`text-base font-bold relative z-10 ${theme === 'dark' ? 'text-zinc-100' : 'text-zinc-900'}`}>
                                <AnimatedCounter value={stat.value} />
                            </span>
                            
                            {/* Bottom accent line */}
                            <motion.div
                                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500"
                                initial={{ width: 0 }}
                                whileHover={{ width: '100%' }}
                                transition={{ duration: 0.3 }}
                            />
                        </motion.div>
                    ))}
                </div>
                
                {/* Mini activity indicator */}
                <motion.div 
                    className="flex items-center justify-center gap-1 mt-3"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            className={`w-1 rounded-full ${theme === 'dark' ? 'bg-emerald-500/60' : 'bg-emerald-500/80'}`}
                            animate={{ 
                                height: ['4px', '12px', '4px'],
                                opacity: [0.5, 1, 0.5]
                            }}
                            transition={{ 
                                duration: 1,
                                repeat: Infinity,
                                delay: i * 0.15,
                                ease: "easeInOut"
                            }}
                        />
                    ))}
                    <span className={`text-[9px] ml-1.5 ${theme === 'dark' ? 'text-zinc-600' : 'text-zinc-400'}`}>
                        Updating...
                    </span>
                </motion.div>
            </div>
        </motion.div>
    );
};

// Keyboard First Card
const KeyboardCard: React.FC = () => {
    const { theme } = useTheme();
    
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`md:col-span-3 rounded-2xl md:rounded-3xl border overflow-hidden group transition-all duration-500 ${
                theme === 'dark'
                    ? 'border-zinc-800/60 bg-zinc-900/60 hover:border-amber-500/30 hover:shadow-[0_0_40px_-15px_rgba(245,158,11,0.3)]'
                    : 'border-zinc-200 bg-white/80 hover:border-amber-400/50 hover:shadow-lg shadow-sm'
            }`}
        >
            <div className="p-5 md:p-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                        theme === 'dark'
                            ? 'bg-amber-500/10 border border-amber-500/20 text-amber-400'
                            : 'bg-amber-100 border border-amber-200 text-amber-600'
                    }`}>
                        <Command size={16} />
                    </div>
                    <div>
                        <h3 className={`text-sm font-semibold ${theme === 'dark' ? 'text-zinc-100' : 'text-zinc-900'}`}>Keyboard First</h3>
                        <p className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'}`}>Search anything instantly</p>
                    </div>
                </div>

                <div className={`rounded-lg border overflow-hidden ${
                    theme === 'dark'
                        ? 'bg-zinc-950 border-zinc-800'
                        : 'bg-zinc-50 border-zinc-200'
                }`}>
                    <div className={`px-3 py-2.5 flex items-center gap-2 border-b ${
                        theme === 'dark' ? 'border-zinc-800/50' : 'border-zinc-200'
                    }`}>
                        <Search size={14} className={theme === 'dark' ? 'text-zinc-600' : 'text-zinc-400'} />
                        <div className="flex-1 relative">
                            <motion.span
                                className={`text-sm font-light ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`}
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
                                className="inline-block w-[2px] h-4 bg-amber-500 ml-px align-middle"
                                animate={{ opacity: [1, 0, 1] }}
                                transition={{ duration: 1, repeat: Infinity }}
                            />
                        </div>
                        <kbd className={`px-1.5 py-0.5 rounded text-[9px] font-mono ${
                            theme === 'dark'
                                ? 'bg-zinc-800 text-zinc-500'
                                : 'bg-zinc-200 text-zinc-600'
                        }`}>⌘K</kbd>
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
                            <p className={`px-2 py-0.5 text-[9px] uppercase tracking-wider ${theme === 'dark' ? 'text-zinc-600' : 'text-zinc-400'}`}>Applications</p>

                            <motion.div
                                className={`px-2.5 py-2 rounded-md flex items-center gap-2.5 mt-1 ${
                                    theme === 'dark'
                                        ? 'bg-amber-500/10'
                                        : 'bg-amber-100/60'
                                }`}
                                animate={{
                                    backgroundColor: theme === 'dark'
                                        ? ['rgba(245,158,11,0.1)', 'rgba(245,158,11,0.15)', 'rgba(245,158,11,0.1)']
                                        : ['rgba(245,158,11,0.15)', 'rgba(245,158,11,0.25)', 'rgba(245,158,11,0.15)']
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <div className="w-6 h-6 rounded bg-indigo-500 flex items-center justify-center text-[10px] font-bold text-white">G</div>
                                <div className="flex-1 min-w-0">
                                    <p className={`text-[11px] font-medium truncate ${theme === 'dark' ? 'text-zinc-200' : 'text-zinc-800'}`}>Google - Interview</p>
                                    <p className={`text-[9px] ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'}`}>Senior Frontend Engineer</p>
                                </div>
                                <div className="flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                                    <span className="text-[9px] text-amber-500">Today</span>
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
                                    <p className={`text-[11px] truncate ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>Spotify - Interview</p>
                                    <p className={`text-[9px] ${theme === 'dark' ? 'text-zinc-600' : 'text-zinc-400'}`}>Product Designer</p>
                                </div>
                                <span className={`text-[9px] ${theme === 'dark' ? 'text-zinc-600' : 'text-zinc-400'}`}>Tomorrow</span>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

                <div className={`flex items-center gap-3 mt-3 text-[10px] ${theme === 'dark' ? 'text-zinc-600' : 'text-zinc-500'}`}>
                    <span className="flex items-center gap-1"><kbd className={theme === 'dark' ? 'text-amber-500/70' : 'text-amber-600'}>↑↓</kbd> navigate</span>
                    <span className="flex items-center gap-1"><kbd className={theme === 'dark' ? 'text-amber-500/70' : 'text-amber-600'}>↵</kbd> open</span>
                    <span className="flex items-center gap-1"><kbd className={theme === 'dark' ? 'text-amber-500/70' : 'text-amber-600'}>esc</kbd> close</span>
                </div>
            </div>
        </motion.div>
    );
};

// Fluid Interactions Card
const FluidInteractionsCard: React.FC = () => {
    const { theme } = useTheme();
    
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className={`md:col-span-3 rounded-2xl md:rounded-3xl border overflow-hidden group transition-all duration-500 relative ${
                theme === 'dark'
                    ? 'border-zinc-800/60 bg-gradient-to-br from-zinc-900/80 to-pink-950/10 hover:border-pink-500/40 hover:shadow-[0_0_50px_-15px_rgba(236,72,153,0.4)]'
                    : 'border-zinc-200 bg-gradient-to-br from-white to-pink-50/30 hover:border-pink-400/50 hover:shadow-lg shadow-sm'
            }`}
        >
            <div className={`absolute bottom-0 right-0 w-40 h-40 rounded-full blur-3xl pointer-events-none ${
                theme === 'dark' ? 'bg-pink-500/5' : 'bg-pink-400/10'
            }`} />

            <div className="p-5 md:p-6 relative z-10">
                <div className="flex items-center gap-3 mb-4">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                        theme === 'dark'
                            ? 'bg-pink-500/10 border border-pink-500/20 text-pink-400'
                            : 'bg-pink-100 border border-pink-200 text-pink-600'
                    }`}>
                        <MousePointer2 size={16} />
                    </div>
                    <div>
                        <h3 className={`text-sm font-semibold ${theme === 'dark' ? 'text-zinc-100' : 'text-zinc-900'}`}>Fluid Interactions</h3>
                        <p className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'}`}>Natural, responsive animations</p>
                    </div>
                </div>

                <div className={`relative h-[140px] rounded-xl border p-2 overflow-hidden ${
                    theme === 'dark'
                        ? 'bg-zinc-950/30 border-zinc-800/30'
                        : 'bg-zinc-50/50 border-zinc-200'
                }`}>
                    <motion.div
                        className={`absolute left-2 right-2 p-2.5 rounded-lg border-2 flex items-center gap-3 z-20 ${
                            theme === 'dark'
                                ? 'bg-zinc-900'
                                : 'bg-white'
                        }`}
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
                        <GripVertical size={14} className={theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'} />
                        <div className={`w-6 h-6 rounded-md bg-gradient-to-br from-pink-500/30 to-pink-600/20 border flex items-center justify-center text-[10px] font-bold ${
                            theme === 'dark'
                                ? 'border-pink-500/30 text-pink-400'
                                : 'border-pink-300 text-pink-600'
                        }`}>1</div>
                        <div className="flex-1 space-y-1">
                            <div className={`h-1.5 w-20 rounded-full ${theme === 'dark' ? 'bg-zinc-700' : 'bg-zinc-200'}`} />
                            <div className={`h-1 w-14 rounded-full ${theme === 'dark' ? 'bg-zinc-800' : 'bg-zinc-100'}`} />
                        </div>
                        <motion.div
                            className="w-1.5 h-1.5 rounded-full bg-pink-500"
                            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1, repeat: Infinity }}
                        />
                    </motion.div>

                    <motion.div
                        className={`absolute left-2 right-2 p-2.5 rounded-lg border flex items-center gap-3 z-10 ${
                            theme === 'dark'
                                ? 'bg-zinc-900/60 border-zinc-800/60'
                                : 'bg-white/80 border-zinc-200'
                        }`}
                        animate={{ top: [52, 8, 8, 52] }}
                        transition={{ duration: 3, repeat: Infinity, repeatDelay: 1.5, ease: "easeInOut" }}
                    >
                        <GripVertical size={14} className={theme === 'dark' ? 'text-zinc-600' : 'text-zinc-400'} />
                        <div className={`w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold ${
                            theme === 'dark'
                                ? 'bg-zinc-800 text-zinc-500'
                                : 'bg-zinc-100 text-zinc-500'
                        }`}>2</div>
                        <div className="flex-1 space-y-1">
                            <div className={`h-1.5 w-24 rounded-full ${theme === 'dark' ? 'bg-zinc-800' : 'bg-zinc-200'}`} />
                            <div className={`h-1 w-16 rounded-full ${theme === 'dark' ? 'bg-zinc-800/60' : 'bg-zinc-100'}`} />
                        </div>
                    </motion.div>

                    <div className={`absolute left-2 right-2 top-[96px] p-2.5 rounded-lg border flex items-center gap-3 opacity-40 ${
                        theme === 'dark'
                            ? 'bg-zinc-900/30 border-zinc-800/30'
                            : 'bg-white/60 border-zinc-200/50'
                    }`}>
                        <GripVertical size={14} className={theme === 'dark' ? 'text-zinc-700' : 'text-zinc-400'} />
                        <div className={`w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold ${
                            theme === 'dark'
                                ? 'bg-zinc-800/60 text-zinc-600'
                                : 'bg-zinc-100 text-zinc-400'
                        }`}>3</div>
                        <div className="flex-1 space-y-1">
                            <div className={`h-1.5 w-16 rounded-full ${theme === 'dark' ? 'bg-zinc-800/50' : 'bg-zinc-200/60'}`} />
                            <div className={`h-1 w-10 rounded-full ${theme === 'dark' ? 'bg-zinc-800/30' : 'bg-zinc-100/60'}`} />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default FeaturesGrid;
