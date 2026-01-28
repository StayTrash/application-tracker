'use client';

import React from 'react';
import { Skeleton } from './Skeleton';

// Jobs List Table Row Skeleton
const JobsListRowSkeleton: React.FC<{ index: number }> = ({ index }) => (
    <tr className="border-b border-zinc-800/30">
        <td className="px-8 py-4 text-center">
            <Skeleton className="h-4 w-6 mx-auto" />
        </td>
        <td className="px-4 py-4">
            <div className="flex items-center gap-3">
                <Skeleton className="h-6 w-6 rounded" />
                <Skeleton className="h-4 w-24" />
            </div>
        </td>
        <td className="px-4 py-4">
            <Skeleton className="h-4 w-32" />
        </td>
        <td className="px-4 py-4">
            <Skeleton className="h-4 w-20" />
        </td>
        <td className="px-4 py-4">
            <Skeleton className="h-5 w-16 rounded-md" />
        </td>
        <td className="px-4 py-4">
            <Skeleton className="h-4 w-24" />
        </td>
        <td className="px-4 py-4 text-right">
            <Skeleton className="h-4 w-20 ml-auto" />
        </td>
        <td className="px-8 py-4 w-12" />
    </tr>
);

export const ListSkeleton: React.FC = () => (
    <div className="h-full flex flex-col bg-zinc-950/50">
        {/* Toolbar */}
        <div className="h-16 shrink-0 flex items-center justify-between px-8 border-b border-zinc-800/50 backdrop-blur-sm">
            <div className="flex items-center gap-4">
                <Skeleton className="h-4 w-28" />
                <span className="h-4 w-px bg-zinc-800" />
                <Skeleton className="h-3 w-16" />
            </div>
            <div className="flex items-center gap-3">
                <Skeleton className="h-8 w-24 rounded-md" />
                <Skeleton className="h-8 w-20 rounded-md" />
                <Skeleton className="h-8 w-32 rounded-md" />
            </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto">
            <table className="w-full text-left text-sm">
                <thead className="bg-zinc-900/50 sticky top-0 z-10">
                    <tr>
                        <th className="px-8 py-4 w-12"><Skeleton className="h-3 w-4 mx-auto" /></th>
                        <th className="px-4 py-4"><Skeleton className="h-3 w-16" /></th>
                        <th className="px-4 py-4"><Skeleton className="h-3 w-10" /></th>
                        <th className="px-4 py-4"><Skeleton className="h-3 w-16" /></th>
                        <th className="px-4 py-4"><Skeleton className="h-3 w-12" /></th>
                        <th className="px-4 py-4"><Skeleton className="h-3 w-20" /></th>
                        <th className="px-4 py-4 text-right"><Skeleton className="h-3 w-12 ml-auto" /></th>
                        <th className="px-8 py-4 w-12" />
                    </tr>
                </thead>
                <tbody>
                    {[...Array(8)].map((_, i) => (
                        <JobsListRowSkeleton key={i} index={i} />
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

export default ListSkeleton;
