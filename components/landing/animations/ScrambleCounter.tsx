'use client';

import React, { useEffect, useRef, useState } from 'react';

interface ScrambleCounterProps {
    target: number;
}

const ScrambleCounter: React.FC<ScrambleCounterProps> = ({ target }) => {
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
                            const diff = target - currentValue;
                            const step = Math.ceil(Math.abs(diff) / 4) * Math.sign(diff);
                            currentValue += step + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 3);
                            currentValue = Math.max(0, Math.min(99, currentValue));
                            setDisplayValue(currentValue);
                        }, 100);

                        // Phase 3: Final settle on target (0.4s)
                        setTimeout(() => {
                            clearInterval(approachInterval);

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

export default ScrambleCounter;
