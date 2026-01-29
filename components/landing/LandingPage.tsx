'use client';

import React from 'react';
import { useSession, signIn } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import PreviewSection from './PreviewSection';
import FeaturesGrid from './FeaturesGrid';
import FeaturesList from './FeaturesList';
import Footer from './Footer';
import { useTheme } from '@/components/providers/ThemeProvider';

const LandingPage: React.FC = () => {
    const { data: session } = useSession();
    const { theme } = useTheme();

    if (session) {
        redirect('/dashboard');
    }

    const handleLogin = () => {
        signIn('google', { callbackUrl: '/dashboard' });
    };

    const handleGuestLogin = () => {
        signIn('credentials', { email: 'guest@linearflow.app', callbackUrl: '/dashboard' });
    };

    return (
        <div className={`min-h-screen selection:bg-indigo-500/30 font-sans perspective-1000 overflow-x-hidden transition-colors duration-300 ${
            theme === 'dark' 
                ? 'bg-[#0c0c10] text-zinc-200' 
                : 'bg-[#fafafa] text-zinc-800'
        }`}>
            {/* Dynamic Background */}
            <div className={`fixed inset-0 bg-dot-pattern pointer-events-none transition-opacity ${theme === 'dark' ? 'opacity-20' : 'opacity-40'}`} />
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className={`absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[500px] blur-[120px] rounded-full ${
                    theme === 'dark' ? 'bg-indigo-500/10' : 'bg-indigo-400/20'
                }`} />
                <div className={`absolute bottom-[-10%] right-[-10%] w-[800px] h-[600px] blur-[100px] rounded-full ${
                    theme === 'dark' ? 'bg-violet-500/5' : 'bg-violet-400/15'
                }`} />
            </div>

            {/* Navbar */}
            <Navbar onLogin={handleLogin} onGuestLogin={handleGuestLogin} />

            {/* Main Content */}
            <main className="pt-40 pb-20 px-6 lg:px-12 max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
                {/* Hero Section */}
                <HeroSection onLogin={handleLogin} onGuestLogin={handleGuestLogin} />

                {/* 3D Interface Preview */}
                <PreviewSection />

                {/* Features Bento Grid */}
                <FeaturesGrid />

                {/* Features List */}
                <FeaturesList />
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default LandingPage;
