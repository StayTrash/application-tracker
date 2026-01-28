'use client';

import React from 'react';

const FeaturesList: React.FC = () => {
    const features = [
        { title: 'Privacy Focused', desc: 'Your data stays local. No tracking, no sharing.' },
        { title: 'Instant Search', desc: 'Find any application in milliseconds.' },
        { title: 'Export Ready', desc: 'Download your data as CSV or JSON anytime.' },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left w-full max-w-5xl mb-20 relative z-20">
            {features.map((feature, i) => (
                <div key={i} className="group space-y-3">
                    <div className="h-px w-8 bg-zinc-700 group-hover:w-16 group-hover:bg-indigo-500 transition-all duration-500" />
                    <h4 className="text-zinc-100 font-medium">{feature.title}</h4>
                    <p className="text-zinc-500 text-sm">{feature.desc}</p>
                </div>
            ))}
        </div>
    );
};

export default FeaturesList;
