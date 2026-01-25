'use client';

import React, { useMemo, useState } from 'react';
import { Job } from '@/types';
import { STATUS_COLORS } from '@/constants';
import { ArrowUpDown, Filter, Download, Plus, Pencil, Trash2, Calendar as CalendarIcon, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { DateRange } from 'react-day-picker';
import { format, isWithinInterval, startOfDay, endOfDay } from 'date-fns';
import { cn } from '@/lib/utils';

interface JobsListProps {
    jobs: Job[];
    onAddJob: () => void;
    onEditJob: (job: Job) => void;
    onDeleteJob: (id: string) => void;
}

const JobsList: React.FC<JobsListProps> = ({ jobs, onAddJob, onEditJob, onDeleteJob }) => {
    const [sortConfig, setSortConfig] = useState<{ key: keyof Job; direction: 'asc' | 'desc' } | null>(null);
    const [dateRange, setDateRange] = useState<DateRange | undefined>();

    const filteredJobs = useMemo(() => {
        let filtered = [...jobs];

        // Date Filter
        if (dateRange?.from) {
            filtered = filtered.filter(job => {
                const jobDate = new Date(job.dateAdded);
                if (!dateRange.to) {
                    return jobDate >= startOfDay(dateRange.from!) && jobDate <= endOfDay(dateRange.from!);
                }
                return isWithinInterval(jobDate, {
                    start: startOfDay(dateRange.from!),
                    end: endOfDay(dateRange.to!)
                });
            });
        }

        return filtered;
    }, [jobs, dateRange]);

    const sortedJobs = useMemo(() => {
        let sortableJobs = [...filteredJobs];
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
    }, [filteredJobs, sortConfig]);

    const requestSort = (key: keyof Job) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    return (
        <div className="h-full flex flex-col bg-zinc-950/50">
            {/* Toolbar */}
            <div className="h-16 shrink-0 flex items-center justify-between px-8 border-b border-zinc-800/50 backdrop-blur-sm">
                <div className="flex items-center gap-4">
                    <h2 className="text-sm font-medium text-zinc-300">All Applications</h2>
                    <span className="h-4 w-px bg-zinc-800" />
                    <span className="text-xs text-zinc-500 tabular-nums">{filteredJobs.length} records</span>
                </div>
                <div className="flex items-center gap-3">
                    <Popover>
                        <PopoverTrigger asChild>
                            <button className={cn(
                                "flex items-center gap-2 px-3 py-1.5 rounded-md border text-xs font-medium transition-colors",
                                dateRange ? "bg-indigo-500/10 border-indigo-500/50 text-indigo-400" : "border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700"
                            )}>
                                <Filter size={14} />
                                {dateRange?.from ? (
                                    dateRange.to ? (
                                        <>
                                            {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                                        </>
                                    ) : (
                                        format(dateRange.from, "LLL dd, y")
                                    )
                                ) : (
                                    "Filter Date"
                                )}
                            </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-4 bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl shadow-black/50 min-w-[340px]" align="end">
                            <Calendar
                                initialFocus
                                mode="range"
                                defaultMonth={dateRange?.from}
                                selected={dateRange}
                                onSelect={setDateRange}
                                numberOfMonths={2}
                                className="p-4"
                            />
                            {dateRange && (
                                <div className="p-3 border-t border-zinc-800/50 bg-zinc-900/30 flex justify-end">
                                    <button
                                        onClick={() => setDateRange(undefined)}
                                        className="text-xs text-zinc-400 hover:text-white transition-colors"
                                    >
                                        Clear Filter
                                    </button>
                                </div>
                            )}
                        </PopoverContent>
                    </Popover>
                    <button className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-zinc-800 bg-zinc-900 text-xs font-medium text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 transition-colors">
                        <Download size={14} /> Export
                    </button>
                    <button
                        onClick={onAddJob}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium shadow-lg shadow-indigo-900/20 transition-all border border-indigo-500/50"
                    >
                        <Plus size={14} /> New Application
                    </button>
                </div>
            </div>

            {/* Table Container */}
            <div className="flex-1 overflow-auto custom-scrollbar">
                <table className="w-full text-left text-sm text-zinc-400">
                    <thead className="bg-zinc-900/50 text-xs uppercase font-medium text-zinc-500 sticky top-0 z-10 backdrop-blur-md">
                        <tr>
                            <th className="px-8 py-4 w-12 text-center text-zinc-600">#</th>
                            <th className="px-4 py-4 cursor-pointer hover:text-zinc-300 transition-colors" onClick={() => requestSort('company')}>
                                <div className="flex items-center gap-2">Company <ArrowUpDown size={12} className="opacity-50" /></div>
                            </th>
                            <th className="px-4 py-4 cursor-pointer hover:text-zinc-300 transition-colors" onClick={() => requestSort('role')}>
                                <div className="flex items-center gap-2">Role <ArrowUpDown size={12} className="opacity-50" /></div>
                            </th>
                            <th className="px-4 py-4 cursor-pointer hover:text-zinc-300 transition-colors" onClick={() => requestSort('location')}>
                                <div className="flex items-center gap-2">Location <ArrowUpDown size={12} className="opacity-50" /></div>
                            </th>
                            <th className="px-4 py-4 cursor-pointer hover:text-zinc-300 transition-colors" onClick={() => requestSort('status')}>
                                <div className="flex items-center gap-2">Status <ArrowUpDown size={12} className="opacity-50" /></div>
                            </th>
                            <th className="px-4 py-4 cursor-pointer hover:text-zinc-300 transition-colors" onClick={() => requestSort('dateAdded')}>
                                <div className="flex items-center gap-2">Applied Date <ArrowUpDown size={12} className="opacity-50" /></div>
                            </th>
                            <th className="px-4 py-4 text-right">Salary</th>
                            <th className="px-8 py-4 w-12"></th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {sortedJobs.map((job, index) => (
                            <tr
                                key={job.id}
                                className="group hover:bg-zinc-900/60 transition-colors border-b border-zinc-800/30 last:border-0"
                            >
                                <td className="px-8 py-4 text-center text-zinc-600 text-xs font-mono">
                                    {(index + 1).toString().padStart(2, '0')}
                                </td>
                                <td className="px-4 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-6 w-6 rounded border border-zinc-800 bg-zinc-900 flex items-center justify-center overflow-hidden">
                                            <img src={job.logo} alt={job.company} className="h-full w-full object-cover opacity-80" />
                                        </div>
                                        <span className="font-medium text-zinc-200">{job.company}</span>
                                    </div>
                                </td>
                                <td className="px-4 py-4 text-zinc-300 font-medium">{job.role}</td>
                                <td className="px-4 py-4 text-zinc-500">{job.location}</td>
                                <td className="px-4 py-4">
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] uppercase font-bold tracking-wider border ${STATUS_COLORS[job.status]}`}>
                                        {job.status}
                                    </span>
                                </td>
                                <td className="px-4 py-4 tabular-nums text-zinc-500 group-hover:text-zinc-400">
                                    {new Date(job.dateAdded).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </td>
                                <td className="px-4 py-4 text-right tabular-nums text-zinc-300 font-medium">
                                    {job.salary}
                                </td>
                                <td className="px-8 py-4 text-right">
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex justify-end gap-2">
                                        <button
                                            onClick={() => onEditJob(job)}
                                            className="p-1.5 text-zinc-500 hover:text-indigo-400 hover:bg-indigo-500/10 rounded transition-colors"
                                            title="Edit"
                                        >
                                            <Pencil size={14} />
                                        </button>
                                        <button
                                            onClick={() => onDeleteJob(job.id)}
                                            className="p-1.5 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors"
                                            title="Delete"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {sortedJobs.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-64 text-zinc-500">
                        <p>No applications found.</p>
                        <button onClick={onAddJob} className="mt-4 text-indigo-400 hover:text-indigo-300 text-sm">Add your first job</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default JobsList;
