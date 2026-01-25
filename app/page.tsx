'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import { ArrowRight, LayoutGrid, Kanban, Zap, Layers, Search, Command, BarChart3, ArrowUpRight, Check, Sparkles, MousePointer2, GripVertical, MoreHorizontal, Cpu, Fingerprint } from 'lucide-react';
import { useSession, signIn } from 'next-auth/react';
import { redirect } from 'next/navigation';

const LandingPage: React.FC = () => {
  const { data: session } = useSession();

  if (session) {
    redirect('/dashboard');
  }

  const handleLogin = () => {
    signIn('google', { callbackUrl: '/dashboard' });
  };

  const { scrollY } = useScroll();
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  // Parallax / Tilt Logic for the Preview
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
    <div className="min-h-screen bg-zinc-950 text-zinc-200 selection:bg-indigo-500/30 font-sans overflow-x-hidden perspective-1000">

      {/* Dynamic Background */}
      <div className="fixed inset-0 bg-dot-pattern opacity-20 pointer-events-none" />
      <div className="fixed top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[800px] h-[600px] bg-violet-500/5 blur-[100px] rounded-full pointer-events-none" />

      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 h-16 border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-md z-50 flex items-center justify-between px-6 lg:px-12">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 flex items-center justify-center">
            <img src="/logo.png" alt="LinearFlow Logo" className="h-full w-full object-contain drop-shadow-lg" />
          </div>
          <span className="font-semibold text-zinc-100 tracking-tight">LinearFlow</span>
        </div>
        <div className="flex items-center gap-6">
          <button className="hidden md:block text-xs font-medium text-zinc-400 hover:text-zinc-200 transition-colors">Changelog</button>
          <button className="hidden md:block text-xs font-medium text-zinc-400 hover:text-zinc-200 transition-colors">Pricing</button>
          <button
            onClick={handleLogin}
            className="group flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-100 text-zinc-950 text-xs font-medium hover:bg-white transition-all shadow-[0_0_20px_-10px_rgba(255,255,255,0.5)]"
          >
            Log In <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </nav>

      <main className="pt-40 pb-20 px-6 lg:px-12 max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">

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
          The issue tracking aesthetic, applied to your career. <br className="hidden md:block" />
          Manage applications, track interviews, and analyze offers.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-4 mb-24"
        >
          <button
            onClick={handleLogin}
            className="group relative h-12 px-8 rounded-full bg-zinc-100 hover:bg-white text-zinc-950 font-medium transition-all shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] overflow-hidden"
          >
            <div className="relative z-10 flex items-center gap-2">
              Start Tracking
            </div>
          </button>
          <div className="h-8 w-px bg-zinc-800 hidden md:block" />
          <div className="hidden md:flex items-center gap-4 text-sm text-zinc-500">
            <span className="flex items-center gap-1.5"><Check size={14} className="text-indigo-400" /> Free for individuals</span>
            <span className="flex items-center gap-1.5"><Check size={14} className="text-indigo-400" /> No credit card</span>
          </div>
        </motion.div>

        {/* 3D Interface Preview */}
        <div className="w-full max-w-6xl mx-auto relative perspective-1000 mb-40" style={{ perspective: '1200px' }}>
          <motion.div
            style={{ y: y2 }}
            className="absolute inset-0 bg-gradient-to-t from-indigo-500/20 via-violet-500/10 to-transparent blur-3xl -z-10 rounded-full opacity-60"
          />

          <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            initial={{ rotateX: 20, opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative rounded-xl border border-zinc-800 bg-zinc-950/90 backdrop-blur-xl shadow-2xl overflow-hidden group cursor-default"
          >
            {/* Window Controls */}
            <div className="h-10 border-b border-zinc-800/50 bg-zinc-900/50 flex items-center px-4 justify-between select-none">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-zinc-700/50 group-hover:bg-red-500/20 transition-colors duration-300" />
                <div className="w-3 h-3 rounded-full bg-zinc-700/50 group-hover:bg-amber-500/20 transition-colors duration-300" />
                <div className="w-3 h-3 rounded-full bg-zinc-700/50 group-hover:bg-emerald-500/20 transition-colors duration-300" />
              </div>
              <div className="text-[10px] text-zinc-600 font-mono opacity-50 group-hover:opacity-100 transition-opacity">linearflow.app</div>
              <div className="w-10" />
            </div>

            {/* Mock UI Content */}
            <div className="p-8 grid grid-cols-1 md:grid-cols-4 gap-8 min-h-[500px] text-left">
              <div className="hidden md:flex flex-col gap-4 border-r border-zinc-800/50 pr-6">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5, type: 'spring' }} className="h-8 w-8 rounded bg-gradient-to-br from-indigo-500 to-violet-600 mb-6 shadow-glow" />
                {[1, 2, 3, 4].map(i => (
                  <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + (i * 0.1) }} className="h-4 w-full rounded bg-zinc-900 overflow-hidden relative">
                    <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-800 to-transparent" animate={{ x: ['-100%', '100%'] }} transition={{ repeat: Infinity, duration: 2, delay: i * 0.5, ease: "linear" }} />
                  </motion.div>
                ))}
              </div>

              <div className="md:col-span-3 grid grid-cols-3 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4"><div className="h-4 w-16 bg-zinc-800 rounded" /><div className="h-4 w-6 bg-zinc-800 rounded" /></div>
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="p-4 rounded-lg border border-zinc-800 bg-zinc-900/50 space-y-3 relative overflow-hidden">
                    <div className="flex items-center gap-3"><div className="h-8 w-8 rounded bg-zinc-800" /><div className="space-y-1"><div className="h-3 w-24 bg-zinc-800 rounded" /><div className="h-2 w-16 bg-zinc-800/50 rounded" /></div></div>
                    <div className="h-2 w-full bg-zinc-800/30 rounded" />
                    <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12" animate={{ x: ['-100%', '200%'] }} transition={{ repeat: Infinity, duration: 3, delay: 0, ease: "easeInOut" }} />
                  </motion.div>
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="p-4 rounded-lg border border-zinc-800 bg-zinc-900/50 space-y-3 opacity-60"><div className="flex items-center gap-3"><div className="h-8 w-8 rounded bg-zinc-800" /><div className="space-y-1"><div className="h-3 w-20 bg-zinc-800 rounded" /><div className="h-2 w-12 bg-zinc-800/50 rounded" /></div></div></motion.div>
                </div>

                <div className="space-y-4 mt-12">
                  <div className="flex items-center justify-between mb-4"><div className="h-4 w-20 bg-zinc-800 rounded" /><div className="h-4 w-6 bg-zinc-800 rounded" /></div>
                  <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: [0, -8, 0], opacity: 1, boxShadow: ["0 4px 6px -1px rgba(0, 0, 0, 0.1)", "0 20px 30px -5px rgba(99, 102, 241, 0.15)", "0 4px 6px -1px rgba(0, 0, 0, 0.1)"] }} transition={{ y: { repeat: Infinity, duration: 5, ease: "easeInOut" }, boxShadow: { repeat: Infinity, duration: 5, ease: "easeInOut" }, opacity: { duration: 0.5, delay: 1 } }} className="p-4 rounded-lg border border-indigo-500/40 bg-zinc-900/90 backdrop-blur-sm space-y-3 relative overflow-hidden z-20" style={{ transformStyle: 'preserve-3d', translateZ: '20px' }}>
                    <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
                    <div className="flex items-center gap-3"><div className="h-8 w-8 rounded bg-zinc-800 border border-zinc-700" /><div className="space-y-1"><div className="h-3 w-28 bg-zinc-800 rounded" /><div className="h-2 w-20 bg-zinc-800/50 rounded" /></div></div>
                    <div className="flex gap-2 mt-2"><div className="h-5 w-12 rounded bg-indigo-500/10 border border-indigo-500/20" /><div className="h-5 w-12 rounded bg-zinc-800 border border-zinc-700" /></div>
                    <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 to-transparent pointer-events-none" />
                  </motion.div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4"><div className="h-4 w-16 bg-zinc-800 rounded" /><div className="h-4 w-6 bg-zinc-800 rounded" /></div>
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.2 }} className="p-4 rounded-lg border border-emerald-500/30 bg-emerald-500/5 space-y-3 relative overflow-hidden">
                    <div className="flex items-center gap-3"><div className="h-8 w-8 rounded bg-zinc-800" /><div className="space-y-1"><div className="h-3 w-24 bg-zinc-800 rounded" /><div className="h-2 w-12 bg-zinc-800/50 rounded" /></div></div>
                    <div className="h-2 w-1/2 bg-emerald-500/20 rounded" />
                    <motion.div animate={{ opacity: [0, 0.4, 0] }} transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1 }} className="absolute inset-0 bg-emerald-500/10" />
                  </motion.div>
                </div>
              </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none" />
          </motion.div>
        </div>


        {/* REFINED ASYMMETRICAL BENTO GRID */}
        <section className="w-full max-w-7xl mx-auto px-6 mb-32 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-5 auto-rows-fr">

            {/* CARD 1: Kanban Workflow (Wide - 4 Cols) */}
            <motion.div
              whileHover="hover"
              initial="initial"
              className="md:col-span-4 h-[440px] rounded-[32px] border border-zinc-800/60 bg-gradient-to-b from-zinc-900/50 to-zinc-950/80 backdrop-blur-2xl overflow-hidden group shadow-[0_8px_32px_-12px_rgba(0,0,0,0.5)] hover:border-zinc-700/80 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-noise opacity-[0.03]" />
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="flex h-full">
                {/* Text Content */}
                <div className="w-2/5 p-10 flex flex-col relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-800/50 border border-zinc-700/50 flex items-center justify-center mb-6 text-indigo-400 group-hover:scale-105 group-hover:bg-indigo-500/10 group-hover:border-indigo-500/20 transition-all duration-300 shadow-inner">
                    <Kanban size={22} />
                  </div>
                  <h3 className="text-2xl font-semibold text-zinc-100 mb-3 tracking-tight">Precision Workflow</h3>
                  <p className="text-zinc-500 leading-relaxed text-sm">
                    Visualize your pipeline. Drag and drop with fluid 60fps animations. Never lose context of your applications.
                  </p>
                  <div className="mt-auto flex items-center gap-2 text-indigo-400 text-xs font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    Try Board View <ArrowRight size={12} />
                  </div>
                </div>

                {/* Visual Animation */}
                <div className="w-3/5 relative overflow-hidden mask-gradient-l">
                  <motion.div
                    variants={{
                      initial: { rotate: 6, x: 40, y: 60 },
                      hover: { rotate: 0, x: 10, y: 30 }
                    }}
                    transition={{ type: "spring", stiffness: 100, damping: 24 }}
                    className="absolute top-10 right-10 w-[320px] h-[400px] bg-zinc-900 rounded-t-xl border-l border-t border-zinc-700/50 shadow-2xl p-5 flex flex-col gap-4"
                  >
                    <div className="flex items-center justify-between px-2 mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                        <span className="text-xs font-medium text-zinc-300">Interview</span>
                      </div>
                      <span className="px-1.5 py-0.5 rounded bg-zinc-800 text-[10px] text-zinc-500 font-mono">5</span>
                    </div>

                    <motion.div
                      className="p-4 bg-zinc-950 rounded-xl border border-zinc-800 flex gap-4 items-center shadow-lg relative z-20"
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-[0_4px_12px_rgba(79,70,229,0.3)]">
                        <Layers size={16} />
                      </div>
                      <div className="space-y-2 flex-1">
                        <div className="h-2.5 w-20 bg-zinc-800 rounded-full" />
                        <div className="h-1.5 w-12 bg-zinc-800/50 rounded-full" />
                      </div>
                      <div className="px-2 py-1 rounded bg-indigo-500/10 text-[10px] text-indigo-400 border border-indigo-500/20">Active</div>
                    </motion.div>

                    <div className="p-4 bg-zinc-800/20 rounded-xl border border-zinc-800/40 flex gap-4 items-center grayscale opacity-60">
                      <div className="w-9 h-9 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-500">A</div>
                      <div className="space-y-2 flex-1">
                        <div className="h-2.5 w-24 bg-zinc-800 rounded-full" />
                        <div className="h-1.5 w-16 bg-zinc-800/50 rounded-full" />
                      </div>
                    </div>

                    <div className="p-4 bg-zinc-800/20 rounded-xl border border-zinc-800/40 flex gap-4 items-center grayscale opacity-40">
                      <div className="w-9 h-9 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-500">B</div>
                      <div className="space-y-2 flex-1">
                        <div className="h-2.5 w-16 bg-zinc-800 rounded-full" />
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* CARD 2: Metrics (Narrow - 2 Cols) */}
            <motion.div
              whileHover="hover"
              initial="initial"
              className="md:col-span-2 h-[440px] rounded-[32px] border border-zinc-800/60 bg-gradient-to-b from-zinc-900/50 to-zinc-950/80 backdrop-blur-2xl overflow-hidden group shadow-[0_8px_32px_-12px_rgba(0,0,0,0.5)] hover:border-zinc-700/80 transition-all duration-500 flex flex-col"
            >
              <div className="absolute inset-0 bg-noise opacity-[0.03]" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="p-8 pb-4 flex-shrink-0 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-zinc-800/50 border border-zinc-700/50 flex items-center justify-center mb-6 text-emerald-400 group-hover:scale-105 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/20 transition-all duration-300 shadow-inner">
                  <BarChart3 size={22} />
                </div>
                <h3 className="text-2xl font-semibold text-zinc-100 mb-2 tracking-tight">Real-time Insights</h3>
                <p className="text-zinc-500 leading-relaxed text-sm">
                  Analyze velocity & optimize strategy.
                </p>
              </div>

              <div className="mt-auto flex-1 w-full relative px-8 pb-8 min-h-[180px]">
                {/* Scanning Laser Effect */}
                <motion.div
                  className="absolute top-0 bottom-8 w-[2px] bg-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.8)] z-30"
                  animate={{ left: ['0%', '100%'], opacity: [0, 1, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                />

                <div className="absolute inset-x-0 bottom-0 top-0 flex items-end justify-between px-8 pb-8 gap-2">
                  {[35, 60, 45, 80, 55, 90, 70].map((h, i) => (
                    <motion.div
                      key={i}
                      className="w-full bg-zinc-800/30 rounded-t-sm relative group/bar border-t border-x border-zinc-700/30 overflow-hidden"
                      initial={{ height: "10%" }}
                      whileInView={{ height: `${h}%` }}
                      transition={{ delay: i * 0.05, duration: 0.8, type: "spring", bounce: 0 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/20 to-transparent opacity-0 group-hover/bar:opacity-100 transition-opacity duration-300" />
                      <motion.div
                        className="absolute top-0 inset-x-0 h-[1px] bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* CARD 3: Keyboard First (Half - 3 Cols) */}
            <motion.div
              whileHover="hover"
              initial="initial"
              className="md:col-span-3 h-[380px] rounded-[32px] border border-zinc-800/60 bg-gradient-to-b from-zinc-900/50 to-zinc-950/80 backdrop-blur-2xl overflow-hidden group shadow-[0_8px_32px_-12px_rgba(0,0,0,0.5)] hover:border-zinc-700/80 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-noise opacity-[0.03]" />
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="flex flex-col h-full items-center text-center p-8">
                <div className="relative z-10 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-800/50 border border-zinc-700/50 flex items-center justify-center mx-auto mb-4 text-amber-400 group-hover:scale-105 group-hover:bg-amber-500/10 group-hover:border-amber-500/20 transition-all duration-300 shadow-inner">
                    <Command size={22} />
                  </div>
                  <h3 className="text-2xl font-semibold text-zinc-100 mb-2 tracking-tight">Keyboard First</h3>
                  <p className="text-zinc-500 leading-relaxed text-sm max-w-xs mx-auto">
                    Navigate, search, and manage without touching your mouse.
                  </p>
                </div>

                {/* Interactive Command Palette Visual */}
                <div className="relative w-full max-w-sm mx-auto">
                  <motion.div
                    variants={{
                      initial: { y: 20, scale: 0.95, opacity: 0.8 },
                      hover: { y: 0, scale: 1, opacity: 1 }
                    }}
                    transition={{ duration: 0.3 }}
                    className="bg-zinc-950/90 rounded-xl border border-zinc-700/50 shadow-2xl overflow-hidden ring-1 ring-white/5 text-left"
                  >
                    <div className="p-3 border-b border-zinc-800 flex items-center gap-3 bg-zinc-900/50">
                      <Search size={14} className="text-zinc-500" />
                      <Typewriter text="Create new issue..." />
                    </div>
                    <div className="p-1.5 space-y-0.5">
                      <motion.div
                        className="flex items-center justify-between px-3 py-2 rounded-lg bg-amber-500/10 text-amber-200 border border-amber-500/20"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <div className="flex items-center gap-2 text-xs font-medium">
                          <Sparkles size={12} />
                          Create Issue
                        </div>
                        <span className="opacity-70 font-sans text-[10px] border border-amber-500/30 px-1 rounded">↵</span>
                      </motion.div>
                      <div className="flex items-center gap-2 px-3 py-2 text-zinc-600 text-xs">
                        <div className="w-3" />
                        Search Jobs
                      </div>
                    </div>
                  </motion.div>
                  {/* Shortcuts Hints */}
                  <div className="flex justify-center gap-3 mt-6">
                    <kbd className="px-2 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-500">⌘ K</kbd>
                    <kbd className="px-2 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-500">/</kbd>
                    <kbd className="px-2 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-500">Esc</kbd>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CARD 4: Fluid Interactions (Half - 3 Cols) */}
            <motion.div
              whileHover="hover"
              initial="initial"
              className="md:col-span-3 h-[380px] rounded-[32px] border border-zinc-800/60 bg-gradient-to-b from-zinc-900/50 to-zinc-950/80 backdrop-blur-2xl overflow-hidden group shadow-[0_8px_32px_-12px_rgba(0,0,0,0.5)] hover:border-zinc-700/80 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-noise opacity-[0.03]" />
              <div className="absolute inset-0 bg-gradient-to-tl from-pink-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="flex flex-col h-full items-center text-center p-8">
                <div className="relative z-10 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-800/50 border border-zinc-700/50 flex items-center justify-center mx-auto mb-4 text-pink-400 group-hover:scale-105 group-hover:bg-pink-500/10 group-hover:border-pink-500/20 transition-all duration-300 shadow-inner">
                    <Fingerprint size={22} />
                  </div>
                  <h3 className="text-2xl font-semibold text-zinc-100 mb-2 tracking-tight">Fluid Interactions</h3>
                  <p className="text-zinc-500 leading-relaxed text-sm max-w-xs mx-auto">
                    Satisfying physics-based animations that feel natural and responsive.
                  </p>
                </div>

                {/* Draggable List Simulation */}
                <div className="relative w-full max-w-sm mx-auto space-y-3">
                  <motion.div
                    className="h-14 w-full rounded-xl bg-zinc-900 border border-zinc-800 p-3 flex items-center gap-4 relative z-20 shadow-xl cursor-grab"
                    animate={{
                      y: [0, 68, 68, 0],
                      scale: [1, 1.02, 1.02, 1],
                      borderColor: ["#27272a", "#ec4899", "#ec4899", "#27272a"],
                      boxShadow: ["0 0 0 rgba(0,0,0,0)", "0 10px 20px -5px rgba(236,72,153,0.15)", "0 10px 20px -5px rgba(236,72,153,0.15)", "0 0 0 rgba(0,0,0,0)"]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
                  >
                    <div className="text-zinc-600"><GripVertical size={18} /></div>
                    <div className="h-8 w-8 rounded-lg bg-pink-500/10 text-pink-500 flex items-center justify-center font-bold text-[10px] border border-pink-500/20">1</div>
                    <div className="flex-1 space-y-1.5">
                      <div className="h-2 w-24 bg-zinc-800 rounded-full" />
                      <div className="h-1.5 w-16 bg-zinc-800/50 rounded-full" />
                    </div>
                  </motion.div>

                  <motion.div
                    className="h-14 w-full rounded-xl bg-zinc-900/50 border border-zinc-800/50 p-3 flex items-center gap-4 relative z-10"
                    animate={{ y: [0, -68, -68, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
                  >
                    <div className="text-zinc-700"><GripVertical size={18} /></div>
                    <div className="h-8 w-8 rounded-lg bg-zinc-800 text-zinc-500 flex items-center justify-center font-bold text-[10px]">2</div>
                    <div className="flex-1 space-y-1.5">
                      <div className="h-2 w-32 bg-zinc-800/80 rounded-full" />
                      <div className="h-1.5 w-20 bg-zinc-800/40 rounded-full" />
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

          </div>
        </section>

        {/* Features List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left w-full max-w-5xl mb-20 relative z-20">
          {[
            { title: 'Privacy Focused', desc: 'Your data stays local. No tracking, no sharing.' },
            { title: 'Instant Search', desc: 'Find any application in milliseconds.' },
            { title: 'Export Ready', desc: 'Download your data as CSV or JSON anytime.' },
          ].map((feature, i) => (
            <div key={i} className="group space-y-3">
              <div className="h-px w-8 bg-zinc-700 group-hover:w-16 group-hover:bg-indigo-500 transition-all duration-500" />
              <h4 className="text-zinc-100 font-medium">{feature.title}</h4>
              <p className="text-zinc-500 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-zinc-950 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
            <Layers size={16} />
            <span className="text-sm font-medium">LinearFlow</span>
          </div>
          <div className="text-zinc-600 text-sm">
            © 2024 LinearFlow Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

// Helper component for typewriter effect
const Typewriter = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText(prev => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(timer);
        setTimeout(() => {
          setDisplayText('');
          i = 0; // Reset conceptually, but interval needs restart in a real loop
        }, 2000);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [text]);

  return (
    <span className="text-zinc-500 text-xs font-medium flex items-center">
      {displayText}
      <span className="w-0.5 h-3 bg-indigo-500 ml-0.5 animate-pulse" />
    </span>
  );
};

export default LandingPage;
