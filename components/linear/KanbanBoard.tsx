'use client';

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { COLUMNS } from '@/constants';
import { Job, Status } from '@/types';
import JobCard from './JobCard';

interface KanbanBoardProps {
    jobs: Job[];
    onAddJob: () => void;
    onEditJob: (job: Job) => void;
    onStatusChange: (id: string, newStatus: Status) => void;
    onDeleteJob: (id: string) => void;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ jobs, onAddJob, onEditJob, onStatusChange, onDeleteJob }) => {
    const [draggedJobId, setDraggedJobId] = useState<string | null>(null);
    const [activeColumn, setActiveColumn] = useState<Status | null>(null);

    const handleDragStart = (e: React.DragEvent, id: string) => {
        setDraggedJobId(id);
        // Required for Firefox
        e.dataTransfer.effectAllowed = 'move';
        // Set data for transparency
        e.dataTransfer.setData('text/plain', id);
    };

    const handleDragOver = (e: React.DragEvent, status: Status) => {
        e.preventDefault();
        if (activeColumn !== status) {
            setActiveColumn(status);
        }
    };

    const handleDrop = (e: React.DragEvent, status: Status) => {
        e.preventDefault();
        const id = e.dataTransfer.getData('text/plain');
        if (id) {
            onStatusChange(id, status);
        }
        setDraggedJobId(null);
        setActiveColumn(null);
    };

    const handleDragLeave = () => {
        setActiveColumn(null);
    };

    return (
        <div className="h-full flex flex-col overflow-hidden">
            {/* Board Header Actions */}
            <div className="h-16 shrink-0 flex items-center justify-between px-8 border-b border-zinc-800/50 backdrop-blur-sm bg-zinc-950/50 z-20">
                <div className="flex items-center gap-4">
                    <h2 className="text-sm font-medium text-zinc-300">Active Board</h2>
                    <span className="h-4 w-px bg-zinc-800" />
                    <div className="flex -space-x-2">
                        <div className="h-6 w-6 rounded-full border border-zinc-900 bg-zinc-800 flex items-center justify-center text-[10px]">A</div>
                        <div className="h-6 w-6 rounded-full border border-zinc-900 bg-indigo-900 flex items-center justify-center text-[10px]">You</div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="text-xs text-zinc-500">Synced just now</div>
                    <button
                        onClick={onAddJob}
                        className="flex items-center justify-center h-8 w-8 rounded-md bg-zinc-100 hover:bg-white text-zinc-950 transition-colors shadow-lg shadow-zinc-100/10"
                    >
                        <Plus size={16} />
                    </button>
                </div>
            </div>

            {/* Columns Container */}
            <div className="flex-1 overflow-x-auto overflow-y-hidden">
                <div className="h-full flex px-8 py-6 gap-6 min-w-max">

                    {COLUMNS.map((col) => {
                        const colJobs = jobs.filter(j => j.status === col.id);
                        const isActive = activeColumn === col.id;

                        return (
                            <div
                                key={col.id}
                                className={`
                        w-[340px] flex flex-col h-full rounded-2xl transition-colors duration-200
                        ${isActive ? 'bg-zinc-900/40 ring-1 ring-zinc-700/50' : 'bg-transparent'}
                    `}
                                onDragOver={(e) => handleDragOver(e, col.id)}
                                onDrop={(e) => handleDrop(e, col.id)}
                                onDragLeave={handleDragLeave}
                            >
                                {/* Column Header */}
                                <div className="flex items-center justify-between mb-4 px-3 mt-2">
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-sm font-medium text-zinc-200">{col.title}</h3>
                                        <span className="px-1.5 py-0.5 rounded text-[10px] bg-zinc-800 text-zinc-400 tabular-nums">
                                            {colJobs.length}
                                        </span>
                                    </div>
                                    <button
                                        onClick={onAddJob}
                                        className="text-zinc-600 hover:text-zinc-400 transition-colors"
                                    >
                                        <Plus size={14} />
                                    </button>
                                </div>

                                {/* Drop Area / List */}
                                <div className="flex-1 overflow-y-auto px-2 space-y-3 pb-4 custom-scrollbar">
                                    {colJobs.map(job => (
                                        <JobCard
                                            key={job.id}
                                            job={job}
                                            onDragStart={handleDragStart}
                                            onDelete={onDeleteJob}
                                            onEdit={onEditJob}
                                        />
                                    ))}

                                    {/* Empty State / Dropzone visual */}
                                    {colJobs.length === 0 && (
                                        <div className="h-24 rounded-xl border border-dashed border-zinc-800/50 flex items-center justify-center opacity-50">
                                            <span className="text-xs text-zinc-600">Drop to move</span>
                                        </div>
                                    )}
                                    {/* Invisible spacer for drop target at bottom */}
                                    <div className="h-10 w-full" />
                                </div>
                            </div>
                        );
                    })}

                </div>
            </div>
        </div>
    );
};

export default KanbanBoard;
