'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, LayoutGrid, Kanban, Zap, Layers } from 'lucide-react';
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
          className="mb-6 inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 text-xs text-zinc-400 backdrop-blur-sm"
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

        {/* Hero Visual / Bento Grid Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-24 w-full grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6"
        >
          {/* Card 1 */}
          <div className="md:col-span-2 rounded-2xl border border-zinc-800/50 bg-zinc-900/20 backdrop-blur-md p-8 flex flex-col overflow-hidden relative group text-left">
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="z-10 flex flex-col h-full">
              <div className="h-10 w-10 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center mb-4">
                <Kanban size={20} className="text-indigo-400" />
              </div>
              <h3 className="text-xl font-medium text-zinc-100 mb-2">Kanban Workflow</h3>
              <p className="text-zinc-500 text-sm leading-relaxed max-w-md">
                Drag and drop applications through pipeline stages. Visualize your progress with a board designed for high-velocity job hunting.
              </p>

              {/* Mock Board UI */}
              <div className="mt-8 flex gap-4 opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500">
                <div className="w-40 h-32 rounded-lg border border-zinc-700 bg-zinc-900/50 p-3 space-y-2">
                  <div className="h-2 w-12 bg-zinc-700 rounded-full" />
                  <div className="h-16 w-full rounded border border-zinc-700 bg-zinc-800/50" />
                </div>
                <div className="w-40 h-32 rounded-lg border border-zinc-700 bg-zinc-900/50 p-3 space-y-2">
                  <div className="h-2 w-16 bg-indigo-500/20 rounded-full" />
                  <div className="h-16 w-full rounded border border-indigo-500/20 bg-indigo-500/10" />
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="md:col-span-1 rounded-2xl border border-zinc-800/50 bg-zinc-900/20 backdrop-blur-md p-8 flex flex-col relative group text-left">
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="h-10 w-10 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center mb-4">
              <LayoutGrid size={20} className="text-emerald-400" />
            </div>
            <h3 className="text-xl font-medium text-zinc-100 mb-2">Real-time Metrics</h3>
            <p className="text-zinc-500 text-sm leading-relaxed mb-6">
              Track offer rates, interview velocity, and salary ranges.
            </p>
            <div className="mt-auto rounded-lg border border-zinc-800 bg-zinc-950 p-4">
              <div className="flex items-end gap-2">
                <div className="w-2 bg-zinc-800 h-8 rounded-t-sm" />
                <div className="w-2 bg-zinc-800 h-12 rounded-t-sm" />
                <div className="w-2 bg-indigo-500 h-16 rounded-t-sm" />
                <div className="w-2 bg-zinc-800 h-10 rounded-t-sm" />
                <div className="w-2 bg-zinc-800 h-14 rounded-t-sm" />
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="md:col-span-3 rounded-2xl border border-zinc-800/50 bg-zinc-900/20 backdrop-blur-md p-8 flex flex-col md:flex-row items-center justify-between gap-8 relative group text-left">
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-800/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="max-w-xl">
              <div className="h-10 w-10 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center mb-4">
                <Zap size={20} className="text-amber-400" />
              </div>
              <h3 className="text-xl font-medium text-zinc-100 mb-2">Keyboard First Design</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Navigate your entire job search without leaving the keyboard. <br />
                Use <kbd className="px-1.5 py-0.5 rounded border border-zinc-700 bg-zinc-800 text-xs font-mono text-zinc-300">Cmd+K</kbd> to search, filter, and manage applications instantly.
              </p>
            </div>
            <div className="flex-1 w-full max-w-sm rounded-lg border border-zinc-800 bg-zinc-950/50 p-4 font-mono text-xs text-zinc-400 shadow-2xl">
              <div className="flex items-center gap-2 mb-3 border-b border-zinc-800 pb-2">
                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/50" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/50" />
              </div>
              <div className="space-y-1">
                <div className="text-zinc-500">// Search for roles</div>
                <div className="flex items-center gap-2">
                  <span className="text-indigo-400">❯</span>
                  <span className="text-zinc-100">Senior Frontend...</span>
                  <span className="w-1.5 h-4 bg-zinc-500 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Features List */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-12 text-left w-full max-w-5xl">
          {[
            { title: 'Privacy Focused', desc: 'Your data stays local. No tracking, no sharing.' },
            { title: 'Instant Search', desc: 'Find any application in milliseconds.' },
            { title: 'Export Ready', desc: 'Download your data as CSV or JSON anytime.' },
          ].map((feature, i) => (
            <div key={i} className="space-y-3">
              <div className="h-px w-8 bg-indigo-500 mb-4" />
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
