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

    // Refs for auto-scrolling
    const scrollContainerRef = React.useRef<HTMLDivElement>(null);
    const scrollFrameRef = React.useRef<number | null>(null);
    const scrollDirectionRef = React.useRef<'left' | 'right' | null>(null);

    const handleDragStart = (e: React.DragEvent, id: string) => {
        setDraggedJobId(id);
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', id);
    };

    const performAutoScroll = () => {
        const container = scrollContainerRef.current;
        if (!container || !scrollDirectionRef.current) return;

        const scrollAmount = 12;

        if (scrollDirectionRef.current === 'right') {
            container.scrollLeft += scrollAmount;
        } else {
            container.scrollLeft -= scrollAmount;
        }

        scrollFrameRef.current = requestAnimationFrame(performAutoScroll);
    };

    const checkForAutoScroll = (e: React.DragEvent) => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const { left, right } = container.getBoundingClientRect();
        const mouseX = e.clientX;
        const threshold = 150;

        let direction: 'left' | 'right' | null = null;
        if (mouseX > right - threshold) direction = 'right';
        else if (mouseX < left + threshold) direction = 'left';

        if (direction !== scrollDirectionRef.current) {
            scrollDirectionRef.current = direction;

            if (scrollFrameRef.current) {
                cancelAnimationFrame(scrollFrameRef.current);
                scrollFrameRef.current = null;
            }

            if (direction) {
                performAutoScroll();
            }
        }
    };

    const stopAutoScroll = () => {
        if (scrollFrameRef.current) {
            cancelAnimationFrame(scrollFrameRef.current);
            scrollFrameRef.current = null;
        }
        scrollDirectionRef.current = null;
    };

    const handleContainerDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        checkForAutoScroll(e);
    };

    const handleDragOver = (e: React.DragEvent, status: Status) => {
        e.preventDefault();
        if (activeColumn !== status) {
            setActiveColumn(status);
        }
    };

    const handleDrop = (e: React.DragEvent, status: Status) => {
        e.preventDefault();
        stopAutoScroll();
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

    const handleDragEnd = () => {
        stopAutoScroll();
        setDraggedJobId(null);
        setActiveColumn(null);
    };

    return (
        <div className="h-full flex flex-col overflow-hidden bg-slate-50">
            {/* Board Header Actions */}
            <div className="h-16 shrink-0 flex items-center justify-between px-8 border-b border-slate-200 backdrop-blur-sm bg-white/80 z-20 shadow-sm">
                <div className="flex items-center gap-4">
                    <h2 className="text-sm font-medium text-slate-700">Active Board</h2>
                    <span className="h-4 w-px bg-slate-200" />
                    <div className="flex -space-x-2">
                        <div className="h-6 w-6 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] text-slate-600 shadow-sm">A</div>
                        <div className="h-6 w-6 rounded-full border-2 border-white bg-indigo-100 text-indigo-600 flex items-center justify-center text-[10px] shadow-sm">You</div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="text-xs text-slate-500">Synced just now</div>
                    <button
                        onClick={onAddJob}
                        className="flex items-center justify-center h-8 w-8 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors shadow-md shadow-indigo-200"
                    >
                        <Plus size={16} />
                    </button>
                </div>
            </div>

            {/* Columns Container */}
            <div
                ref={scrollContainerRef}
                className="flex-1 overflow-x-auto overflow-y-hidden"
                onDragOver={handleContainerDragOver}
                onDragEnd={handleDragEnd}
                onDragLeave={(e) => {
                    if (e.clientX <= 0 || e.clientX >= window.innerWidth || e.clientY <= 0 || e.clientY >= window.innerHeight) {
                        stopAutoScroll();
                    }
                }}
            >
                <div className="h-full flex px-8 py-6 gap-6 min-w-max">
                    {COLUMNS.map((col) => {
                        const colJobs = jobs.filter(j => j.status === col.id);
                        const isActive = activeColumn === col.id;

                        return (
                            <div
                                key={col.id}
                                className={`
                                    w-[340px] flex flex-col h-full rounded-2xl transition-colors duration-200
                                    ${isActive ? 'bg-indigo-50/50 ring-1 ring-indigo-200' : 'bg-transparent'}
                                `}
                                onDragOver={(e) => handleDragOver(e, col.id)}
                                onDrop={(e) => handleDrop(e, col.id)}
                                onDragLeave={handleDragLeave}
                            >
                                {/* Column Header */}
                                <div className="flex items-center justify-between mb-4 px-3 mt-2">
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-sm font-medium text-slate-700">{col.title}</h3>
                                        <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-200 text-slate-600 tabular-nums font-medium">
                                            {colJobs.length}
                                        </span>
                                    </div>
                                    <button
                                        onClick={onAddJob}
                                        className="text-slate-400 hover:text-slate-600 transition-colors"
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
                                        <div className="h-24 rounded-xl border-2 border-dashed border-slate-200 flex items-center justify-center">
                                            <span className="text-xs text-slate-400">Drop to move</span>
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
