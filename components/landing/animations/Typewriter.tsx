'use client';

import React, { useEffect, useState } from 'react';

interface TypewriterProps {
    text: string;
}

const Typewriter: React.FC<TypewriterProps> = ({ text }) => {
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
                    i = 0;
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

export default Typewriter;
