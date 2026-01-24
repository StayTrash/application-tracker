'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { ArrowRight, LayoutGrid, Kanban, Zap, Layers, Search, Command, BarChart3, ArrowUpRight, Check } from 'lucide-react';
import { useSession, signIn } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function Home() {
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
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-glow">
            <Layers size={18} className="text-white" />
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

        {/* Hero Title - Metallic Gradient */}
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

        {/* 3D Interface Preview with Micro-interactions */}
        <div className="w-full max-w-6xl mx-auto relative perspective-1000" style={{ perspective: '1200px' }}>
          {/* Ambient Glow Behind App */}
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

              {/* Sidebar Mock */}
              <div className="hidden md:flex flex-col gap-4 border-r border-zinc-800/50 pr-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: 'spring' }}
                  className="h-8 w-8 rounded bg-gradient-to-br from-indigo-500 to-violet-600 mb-6 shadow-glow"
                />
                {[1, 2, 3, 4].map(i => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + (i * 0.1) }}
                    className="h-4 w-full rounded bg-zinc-900 overflow-hidden relative"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-800 to-transparent"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ repeat: Infinity, duration: 2, delay: i * 0.5, ease: "linear" }}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Main Board Mock */}
              <div className="md:col-span-3 grid grid-cols-3 gap-6">
                {/* Column 1 */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-4 w-16 bg-zinc-800 rounded" />
                    <div className="h-4 w-6 bg-zinc-800 rounded" />
                  </div>
                  {/* Card 1 */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="p-4 rounded-lg border border-zinc-800 bg-zinc-900/50 space-y-3 relative overflow-hidden"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded bg-zinc-800" />
                      <div className="space-y-1">
                        <div className="h-3 w-24 bg-zinc-800 rounded" />
                        <div className="h-2 w-16 bg-zinc-800/50 rounded" />
                      </div>
                    </div>
                    <div className="h-2 w-full bg-zinc-800/30 rounded" />
                    {/* Shimmer */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12"
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ repeat: Infinity, duration: 3, delay: 0, ease: "easeInOut" }}
                    />
                  </motion.div>
                  {/* Card 2 */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="p-4 rounded-lg border border-zinc-800 bg-zinc-900/50 space-y-3 opacity-60"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded bg-zinc-800" />
                      <div className="space-y-1">
                        <div className="h-3 w-20 bg-zinc-800 rounded" />
                        <div className="h-2 w-12 bg-zinc-800/50 rounded" />
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Column 2 - Active */}
                <div className="space-y-4 mt-12">
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-4 w-20 bg-zinc-800 rounded" />
                    <div className="h-4 w-6 bg-zinc-800 rounded" />
                  </div>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{
                      y: [0, -8, 0],
                      opacity: 1,
                      boxShadow: [
                        "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                        "0 20px 30px -5px rgba(99, 102, 241, 0.15)", // Indigo glow
                        "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                      ]
                    }}
                    transition={{
                      y: {
                        repeat: Infinity,
                        duration: 5,
                        ease: "easeInOut"
                      },
                      boxShadow: {
                        repeat: Infinity,
                        duration: 5,
                        ease: "easeInOut"
                      },
                      opacity: { duration: 0.5, delay: 1 }
                    }}
                    className="p-4 rounded-lg border border-indigo-500/40 bg-zinc-900/90 backdrop-blur-sm space-y-3 relative overflow-hidden z-20"
                    style={{ transformStyle: 'preserve-3d', translateZ: '20px' }}
                  >
                    <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded bg-zinc-800 border border-zinc-700" />
                      <div className="space-y-1">
                        <div className="h-3 w-28 bg-zinc-800 rounded" />
                        <div className="h-2 w-20 bg-zinc-800/50 rounded" />
                      </div>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <div className="h-5 w-12 rounded bg-indigo-500/10 border border-indigo-500/20" />
                      <div className="h-5 w-12 rounded bg-zinc-800 border border-zinc-700" />
                    </div>
                    {/* Shine */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 to-transparent pointer-events-none" />
                  </motion.div>
                </div>

                {/* Column 3 */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-4 w-16 bg-zinc-800 rounded" />
                    <div className="h-4 w-6 bg-zinc-800 rounded" />
                  </div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2 }}
                    className="p-4 rounded-lg border border-emerald-500/30 bg-emerald-500/5 space-y-3 relative overflow-hidden"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded bg-zinc-800" />
                      <div className="space-y-1">
                        <div className="h-3 w-24 bg-zinc-800 rounded" />
                        <div className="h-2 w-12 bg-zinc-800/50 rounded" />
                      </div>
                    </div>
                    <div className="h-2 w-1/2 bg-emerald-500/20 rounded" />

                    {/* Pulse Effect */}
                    <motion.div
                      animate={{ opacity: [0, 0.4, 0] }}
                      transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1 }}
                      className="absolute inset-0 bg-emerald-500/10"
                    />
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Fade at bottom of mock UI */}
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none" />
          </motion.div>
        </div>


        {/* BENTO GRID (Existing Features) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-32 w-full grid grid-cols-1 md:grid-cols-6 lg:grid-rows-2 gap-4 max-w-6xl mx-auto h-[800px] md:h-[500px]"
        >
          {/* ... Rest of Bento Grid (Unchanged in logic, just styling match) ... */}
          {/* CARD 1: Kanban Workflow */}
          <motion.div
            whileHover="hover"
            className="md:col-span-4 row-span-1 rounded-3xl border border-zinc-800/50 bg-zinc-900/20 backdrop-blur-md p-8 flex flex-col justify-between relative overflow-hidden group hover:border-zinc-700/80 transition-all duration-500 shadow-inner-light text-left"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="z-10 text-left">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 rounded-lg bg-zinc-800/50 border border-zinc-700/50 text-indigo-400">
                  <Kanban size={20} />
                </div>
                <h3 className="text-xl font-medium text-zinc-200">Kanban Workflow</h3>
              </div>
              <p className="text-zinc-500 text-sm leading-relaxed max-w-sm">
                Visualize your job search pipeline. Drag, drop, and track applications from "Applied" to "Offer" with fluid animations.
              </p>
            </div>
            {/* Visual */}
            <div className="absolute bottom-0 right-0 w-[400px] h-[200px] mask-gradient-b">
              <div className="flex gap-4 h-full px-4 items-end transform translate-y-4">
                <div className="w-1/3 h-[90%] bg-zinc-800/20 rounded-t-xl border-x border-t border-zinc-800/30 p-3 space-y-3">
                  <div className="h-2 w-16 bg-zinc-800 rounded-full" />
                  <div className="h-16 w-full rounded-lg bg-zinc-900/50 border border-zinc-800/50" />
                  <div className="h-16 w-full rounded-lg bg-zinc-900/50 border border-zinc-800/50" />
                </div>
                <div className="w-1/3 h-[110%] bg-zinc-800/20 rounded-t-xl border-x border-t border-zinc-800/30 p-3 space-y-3">
                  <div className="h-2 w-20 bg-zinc-800 rounded-full" />
                  <div className="h-16 w-full rounded-lg bg-zinc-900/50 border border-zinc-800/50 opacity-50" />
                  <motion.div
                    variants={{ hover: { x: "100%", y: -20, rotate: 3, scale: 1.05, opacity: 0.8 } }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="h-16 w-full rounded-lg bg-indigo-500/10 border border-indigo-500/30 relative flex items-center justify-center"
                  >
                    <div className="h-2 w-12 bg-indigo-500/30 rounded-full absolute top-3 left-3" />
                  </motion.div>
                </div>
                <div className="w-1/3 h-[95%] bg-zinc-800/20 rounded-t-xl border-x border-t border-zinc-800/30 p-3 space-y-3">
                  <div className="h-2 w-12 bg-zinc-800 rounded-full" />
                  <motion.div
                    variants={{ hover: { backgroundColor: "rgba(99, 102, 241, 0.1)", borderColor: "rgba(99, 102, 241, 0.3)" } }}
                    className="h-24 w-full rounded-lg border-2 border-dashed border-zinc-800 transition-colors"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* CARD 2: Metrics */}
          <motion.div
            whileHover="hover"
            className="md:col-span-2 md:row-span-2 rounded-3xl border border-zinc-800/50 bg-zinc-900/20 backdrop-blur-md p-8 flex flex-col relative overflow-hidden group hover:border-zinc-700/80 transition-all duration-500 shadow-inner-light text-left"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-800/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="z-10 mb-8 text-left">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 rounded-lg bg-zinc-800/50 border border-zinc-700/50 text-emerald-400">
                  <BarChart3 size={20} />
                </div>
                <h3 className="text-xl font-medium text-zinc-200">Metrics</h3>
              </div>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Track your application velocity and interview rates over time.
              </p>
            </div>
            <div className="flex-1 flex items-end justify-between gap-2 px-2 pb-2">
              {[30, 45, 25, 60, 40, 75, 50].map((height, i) => (
                <div key={i} className="w-full flex flex-col justify-end gap-2 group-hover:gap-3 transition-all duration-500 h-64">
                  <motion.div
                    variants={{ hover: { opacity: 1, y: 0 } }}
                    initial={{ opacity: 0, y: 10 }}
                    className="text-[10px] text-zinc-400 text-center"
                  >
                    {height * 1.5}
                  </motion.div>
                  <motion.div
                    className={`w-full rounded-t-sm ${i === 5 ? 'bg-indigo-500' : 'bg-zinc-800'}`}
                    initial={{ height: `${height}%` }}
                    variants={{ hover: { height: `${height * 1.3}%` } }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                  />
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-zinc-800/50 flex items-center justify-between text-xs text-zinc-500">
              <span>Weekly Growth</span>
              <span className="flex items-center gap-1 text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded"><ArrowUpRight size={12} /> +24%</span>
            </div>
          </motion.div>

          {/* CARD 3: Keyboard */}
          <motion.div
            whileHover="hover"
            className="md:col-span-4 row-span-1 rounded-3xl border border-zinc-800/50 bg-zinc-900/20 backdrop-blur-md p-8 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group hover:border-zinc-700/80 transition-all duration-500 shadow-inner-light text-left"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="z-10 max-w-sm text-left">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 rounded-lg bg-zinc-800/50 border border-zinc-700/50 text-amber-400">
                  <Command size={20} />
                </div>
                <h3 className="text-xl font-medium text-zinc-200">Keyboard First</h3>
              </div>
              <p className="text-zinc-500 text-sm leading-relaxed mb-4">
                Built for speed. Navigate, search, and manage your pipeline without lifting your hands from the keyboard.
              </p>
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 rounded border border-zinc-700 bg-zinc-800/50 text-xs font-mono text-zinc-300 shadow-sm">Cmd</kbd>
                <span className="text-zinc-600 text-xs">+</span>
                <kbd className="px-2 py-1 rounded border border-zinc-700 bg-zinc-800/50 text-xs font-mono text-zinc-300 shadow-sm">K</kbd>
              </div>
            </div>
            <div className="relative w-full max-w-sm">
              <motion.div
                className="rounded-xl border border-zinc-800 bg-zinc-950 shadow-2xl overflow-hidden"
                variants={{ hover: { y: -5, boxShadow: "0 20px 40px -10px rgba(0,0,0,0.5)" } }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-3 px-4 py-3 border-b border-zinc-800">
                  <Search size={14} className="text-zinc-500" />
                  <div className="h-4 w-1 bg-indigo-500 animate-pulse" />
                  <span className="text-sm text-zinc-400">Search applications...</span>
                </div>
                <div className="p-2 space-y-1">
                  {['Create new application', 'Go to Dashboard', 'Filter by Offer'].map((item, i) => (
                    <motion.div
                      key={i}
                      variants={{ hover: { backgroundColor: i === 0 ? "rgba(39, 39, 42, 1)" : "transparent", x: i === 0 ? 4 : 0 } }}
                      className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm ${i === 0 ? 'text-zinc-200' : 'text-zinc-500'}`}
                    >
                      <div className="flex items-center gap-2">
                        {i === 0 ? <Zap size={12} className="text-amber-400" /> : <div className="w-3" />}
                        {item}
                      </div>
                      {i === 0 && <span className="text-[10px] text-zinc-600 font-mono">↵</span>}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              <div className="absolute -inset-4 bg-indigo-500/20 blur-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-full" />
            </div>
          </motion.div>
        </motion.div>

        {/* Features List */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-12 text-left w-full max-w-5xl mb-20">
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
}
