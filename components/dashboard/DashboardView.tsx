'use client';

import React, { useMemo, useState } from 'react';
import {
    AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, BarChart, Bar
} from 'recharts';
import { ArrowUpRight, TrendingUp, MoreHorizontal, Sparkles, List, Filter, ArrowUpDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { Job } from '@/types';
import { STATUS_COLORS } from '@/constants';

interface DashboardViewProps {
    jobs: Job[];
    onAddJob: () => void;
}

const COLORS = {
    Applied: '#71717a',
    Screening: '#3b82f6',
    Interview: '#8b5cf6',
    Offer: '#10b981',
    Rejected: '#ef4444',
};

const DashboardView: React.FC<DashboardViewProps> = ({ jobs, onAddJob }) => {
    const [sortConfig, setSortConfig] = useState<{ key: keyof Job; direction: 'asc' | 'desc' } | null>(null);

    const metrics = useMemo(() => {
        const total = jobs.length;
        const interviews = jobs.filter(j => j.status === 'Interview').length;
        const offers = jobs.filter(j => j.status === 'Offer').length;

        return [
            { label: 'Total Applications', value: total, trend: 12, color: 'text-slate-800' },
            { label: 'Interviews Scheduled', value: interviews, trend: 5, color: 'text-indigo-600' },
            { label: 'Offers Received', value: offers, trend: 100, color: 'text-emerald-600' },
        ];
    }, [jobs]);

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

    const statusData = useMemo(() => {
        const counts: Record<string, number> = {};
        jobs.forEach(job => {
            counts[job.status] = (counts[job.status] || 0) + 1;
        });
        return Object.keys(counts).map(status => ({ name: status, value: counts[status] }));
    }, [jobs]);

    const funnelData = useMemo(() => {
        const stages = ['Applied', 'Screening', 'Interview', 'Offer'];
        return stages.map(stage => ({
            name: stage,
            count: jobs.filter(j => j.status === stage).length
        }));
    }, [jobs]);

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
        <div className="p-8 h-full overflow-y-auto custom-scrollbar bg-slate-50">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex items-end justify-between mb-2">
                    <div>
                        <h1 className="text-2xl font-semibold text-slate-800 tracking-tight">Overview</h1>
                        <p className="text-slate-500 text-sm mt-1">
                            Your pipeline is active. <span className="text-slate-700 font-medium">{metrics[1].value} upcoming interviews</span> this week.
                        </p>
                    </div>
                    <button
                        onClick={onAddJob}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-md shadow-indigo-200 transition-all"
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
                            className="rounded-xl border border-slate-200 bg-white p-5 flex flex-col justify-between hover:border-slate-300 hover:shadow-md transition-all relative group overflow-hidden shadow-sm"
                        >
                            <div className="absolute top-4 right-4 text-slate-300 group-hover:text-slate-400 transition-colors z-10">
                                <ArrowUpRight size={16} />
                            </div>
                            <p className="text-slate-500 text-xs uppercase tracking-wider font-semibold">{metric.label}</p>
                            <div className="mt-2 flex items-baseline gap-3">
                                <span className={`text-4xl font-thin tracking-tight tabular-nums ${metric.color}`}>
                                    {metric.value}
                                </span>
                                <span className="text-xs text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded flex items-center gap-1 border border-emerald-100">
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
                        className="md:col-span-2 rounded-xl border border-slate-200 bg-white p-6 relative overflow-hidden flex flex-col shadow-sm"
                    >
                        <div className="relative z-10 flex justify-between items-start mb-4 shrink-0">
                            <h3 className="text-slate-600 text-sm font-medium">Application Velocity</h3>
                            <button className="text-slate-400 hover:text-slate-600 transition-colors"><MoreHorizontal size={16} /></button>
                        </div>
                        <div className="flex-1 min-h-0 w-full -ml-4 relative">
                            <div className="absolute inset-0">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={velocityData.length > 0 ? velocityData : [{ name: 'Today', applications: 0 }]} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                                                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10 }} dy={10} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10 }} width={30} />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px', fontSize: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                            itemStyle={{ color: '#334155' }}
                                            cursor={{ stroke: '#cbd5e1', strokeDasharray: '4 4' }}
                                        />
                                        <Area type="monotone" dataKey="applications" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorApps)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </motion.div>

                    {/* Status Distribution (Donut) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="md:col-span-1 rounded-xl border border-slate-200 bg-white p-6 flex flex-col items-center justify-between shadow-sm"
                    >
                        <h3 className="text-slate-600 text-sm font-medium self-start w-full shrink-0">Status Breakdown</h3>
                        <div className="h-[200px] w-full mt-4 min-h-0 relative">
                            <div className="absolute inset-0">
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
                                                <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS] || '#71717a'} stroke="rgba(255,255,255,0.5)" />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px', fontSize: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                            itemStyle={{ color: '#334155' }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2 justify-center mt-2 shrink-0">
                            {statusData.slice(0, 3).map((entry) => (
                                <div key={entry.name} className="flex items-center gap-1.5 text-[10px] text-slate-500">
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
                        className="md:col-span-1 rounded-xl border border-slate-200 bg-white p-6 flex flex-col shadow-sm"
                    >
                        <h3 className="text-slate-600 text-sm font-medium mb-4 shrink-0">Pipeline Funnel</h3>
                        <div className="flex-1 min-h-0 w-full -ml-4 relative">
                            <div className="absolute inset-0">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={funnelData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                        <XAxis type="number" hide />
                                        <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10 }} width={60} />
                                        <Tooltip
                                            cursor={{ fill: 'rgba(0,0,0,0.03)' }}
                                            contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px', fontSize: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                        />
                                        <Bar dataKey="count" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20}>
                                            {funnelData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS] || '#71717a'} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* List View Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm"
                >
                    <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                        <div className="flex items-center gap-2">
                            <List size={16} className="text-indigo-500" />
                            <h3 className="text-slate-700 font-medium text-sm">All Applications</h3>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-slate-200 bg-white text-xs text-slate-500 hover:text-slate-700 hover:border-slate-300 transition-colors shadow-sm">
                                <Filter size={12} /> Filter
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-slate-600">
                            <thead className="bg-slate-50 text-xs uppercase font-medium text-slate-500">
                                <tr>
                                    <th className="px-6 py-3 cursor-pointer hover:text-slate-700" onClick={() => requestSort('company')}>
                                        <div className="flex items-center gap-1">Company <ArrowUpDown size={12} /></div>
                                    </th>
                                    <th className="px-6 py-3 cursor-pointer hover:text-slate-700" onClick={() => requestSort('role')}>
                                        <div className="flex items-center gap-1">Role <ArrowUpDown size={12} /></div>
                                    </th>
                                    <th className="px-6 py-3 cursor-pointer hover:text-slate-700" onClick={() => requestSort('status')}>
                                        <div className="flex items-center gap-1">Status <ArrowUpDown size={12} /></div>
                                    </th>
                                    <th className="px-6 py-3 cursor-pointer hover:text-slate-700" onClick={() => requestSort('dateAdded')}>
                                        <div className="flex items-center gap-1">Date <ArrowUpDown size={12} /></div>
                                    </th>
                                    <th className="px-6 py-3 text-right">Salary</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {sortedJobs.map((job) => (
                                    <tr key={job.id} className="group hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-3.5">
                                            <div className="flex items-center gap-3">
                                                <div className="h-8 w-8 rounded-md border border-slate-200 bg-white flex items-center justify-center overflow-hidden shadow-sm">
                                                    <img src={job.logo} alt={job.company} className="h-full w-full object-cover" />
                                                </div>
                                                <span className="font-medium text-slate-800">{job.company}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-3.5 text-slate-700">{job.role}</td>
                                        <td className="px-6 py-3.5">
                                            <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-medium border ${STATUS_COLORS[job.status]}`}>
                                                {job.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-3.5 tabular-nums text-slate-500 group-hover:text-slate-600">
                                            {new Date(job.dateAdded).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </td>
                                        <td className="px-6 py-3.5 text-right tabular-nums text-slate-700 font-medium">
                                            {job.salary}
                                        </td>
                                    </tr>
                                ))}
                                {sortedJobs.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-slate-400 italic">
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

export default DashboardView;
