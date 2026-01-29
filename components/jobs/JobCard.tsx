'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Banknote, Calendar, Trash2, Pencil } from 'lucide-react';
import { Job } from '@/types';
import { STATUS_COLORS } from '@/constants';

interface JobCardProps {
    job: Job;
    isCompact?: boolean;
    onDragStart?: (e: React.DragEvent<HTMLDivElement>, id: string) => void;
    onDelete?: (id: string) => void;
    onEdit?: (job: Job) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, isCompact = false, onDragStart, onDelete, onEdit }) => {
    return (
        <motion.div
            layoutId={job.id}
            layout
            draggable={!!onDragStart}
            onDragStart={(e) => onDragStart?.(e as unknown as React.DragEvent<HTMLDivElement>, job.id)}
            whileHover={{
                scale: 1.02,
                y: -2,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)",
                zIndex: 10
            }}
            whileDrag={{ scale: 1.05, opacity: 0.9, cursor: 'grabbing' }}
            className={`
                relative group overflow-hidden
                rounded-xl border border-slate-200 
                bg-white shadow-sm
                ${isCompact ? 'p-3' : 'p-4'}
                hover:border-slate-300 hover:shadow-md transition-all duration-300
                cursor-grab active:cursor-grabbing
            `}
        >
            {/* Shine effect */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Action Buttons (visible on hover) */}
            {!isCompact && (
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2 z-20">
                    {onEdit && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onEdit(job);
                            }}
                            className="p-1.5 rounded-md bg-white border border-slate-200 text-slate-400 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 transition-colors shadow-sm"
                            title="Edit Application"
                        >
                            <Pencil size={12} />
                        </button>
                    )}
                    {onDelete && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete(job.id);
                            }}
                            className="p-1.5 rounded-md bg-white border border-slate-200 text-slate-400 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-colors shadow-sm"
                            title="Delete Application"
                        >
                            <Trash2 size={12} />
                        </button>
                    )}
                </div>
            )}

            <div className="relative z-10 flex flex-col gap-3">
                {/* Header */}
                <div className="flex items-start justify-between">
                    <div className="flex gap-3">
                        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
                            <img
                                src={job.logo}
                                alt={`${job.company} logo`}
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <div>
                            <h3 className="font-medium text-slate-800 leading-tight group-hover:text-indigo-600 transition-colors">
                                {job.role}
                            </h3>
                            <p className="text-sm text-slate-500 font-light">{job.company}</p>
                        </div>
                    </div>

                    {/* Status Badge */}
                    <div className={`
                        px-2 py-0.5 rounded-full text-[10px] font-medium tracking-wide uppercase border
                        ${STATUS_COLORS[job.status]}
                        ${!isCompact ? 'group-hover:opacity-0 transition-opacity duration-200' : ''}
                    `}>
                        {job.status}
                    </div>
                </div>

                {/* Metadata */}
                <div className="grid grid-cols-2 gap-y-2 text-xs text-slate-500">
                    <div className="flex items-center gap-1.5">
                        <MapPin size={12} className="text-slate-400" />
                        <span className="truncate">{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Banknote size={12} className="text-slate-400" />
                        <span className="tabular-nums">{job.salary}</span>
                    </div>
                    <div className="flex items-center gap-1.5 col-span-2">
                        <Calendar size={12} className="text-slate-400" />
                        <span className="text-slate-500">Applied </span>
                        <span className="tabular-nums text-slate-700">
                            {new Date(job.dateAdded).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                    </div>
                </div>

                {/* Tags */}
                {!isCompact && (
                    <div className="flex flex-wrap gap-1.5 mt-1">
                        {(() => {
                            const tags = job.tags;
                            const rawTags = Array.isArray(tags)
                                ? tags
                                : typeof tags === 'string'
                                    ? (tags as string).split(',').map(t => t.trim()).filter(Boolean)
                                    : [];

                            const uniqueTags = Array.from(new Set(rawTags));

                            return uniqueTags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-[10px] text-slate-500 group-hover:bg-indigo-50 group-hover:text-indigo-600 group-hover:border-indigo-100 transition-colors"
                                >
                                    {tag}
                                </span>
                            ));
                        })()}
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default JobCard;
