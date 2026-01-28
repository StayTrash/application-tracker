'use client';

import React from 'react';
import { Skeleton } from './Skeleton';

// Skeleton for Dashboard Metric Card
const MetricCardSkeleton: React.FC = () => (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 space-y-3">
        <Skeleton className="h-3 w-24" />
        <div className="flex items-baseline gap-3 mt-2">
            <Skeleton className="h-10 w-16" />
            <Skeleton className="h-5 w-12 rounded" />
        </div>
    </div>
);

// Skeleton for Chart Container
const ChartSkeleton: React.FC<{ className?: string }> = ({ className }) => (
    <div className={`rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 flex flex-col ${className || ''}`}>
        <Skeleton className="h-4 w-32 mb-4" />
        <div className="flex-1 flex items-end justify-around gap-2 pt-4">
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
const PieChartSkeleton: React.FC = () => (
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
const TableRowSkeleton: React.FC = () => (
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

export default DashboardSkeleton;
