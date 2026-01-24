'use client';

import React, { useMemo, useState } from 'react';
import {
    AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, BarChart, Bar, Legend
} from 'recharts';
import { ArrowUpRight, TrendingUp, MoreHorizontal, Sparkles, List, Filter, ArrowUpDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { Job } from '@/types';
import { STATUS_COLORS } from '@/constants';

interface DashboardProps {
    jobs: Job[];
    onAddJob: () => void;
}

const COLORS = {
    Applied: '#71717a',   // zinc-500
    Screening: '#3b82f6', // blue-500
    Interview: '#8b5cf6', // violet-500
    Offer: '#10b981',     // emerald-500
    Rejected: '#ef4444',  // red-500
};

const Dashboard: React.FC<DashboardProps> = ({ jobs, onAddJob }) => {
    const [sortConfig, setSortConfig] = useState<{ key: keyof Job; direction: 'asc' | 'desc' } | null>(null);

    // Calculate dynamic metrics
    const metrics = useMemo(() => {
        const total = jobs.length;
        const interviews = jobs.filter(j => j.status === 'Interview').length;
        const offers = jobs.filter(j => j.status === 'Offer').length;

        return [
            { label: 'Total Applications', value: total, trend: 12, color: 'text-zinc-200' },
            { label: 'Interviews Scheduled', value: interviews, trend: 5, color: 'text-indigo-400' },
            { label: 'Offers Received', value: offers, trend: 100, color: 'text-emerald-400' },
        ];
    }, [jobs]);

    // Chart Data: Velocity (Area)
    const velocityData = useMemo(() => {
        const groups: Record<string, number> = {};
        const sortedJobs = [...jobs].sort((a, b) => new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime());

        if (sortedJobs.length === 0) return [];

        sortedJobs.forEach(job => {
            const date = new Date(job.dateAdded);
            const key = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            groups[key] = (groups[key] || 0) + 1;
        });

        return Object.keys(groups).map(key => ({ name: key, applications: groups[key] }));
    }, [jobs]);

    // Chart Data: Status Distribution (Pie)
    const statusData = useMemo(() => {
        const counts: Record<string, number> = {};
        jobs.forEach(job => {
            counts[job.status] = (counts[job.status] || 0) + 1;
        });
        return Object.keys(counts).map(status => ({ name: status, value: counts[status] }));
    }, [jobs]);

    // Chart Data: Funnel (Bar) - Focusing on active pipeline stages
    const funnelData = useMemo(() => {
        const stages = ['Applied', 'Screening', 'Interview', 'Offer'];
        return stages.map(stage => ({
            name: stage,
            count: jobs.filter(j => j.status === stage).length
        }));
    }, [jobs]);

    // Table Sorting Logic
    const sortedJobs = useMemo(() => {
        let sortableJobs = [...jobs];
        if (sortConfig !== null) {
            sortableJobs.sort((a, b) => {
                // @ts-ignore
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                // @ts-ignore
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableJobs;
    }, [jobs, sortConfig]);

    const requestSort = (key: keyof Job) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    return (
        <div className="p-8 h-full overflow-y-auto custom-scrollbar">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex items-end justify-between mb-2">
                    <div>
                        <h1 className="text-2xl font-semibold text-zinc-100 tracking-tight">Overview</h1>
                        <p className="text-zinc-500 text-sm mt-1">
                            Your pipeline is active. <span className="text-zinc-200">{metrics[1].value} upcoming interviews</span> this week.
                        </p>
                    </div>
                    <button
                        onClick={onAddJob}
                        className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-indigo-600/90 hover:bg-indigo-600 rounded-lg shadow-lg shadow-indigo-900/20 transition-all border border-indigo-500/50"
                    >
                        <Sparkles size={14} />
                        Quick Add
                    </button>
                </div>

                {/* Top Metric Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {metrics.map((metric, index) => (
                        <motion.div
                            key={metric.label}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="rounded-xl border border-zinc-800 bg-zinc-900/40 bg-noise bg-dot-pattern p-5 flex flex-col justify-between hover:border-zinc-700 transition-colors relative group overflow-hidden"
                        >
                            <div className="absolute top-4 right-4 text-zinc-700 group-hover:text-zinc-500 transition-colors z-10">
                                <ArrowUpRight size={16} />
                            </div>
                            <p className="text-zinc-500 text-xs uppercase tracking-wider font-semibold">{metric.label}</p>
                            <div className="mt-2 flex items-baseline gap-3">
                                <span className={`text-4xl font-thin tracking-tight tabular-nums ${metric.color}`}>
                                    {metric.value}
                                </span>
                                <span className="text-xs text-emerald-500/80 bg-emerald-500/10 px-1.5 py-0.5 rounded flex items-center gap-1">
                                    <TrendingUp size={10} /> +{metric.trend}%
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[400px]">

                    {/* Main Velocity Chart */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="md:col-span-2 rounded-xl border border-zinc-800 bg-zinc-900/40 bg-noise p-6 relative overflow-hidden flex flex-col"
                    >
                        <div className="absolute inset-0 bg-dot-pattern bg-dot-sm opacity-20 pointer-events-none" />
                        <div className="relative z-10 flex justify-between items-start mb-4">
                            <h3 className="text-zinc-400 text-sm font-medium">Application Velocity</h3>
                            <button className="text-zinc-600 hover:text-zinc-300 transition-colors"><MoreHorizontal size={16} /></button>
                        </div>
                        <div className="flex-1 w-full -ml-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={velocityData.length > 0 ? velocityData : [{ name: 'Today', applications: 0 }]}>
                                    <defs>
                                        <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#52525b', fontSize: 10 }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#52525b', fontSize: 10 }} width={30} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px', fontSize: '12px' }}
                                        itemStyle={{ color: '#e4e4e7' }}
                                        cursor={{ stroke: '#3f3f46', strokeDasharray: '4 4' }}
                                    />
                                    <Area type="monotone" dataKey="applications" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorApps)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>

                    {/* Status Distribution (Donut) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="md:col-span-1 rounded-xl border border-zinc-800 bg-zinc-900/40 bg-noise p-6 flex flex-col items-center justify-between"
                    >
                        <h3 className="text-zinc-400 text-sm font-medium self-start w-full">Status Breakdown</h3>
                        <div className="h-[200px] w-full mt-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={statusData}
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {statusData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS] || '#71717a'} stroke="rgba(0,0,0,0)" />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px', fontSize: '12px' }}
                                        itemStyle={{ color: '#e4e4e7' }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex flex-wrap gap-2 justify-center mt-2">
                            {statusData.slice(0, 3).map((entry) => (
                                <div key={entry.name} className="flex items-center gap-1.5 text-[10px] text-zinc-500">
                                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[entry.name as keyof typeof COLORS] }} />
                                    {entry.name}
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Pipeline Funnel (Bar) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="md:col-span-1 rounded-xl border border-zinc-800 bg-zinc-900/40 bg-noise p-6 flex flex-col"
                    >
                        <h3 className="text-zinc-400 text-sm font-medium mb-4">Pipeline Funnel</h3>
                        <div className="flex-1 w-full -ml-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={funnelData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                    <XAxis type="number" hide />
                                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#71717a', fontSize: 10 }} width={60} />
                                    <Tooltip
                                        cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                        contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px', fontSize: '12px' }}
                                    />
                                    <Bar dataKey="count" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20}>
                                        {funnelData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS] || '#71717a'} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>
                </div>

                {/* List View Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="rounded-xl border border-zinc-800 bg-zinc-900/40 bg-noise overflow-hidden"
                >
                    <div className="px-6 py-4 border-b border-zinc-800/50 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <List size={16} className="text-indigo-400" />
                            <h3 className="text-zinc-200 font-medium text-sm">All Applications</h3>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-zinc-800 bg-zinc-900 text-xs text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 transition-colors">
                                <Filter size={12} /> Filter
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-zinc-400">
                            <thead className="bg-zinc-900/50 text-xs uppercase font-medium text-zinc-500">
                                <tr>
                                    <th className="px-6 py-3 cursor-pointer hover:text-zinc-300" onClick={() => requestSort('company')}>
                                        <div className="flex items-center gap-1">Company <ArrowUpDown size={12} /></div>
                                    </th>
                                    <th className="px-6 py-3 cursor-pointer hover:text-zinc-300" onClick={() => requestSort('role')}>
                                        <div className="flex items-center gap-1">Role <ArrowUpDown size={12} /></div>
                                    </th>
                                    <th className="px-6 py-3 cursor-pointer hover:text-zinc-300" onClick={() => requestSort('status')}>
                                        <div className="flex items-center gap-1">Status <ArrowUpDown size={12} /></div>
                                    </th>
                                    <th className="px-6 py-3 cursor-pointer hover:text-zinc-300" onClick={() => requestSort('dateAdded')}>
                                        <div className="flex items-center gap-1">Date <ArrowUpDown size={12} /></div>
                                    </th>
                                    <th className="px-6 py-3 text-right">Salary</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-800/50">
                                {sortedJobs.map((job) => (
                                    <tr key={job.id} className="group hover:bg-zinc-800/30 transition-colors">
                                        <td className="px-6 py-3.5">
                                            <div className="flex items-center gap-3">
                                                <div className="h-8 w-8 rounded-md border border-zinc-800 bg-zinc-900 flex items-center justify-center overflow-hidden">
                                                    <img src={job.logo} alt={job.company} className="h-full w-full object-cover opacity-80" />
                                                </div>
                                                <span className="font-medium text-zinc-200">{job.company}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-3.5 text-zinc-300">{job.role}</td>
                                        <td className="px-6 py-3.5">
                                            <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-medium border ${STATUS_COLORS[job.status]}`}>
                                                {job.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-3.5 tabular-nums text-zinc-500 group-hover:text-zinc-400">
                                            {new Date(job.dateAdded).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </td>
                                        <td className="px-6 py-3.5 text-right tabular-nums text-zinc-300">
                                            {job.salary}
                                        </td>
                                    </tr>
                                ))}
                                {sortedJobs.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-zinc-600 italic">
                                            No applications found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </motion.div>

            </div>
        </div>
    );
};

export default Dashboard;
