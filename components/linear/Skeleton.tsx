'use client';

import React from 'react';
import { cn } from '@/lib/utils';

// Base Skeleton Primitive
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

// Skeleton for a single JobCard in Kanban
export const JobCardSkeleton: React.FC = () => (
    <div className="rounded-xl border border-zinc-800/50 bg-linear-to-b from-zinc-800/40 to-zinc-800/10 p-4 space-y-3">
        {/* Header */}
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

        {/* Metadata */}
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

        {/* Tags */}
        <div className="flex gap-1.5">
            <Skeleton className="h-5 w-14 rounded-md" />
            <Skeleton className="h-5 w-16 rounded-md" />
            <Skeleton className="h-5 w-12 rounded-md" />
        </div>
    </div>
);

// Skeleton for Dashboard Metric Card
export const MetricCardSkeleton: React.FC = () => (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 space-y-3">
        <Skeleton className="h-3 w-24" />
        <div className="flex items-baseline gap-3 mt-2">
            <Skeleton className="h-10 w-16" />
            <Skeleton className="h-5 w-12 rounded" />
        </div>
    </div>
);

// Skeleton for Chart Container
export const ChartSkeleton: React.FC<{ className?: string }> = ({ className }) => (
    <div className={cn("rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 flex flex-col", className)}>
        <Skeleton className="h-4 w-32 mb-4" />
        <div className="flex-1 flex items-end justify-around gap-2 pt-4">
            {/* Simulated bar/area shapes */}
            <Skeleton className="w-8 h-[40%] rounded-t" />
            <Skeleton className="w-8 h-[65%] rounded-t" />
            <Skeleton className="w-8 h-[45%] rounded-t" />
            <Skeleton className="w-8 h-[80%] rounded-t" />
            <Skeleton className="w-8 h-[55%] rounded-t" />
            <Skeleton className="w-8 h-[70%] rounded-t" />
            <Skeleton className="w-8 h-[50%] rounded-t" />
        </div>
    </div>
);

// Skeleton for Pie/Donut Chart
export const PieChartSkeleton: React.FC = () => (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 flex flex-col items-center justify-between">
        <Skeleton className="h-4 w-28 self-start" />
        <div className="relative my-4">
            <Skeleton className="h-40 w-40 rounded-full" />
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-24 w-24 rounded-full bg-zinc-950" />
            </div>
        </div>
        <div className="flex gap-4 mt-2">
            <div className="flex items-center gap-1.5">
                <Skeleton className="h-2 w-2 rounded-full" />
                <Skeleton className="h-3 w-12" />
            </div>
            <div className="flex items-center gap-1.5">
                <Skeleton className="h-2 w-2 rounded-full" />
                <Skeleton className="h-3 w-14" />
            </div>
            <div className="flex items-center gap-1.5">
                <Skeleton className="h-2 w-2 rounded-full" />
                <Skeleton className="h-3 w-10" />
            </div>
        </div>
    </div>
);

// Skeleton for Table Row
export const TableRowSkeleton: React.FC = () => (
    <tr className="border-b border-zinc-800/30">
        <td className="px-6 py-3.5">
            <div className="flex items-center gap-3">
                <Skeleton className="h-8 w-8 rounded-md" />
                <Skeleton className="h-4 w-24" />
            </div>
        </td>
        <td className="px-6 py-3.5">
            <Skeleton className="h-4 w-32" />
        </td>
        <td className="px-6 py-3.5">
            <Skeleton className="h-5 w-16 rounded-full" />
        </td>
        <td className="px-6 py-3.5">
            <Skeleton className="h-4 w-20" />
        </td>
        <td className="px-6 py-3.5 text-right">
            <Skeleton className="h-4 w-16 ml-auto" />
        </td>
    </tr>
);

