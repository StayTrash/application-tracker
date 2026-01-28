'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps {
    className?: string;
    shimmer?: boolean;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className, shimmer = true }) => (
    <div
        className={cn(
            "rounded-md bg-zinc-800/50",
            shimmer ? "skeleton-shimmer" : "animate-pulse",
            className
        )}
    />
);

export default Skeleton;
