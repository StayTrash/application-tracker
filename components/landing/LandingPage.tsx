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

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-200 selection:bg-indigo-500/30 font-sans perspective-1000 overflow-x-hidden">
            {/* Dynamic Background */}
            <div className="fixed inset-0 bg-dot-pattern opacity-20 pointer-events-none" />
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[600px] bg-violet-500/5 blur-[100px] rounded-full" />
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
