'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, LayoutGrid, Kanban, Zap, Layers, Search, Command, BarChart3, ArrowUpRight } from 'lucide-react';
import { signIn, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function Home() {
  const { data: session } = useSession();

  if (session) {
    redirect('/dashboard');
  }

  const handleLogin = () => {
    signIn('google', { callbackUrl: '/dashboard' });
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200 selection:bg-indigo-500/30 font-sans overflow-x-hidden relative">
      {/* Background Effects */}
      <div
        className="fixed inset-0 opacity-20 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.15) 1px, transparent 0)', backgroundSize: '24px 24px' }}
      />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-500/20 blur-[120px] rounded-full pointer-events-none opacity-50" />

      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 h-16 border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-md z-50 flex items-center justify-between px-6 lg:px-12">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-glow">
            <Layers size={18} className="text-white" />
          </div>
          <span className="font-semibold text-zinc-100 tracking-tight">LinearFlow</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={handleLogin}
            className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            Log in
          </button>
          <button
            onClick={handleLogin}
            className="px-4 py-2 rounded-full bg-zinc-100 text-zinc-950 text-xs font-medium hover:bg-white transition-colors shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)]"
          >
            Get Started
          </button>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-6 lg:px-12 max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">

        {/* Hero Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 text-xs text-zinc-400 backdrop-blur-sm hover:border-zinc-700 transition-colors cursor-default"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          v2.0 is now live
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-zinc-100 to-zinc-500 mb-6 max-w-4xl"
        >
          The new standard for <br className="hidden md:block" /> job tracking.
        </motion.h1>

        {/* Hero Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-zinc-500 max-w-2xl mb-10 leading-relaxed"
        >
          Manage your applications with the precision of an engineering team.
          LinearFlow brings issue-tracking aesthetics to your career growth.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-4"
        >
          <button
            onClick={handleLogin}
            className="group relative px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-all shadow-lg shadow-indigo-900/20 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Start Tracking <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-violet-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </button>
          <button className="px-6 py-3 rounded-lg border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 hover:text-zinc-200 text-zinc-400 font-medium transition-colors backdrop-blur-sm">
            View Documentation
          </button>
        </motion.div>

        {/* BENTO GRID */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-24 w-full grid grid-cols-1 md:grid-cols-6 lg:grid-rows-2 gap-4 max-w-6xl mx-auto h-[800px] md:h-[500px]"
        >
          {/* CARD 1: Kanban Workflow (Large - 4 cols) */}
          <motion.div
            whileHover="hover"
            className="md:col-span-4 row-span-1 rounded-3xl border border-zinc-800/50 bg-zinc-900/20 backdrop-blur-md p-8 flex flex-col justify-between relative overflow-hidden group hover:border-zinc-700/80 transition-all duration-500 shadow-inner-light"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Content */}
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

            {/* Animation Container */}
            <div className="absolute bottom-0 right-0 w-[400px] h-[200px] mask-gradient-b">
              {/* Fake Columns */}
              <div className="flex gap-4 h-full px-4 items-end transform translate-y-4">
                {/* Column 1 */}
                <div className="w-1/3 h-[90%] bg-zinc-800/20 rounded-t-xl border-x border-t border-zinc-800/30 p-3 space-y-3">
                  <div className="h-2 w-16 bg-zinc-800 rounded-full" />
                  {/* Static Cards */}
                  <div className="h-16 w-full rounded-lg bg-zinc-900/50 border border-zinc-800/50" />
                  <div className="h-16 w-full rounded-lg bg-zinc-900/50 border border-zinc-800/50" />
                </div>
                {/* Column 2 */}
                <div className="w-1/3 h-[110%] bg-zinc-800/20 rounded-t-xl border-x border-t border-zinc-800/30 p-3 space-y-3">
                  <div className="h-2 w-20 bg-zinc-800 rounded-full" />
                  <div className="h-16 w-full rounded-lg bg-zinc-900/50 border border-zinc-800/50 opacity-50" />

                  {/* Moving Card */}
                  <motion.div
                    variants={{
                      hover: { x: "100%", y: -20, rotate: 3, scale: 1.05, opacity: 0.8 }
                    }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="h-16 w-full rounded-lg bg-indigo-500/10 border border-indigo-500/30 relative flex items-center justify-center"
                  >
                    <div className="h-2 w-12 bg-indigo-500/30 rounded-full absolute top-3 left-3" />
                  </motion.div>
                </div>
                {/* Column 3 */}
                <div className="w-1/3 h-[95%] bg-zinc-800/20 rounded-t-xl border-x border-t border-zinc-800/30 p-3 space-y-3">
                  <div className="h-2 w-12 bg-zinc-800 rounded-full" />
                  {/* Target area */}
                  <motion.div
                    variants={{
                      hover: { backgroundColor: "rgba(99, 102, 241, 0.1)", borderColor: "rgba(99, 102, 241, 0.3)" }
                    }}
                    className="h-24 w-full rounded-lg border-2 border-dashed border-zinc-800 transition-colors"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* CARD 2: Metrics (Tall - 2 cols) */}
          <motion.div
            whileHover="hover"
            className="md:col-span-2 md:row-span-2 rounded-3xl border border-zinc-800/50 bg-zinc-900/20 backdrop-blur-md p-8 flex flex-col relative overflow-hidden group hover:border-zinc-700/80 transition-all duration-500 shadow-inner-light"
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

            {/* Animated Bars */}
            <div className="flex-1 flex items-end justify-between gap-2 px-2 pb-2">
              {[30, 45, 25, 60, 40, 75, 50].map((height, i) => (
                <div key={i} className="w-full flex flex-col justify-end gap-2 group-hover:gap-3 transition-all duration-500 h-64">
                  {/* Floating Label */}
                  <motion.div
                    variants={{
                      hover: { opacity: 1, y: 0 }
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    className="text-[10px] text-zinc-400 text-center"
                  >
                    {height * 1.5}
                  </motion.div>

                  {/* Bar */}
                  <motion.div
                    className={`w-full rounded-t-sm ${i === 5 ? 'bg-indigo-500' : 'bg-zinc-800'}`}
                    initial={{ height: `${height}%` }}
                    variants={{
                      hover: { height: `${height * 1.3}%` }
                    }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                  />
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-zinc-800/50 flex items-center justify-between text-xs text-zinc-500">
              <span>Weekly Growth</span>
              <span className="flex items-center gap-1 text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">
                <ArrowUpRight size={12} /> +24%
              </span>
            </div>
          </motion.div>

          {/* CARD 3: Keyboard (Large - 4 cols) */}
          <motion.div
            whileHover="hover"
            className="md:col-span-4 row-span-1 rounded-3xl border border-zinc-800/50 bg-zinc-900/20 backdrop-blur-md p-8 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group hover:border-zinc-700/80 transition-all duration-500 shadow-inner-light"
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

            {/* Interactive Command Palette Visual */}
            <div className="relative w-full max-w-sm">
              <motion.div
                className="rounded-xl border border-zinc-800 bg-zinc-950 shadow-2xl overflow-hidden"
                variants={{
                  hover: { y: -5, boxShadow: "0 20px 40px -10px rgba(0,0,0,0.5)" }
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Search Input */}
                <div className="flex items-center gap-3 px-4 py-3 border-b border-zinc-800">
                  <Search size={14} className="text-zinc-500" />
                  <div className="h-4 w-1 bg-indigo-500 animate-pulse" />
                  <span className="text-sm text-zinc-400">Search applications...</span>
                </div>

                {/* Results */}
                <div className="p-2 space-y-1">
                  {['Create new application', 'Go to Dashboard', 'Filter by Offer'].map((item, i) => (
                    <motion.div
                      key={i}
                      variants={{
                        hover: {
                          backgroundColor: i === 0 ? "rgba(39, 39, 42, 1)" : "transparent",
                          x: i === 0 ? 4 : 0
                        }
                      }}
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

              {/* Glow effect behind */}
              <div className="absolute -inset-4 bg-indigo-500/20 blur-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-full" />
            </div>
          </motion.div>
        </motion.div>

        {/* Features List */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-12 text-left w-full max-w-5xl">
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
