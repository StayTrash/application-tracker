'use client';

import React from 'react';
import { Skeleton } from './Skeleton';

// Skeleton for a single JobCard in Kanban
const JobCardSkeleton: React.FC = () => (
    <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-3 shadow-sm">
        <div className="flex items-start justify-between">
            <div className="flex gap-3">
                <Skeleton className="h-10 w-10 rounded-lg" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-20" />
                </div>
            </div>
            <Skeleton className="h-5 w-16 rounded-full" />
        </div>
        <div className="grid grid-cols-2 gap-y-2">
            <div className="flex items-center gap-1.5">
                <Skeleton className="h-3 w-3 rounded-full" />
                <Skeleton className="h-3 w-16" />
            </div>
            <div className="flex items-center gap-1.5">
                <Skeleton className="h-3 w-3 rounded-full" />
                <Skeleton className="h-3 w-20" />
            </div>
            <div className="flex items-center gap-1.5 col-span-2">
                <Skeleton className="h-3 w-3 rounded-full" />
                <Skeleton className="h-3 w-28" />
            </div>
        </div>
        <div className="flex gap-1.5">
            <Skeleton className="h-5 w-14 rounded-md" />
            <Skeleton className="h-5 w-16 rounded-md" />
            <Skeleton className="h-5 w-12 rounded-md" />
        </div>
    </div>
);

export const KanbanSkeleton: React.FC = () => (
    <div className="h-full flex flex-col overflow-hidden bg-slate-50">
        {/* Board Header */}
        <div className="h-16 shrink-0 flex items-center justify-between px-8 border-b border-slate-200 backdrop-blur-sm bg-white/80 z-20 shadow-sm">
            <div className="flex items-center gap-4">
                <Skeleton className="h-4 w-24" />
                <span className="h-4 w-px bg-slate-200" />
                <div className="flex -space-x-2">
                    <Skeleton className="h-6 w-6 rounded-full" />
                    <Skeleton className="h-6 w-6 rounded-full" />
                </div>
            </div>
            <div className="flex items-center gap-3">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-8 w-8 rounded-md" />
            </div>
        </div>

        {/* Columns */}
        <div className="flex-1 overflow-x-auto overflow-y-hidden">
            <div className="h-full flex px-8 py-6 gap-6 min-w-max">
                {['Applied', 'Screening', 'Interview', 'Offer', 'Rejected'].map((col, colIndex) => (
                    <div key={col} className="w-[340px] flex flex-col h-full rounded-2xl">
                        <div className="flex items-center justify-between mb-4 px-3 mt-2">
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-4 w-20" />
                                <Skeleton className="h-5 w-6 rounded" />
                            </div>
                            <Skeleton className="h-4 w-4 rounded" />
                        </div>
                        <div className="flex-1 overflow-y-auto px-2 space-y-3 pb-4">
                            {[...Array(colIndex === 0 ? 3 : colIndex === 4 ? 1 : 2)].map((_, i) => (
                                <JobCardSkeleton key={i} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export default KanbanSkeleton;
