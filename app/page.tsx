'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { ArrowRight, Kanban, Search, Command, Check, Sparkles, MousePointer2, GripVertical } from 'lucide-react';
import { useSession, signIn } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Link from 'next/link';

const LandingPage: React.FC = () => {
  const { data: session } = useSession();

  if (session) {
    redirect('/dashboard');
  }

  const handleLogin = () => {
    signIn('google', { callbackUrl: '/dashboard' });
  };

  const handleGuestLogin = () => {
    signIn('credentials', { email: 'guest@linearflow.app', callbackUrl: '/dashboard' });
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
    <div className="min-h-screen bg-zinc-950 text-zinc-200 selection:bg-indigo-500/30 font-sans perspective-1000 overflow-x-hidden">

      {/* Dynamic Background */}
      <div className="fixed inset-0 bg-dot-pattern opacity-20 pointer-events-none" />
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[600px] bg-violet-500/5 blur-[100px] rounded-full" />
      </div>

      {/* Navbar */}
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
                    className={`relative px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                      item.active 
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
                onClick={handleGuestLogin}
                className="hidden sm:block px-4 py-2 text-sm font-medium text-zinc-400 hover:text-zinc-200 transition-colors"
              >
                Demo
              </button>
              
              <motion.button
                onClick={handleLogin}
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

          <button
            onClick={handleGuestLogin}
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

        {/* 3D Interface Preview - New Design */}
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
            <div className="h-11 md:h-12 border-b border-zinc-800/60 bg-gradient-to-r from-zinc-900/80 via-zinc-900/60 to-zinc-900/80 flex items-center px-3 md:px-5 justify-between select-none relative overflow-hidden">
              {/* Subtle shine effect */}
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
                
                {/* Navigation tabs */}
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

              {/* URL Bar */}
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

              {/* User avatar */}
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

            {/* Main Dashboard Content */}
            <div className="p-3 md:p-6 min-h-[320px] md:min-h-[480px] relative overflow-hidden">
              {/* Grid Background Pattern */}
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
                <div className="hidden md:block md:col-span-3 space-y-3 md:space-y-4">
                  {/* Quick Stats */}
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
                    
                    {/* Animated number */}
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
                    
                    {/* Mini chart */}
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
                    
                    {/* Shimmer overlay */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    />
                  </motion.div>

                  {/* Pipeline Stats */}
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

                {/* Main Content - Kanban Preview */}
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
                      
                      {/* Job Cards */}
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
                        
                        {/* Skeleton card */}
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
                      {/* Active column glow */}
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
                        {/* Featured/Active Card */}
                        <motion.div
                          className="p-2 md:p-3 rounded-xl bg-zinc-900/90 border border-indigo-500/40 shadow-lg shadow-indigo-500/10 relative overflow-hidden"
                          animate={{ 
                            y: [0, -4, 0],
                            boxShadow: ['0 4px 12px rgba(99,102,241,0.1)', '0 8px 20px rgba(99,102,241,0.2)', '0 4px 12px rgba(99,102,241,0.1)']
                          }}
                          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        >
                          {/* Left accent */}
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
                          
                          {/* Shimmer */}
                          <motion.div 
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent -skew-x-12"
                            animate={{ x: ['-100%', '200%'] }}
                            transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                          />
                        </motion.div>

                        {/* Other interview cards */}
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
                          {/* Success glow */}
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
                  <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87c.48 0 .72-.58.38-.92L6.35 2.85a.5.5 0 0 0-.85.36Z" fill="white" stroke="black" strokeWidth="1"/>
                </svg>
                {/* Click ripple */}
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


        {/* CLEAN BENTO GRID */}
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

            {/* CARD 1: Kanban Workflow (4 cols) - Drag & Drop Animation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="md:col-span-4 rounded-2xl md:rounded-3xl border border-zinc-800/60 bg-zinc-900/70 overflow-hidden group hover:border-indigo-500/30 transition-all duration-500"
            >
              <div className="p-5 md:p-6">
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                    <Kanban size={16} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-100">Precision Workflow</h3>
                    <p className="text-zinc-500 text-xs">Drag and drop with fluid animations</p>
                  </div>
                </div>
                
                {/* Kanban Board with Drag Animation */}
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
                        {/* Dragging Card */}
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
                        
                        {/* Static card in Interview */}
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
                        {/* Existing offer card */}
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
                        
                        {/* Drop zone indicator */}
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
                  
                  {/* Cursor following the drag */}
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
                
                {/* Status text */}
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

            {/* CARD 2: Metrics (2 cols) - With Icon */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="md:col-span-2 rounded-2xl md:rounded-3xl border border-zinc-800/60 bg-gradient-to-br from-zinc-900/80 to-emerald-950/10 overflow-hidden group hover:border-emerald-500/40 hover:shadow-[0_0_50px_-15px_rgba(16,185,129,0.4)] transition-all duration-500 relative"
            >
              {/* Subtle glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
              
              <div className="p-5 md:p-6 h-full flex flex-col relative z-10">
                {/* Icon + Title row */}
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

                {/* Progress Ring */}
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

                {/* Stats */}
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

            {/* CARD 3: Keyboard First (3 cols) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="md:col-span-3 rounded-2xl md:rounded-3xl border border-zinc-800/60 bg-zinc-900/60 overflow-hidden group hover:border-amber-500/30 hover:shadow-[0_0_40px_-15px_rgba(245,158,11,0.3)] transition-all duration-500"
            >
              <div className="p-5 md:p-6">
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                    <Command size={16} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-100">Keyboard First</h3>
                    <p className="text-zinc-500 text-xs">Search anything instantly</p>
                  </div>
                </div>

                {/* Command Palette - Clean Design */}
                <div className="bg-zinc-950 rounded-lg border border-zinc-800 overflow-hidden">
                  {/* Search input */}
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
                  
                  {/* Results - Interview listings */}
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
                      
                      {/* Result 1 - Selected */}
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
                      
                      {/* Result 2 */}
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

                {/* Shortcuts - minimal */}
                <div className="flex items-center gap-3 mt-3 text-[10px] text-zinc-600">
                  <span className="flex items-center gap-1"><kbd className="text-amber-500/70">↑↓</kbd> navigate</span>
                  <span className="flex items-center gap-1"><kbd className="text-amber-500/70">↵</kbd> open</span>
                  <span className="flex items-center gap-1"><kbd className="text-amber-500/70">esc</kbd> close</span>
                </div>
              </div>
            </motion.div>

            {/* CARD 4: Fluid Interactions (3 cols) - Fixed Animation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="md:col-span-3 rounded-2xl md:rounded-3xl border border-zinc-800/60 bg-gradient-to-br from-zinc-900/80 to-pink-950/10 overflow-hidden group hover:border-pink-500/40 hover:shadow-[0_0_50px_-15px_rgba(236,72,153,0.4)] transition-all duration-500 relative"
            >
              {/* Subtle glow */}
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-pink-500/5 rounded-full blur-3xl pointer-events-none" />
              
              <div className="p-5 md:p-6 relative z-10">
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400">
                    <MousePointer2 size={16} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-100">Fluid Interactions</h3>
                    <p className="text-zinc-500 text-xs">Natural, responsive animations</p>
                  </div>
                </div>

                {/* Draggable List Preview - Fixed with relative positioning */}
                <div className="relative h-[140px] bg-zinc-950/30 rounded-xl border border-zinc-800/30 p-2 overflow-hidden">
                  {/* Static positions for cards */}
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
      <footer className="relative border-t border-zinc-800/50 bg-zinc-950 overflow-hidden">
        {/* Subtle top glow line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Brand */}
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 flex items-center justify-center">
                <img src="/logo.png" alt="LinearFlow Logo" className="h-full w-full object-contain" />
              </div>
              <span className="font-semibold text-zinc-200 tracking-tight">LinearFlow</span>
            </div>

            {/* Links */}
            <div className="flex items-center gap-6 text-sm">
              {['Privacy', 'Terms', 'Contact'].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-zinc-500 hover:text-zinc-300 transition-colors duration-200"
                >
                  {link}
                </a>
              ))}
            </div>

            {/* Social + Copyright */}
            <div className="flex items-center gap-5">
              {/* Social Icons */}
              <div className="flex items-center gap-2">
                {[
                  { icon: 'twitter', path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
                  { icon: 'github', path: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z' },
                ].map(({ icon, path }) => (
                  <motion.a
                    key={icon}
                    href="#"
                    className="w-8 h-8 rounded-lg bg-zinc-900/60 border border-zinc-800/50 flex items-center justify-center text-zinc-500 hover:text-zinc-300 hover:border-zinc-700 transition-all duration-200"
                    whileHover={{ y: -1 }}
                  >
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d={path} />
                    </svg>
                  </motion.a>
                ))}
              </div>

              <div className="h-4 w-px bg-zinc-800 hidden md:block" />

              <span className="text-zinc-600 text-sm">© 2024 LinearFlow</span>
            </div>
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

// Animated counter component for metrics
const AnimatedCounter = ({ target, duration = 1.5 }: { target: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTime: number;
          const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(easeOutQuart * target));
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
  }, [target, duration, hasAnimated]);

  return <span ref={ref}>{count}</span>;
};

// Scramble counter that shows random numbers before settling on target
const ScrambleCounter = ({ target }: { target: number }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [isScrambling, setIsScrambling] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
          setIsScrambling(true);
          
          // Phase 1: Fast random scrambling (0.8s)
          const scrambleInterval = setInterval(() => {
            setDisplayValue(Math.floor(Math.random() * 100));
          }, 50);
          
          // Phase 2: Slow down and approach target (0.8s)
          setTimeout(() => {
            clearInterval(scrambleInterval);
            
            let currentValue = Math.floor(Math.random() * 100);
            const approachInterval = setInterval(() => {
              // Gradually approach target with some randomness
              const diff = target - currentValue;
              const step = Math.ceil(Math.abs(diff) / 4) * Math.sign(diff);
              currentValue += step + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 3);
              currentValue = Math.max(0, Math.min(99, currentValue));
              setDisplayValue(currentValue);
            }, 100);
            
            // Phase 3: Final settle on target (0.4s)
            setTimeout(() => {
              clearInterval(approachInterval);
              
              // Quick bounce around target
              const bounceValues = [target - 2, target + 1, target - 1, target];
              let bounceIndex = 0;
              const bounceInterval = setInterval(() => {
                if (bounceIndex < bounceValues.length) {
                  setDisplayValue(bounceValues[bounceIndex]);
                  bounceIndex++;
                } else {
                  clearInterval(bounceInterval);
                  setDisplayValue(target);
                  setIsScrambling(false);
                }
              }, 80);
            }, 600);
          }, 800);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [target, hasStarted]);

  return (
    <span 
      ref={ref} 
      className={`inline-block min-w-[2ch] text-center transition-colors duration-200 ${isScrambling ? 'text-emerald-400' : 'text-zinc-100'}`}
    >
      {displayValue}
    </span>
  );
};

export default LandingPage;