// Skeleton for Jobs List Table Row (with more columns)
export const JobsListRowSkeleton: React.FC<{ index: number }> = ({ index }) => (
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

// Document List Item Skeleton
export const DocumentListItemSkeleton: React.FC = () => (
    <div className="flex items-center gap-3 p-3 rounded-lg">
        <Skeleton className="h-4 w-4 rounded" />
        <Skeleton className="h-4 flex-1" />
    </div>
);

// ===== Full View Skeletons =====

// Dashboard Skeleton
export const DashboardSkeleton: React.FC = () => (
    <div className="p-8 h-full overflow-y-auto custom-scrollbar">
        <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-end justify-between mb-2">
                <div className="space-y-2">
                    <Skeleton className="h-8 w-32" />
                    <Skeleton className="h-4 w-64" />
                </div>
                <Skeleton className="h-9 w-28 rounded-lg" />
            </div>

            {/* Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <MetricCardSkeleton />
                <MetricCardSkeleton />
                <MetricCardSkeleton />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[400px]">
                <ChartSkeleton className="md:col-span-2" />
                <PieChartSkeleton />
                <ChartSkeleton className="md:col-span-1" />
            </div>

            {/* Table Section */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 overflow-hidden">
                <div className="px-6 py-4 border-b border-zinc-800/50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-4 w-4 rounded" />
                        <Skeleton className="h-4 w-28" />
                    </div>
                    <Skeleton className="h-7 w-16 rounded-md" />
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-zinc-900/50">
                            <tr>
                                <th className="px-6 py-3"><Skeleton className="h-3 w-16" /></th>
                                <th className="px-6 py-3"><Skeleton className="h-3 w-12" /></th>
                                <th className="px-6 py-3"><Skeleton className="h-3 w-14" /></th>
                                <th className="px-6 py-3"><Skeleton className="h-3 w-10" /></th>
                                <th className="px-6 py-3 text-right"><Skeleton className="h-3 w-14 ml-auto" /></th>
                            </tr>
                        </thead>
                        <tbody>
                            {[...Array(5)].map((_, i) => (
                                <TableRowSkeleton key={i} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
);

// Kanban Board Skeleton
export const KanbanBoardSkeleton: React.FC = () => (
    <div className="h-full flex flex-col overflow-hidden">
        {/* Board Header */}
        <div className="h-16 shrink-0 flex items-center justify-between px-8 border-b border-zinc-800/50 backdrop-blur-sm bg-zinc-950/50 z-20">
            <div className="flex items-center gap-4">
                <Skeleton className="h-4 w-24" />
                <span className="h-4 w-px bg-zinc-800" />
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
                        {/* Column Header */}
                        <div className="flex items-center justify-between mb-4 px-3 mt-2">
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-4 w-20" />
                                <Skeleton className="h-5 w-6 rounded" />
                            </div>
                            <Skeleton className="h-4 w-4 rounded" />
                        </div>

                        {/* Cards */}
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

// Jobs List Skeleton
export const JobsListSkeleton: React.FC = () => (
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

// Documents View Skeleton
export const DocumentsViewSkeleton: React.FC = () => (
    <div className="flex h-full w-full overflow-hidden bg-zinc-950/50">
        {/* Sidebar */}
        <div className="w-64 border-r border-zinc-800/50 flex flex-col bg-zinc-950/30">
            <div className="p-4 border-b border-zinc-800/50 flex items-center justify-between">
                <Skeleton className="h-5 w-24" />
                <div className="flex gap-1">
                    <Skeleton className="h-7 w-7 rounded" />
                    <Skeleton className="h-7 w-7 rounded" />
                </div>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
                {[...Array(6)].map((_, i) => (
                    <DocumentListItemSkeleton key={i} />
                ))}
            </div>
        </div>

        {/* Editor Area */}
        <div className="flex-1 flex flex-col min-w-0 bg-zinc-950">
            <div className="flex flex-col h-full max-w-3xl mx-auto w-full p-8 md:p-12">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <Skeleton className="h-10 w-10 rounded-xl" />
                    <Skeleton className="h-8 flex-1" />
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-8 w-8 rounded" />
                        <Skeleton className="h-8 w-8 rounded" />
                        <Skeleton className="h-8 w-8 rounded" />
                    </div>
                </div>

                {/* Content lines */}
                <div className="space-y-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-[90%]" />
                    <Skeleton className="h-4 w-[95%]" />
                    <Skeleton className="h-4 w-[80%]" />
                    <Skeleton className="h-4 w-[85%]" />
                    <Skeleton className="h-4 w-0" />
                    <Skeleton className="h-4 w-[92%]" />
                    <Skeleton className="h-4 w-[88%]" />
                    <Skeleton className="h-4 w-[75%]" />
                </div>
            </div>
        </div>
    </div>
);
