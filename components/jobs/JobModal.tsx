'use client';

import React, { useEffect, useState } from 'react';
import { X, Calendar as CalendarIcon, ClipboardPaste, Copy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Status, Job } from '@/types';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface JobModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (job: Omit<Job, 'id' | 'logo' | 'tags'> & { tags: string }) => void;
    initialData?: Job | null;
}

const JobModal: React.FC<JobModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
    const [formData, setFormData] = useState({
        company: '',
        role: '',
        location: '',
        salary: '',
        status: 'Applied' as Status,
        dateAdded: new Date(),
        tags: '',
        link: ''
    });

    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                setFormData({
                    company: initialData.company,
                    role: initialData.role,
                    location: initialData.location,
                    salary: initialData.salary,
                    status: initialData.status,
                    dateAdded: initialData.dateAdded ? new Date(initialData.dateAdded) : new Date(),
                    tags: Array.isArray(initialData.tags) ? initialData.tags.join(', ') : '',
                    link: initialData.link || ''
                });
            } else {
                setFormData({
                    company: '',
                    role: '',
                    location: '',
                    salary: '',
                    status: 'Applied',
                    dateAdded: new Date(),
                    tags: '',
                    link: ''
                });
            }
        }
    }, [isOpen, initialData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            ...formData,
            dateAdded: formData.dateAdded.toISOString()
        });
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-lg bg-white border border-slate-200 rounded-xl shadow-2xl overflow-visible"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                            <h2 className="text-lg font-medium text-slate-800">
                                {initialData ? 'Edit Application' : 'Add Application'}
                            </h2>
                            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-5">
                            <div className="grid grid-cols-2 gap-5">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Company</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. Linear"
                                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
                                        value={formData.company}
                                        onChange={e => setFormData({ ...formData, company: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Role</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. Senior Product Designer"
                                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
                                        value={formData.role}
                                        onChange={e => setFormData({ ...formData, role: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-5">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Salary Range</label>
                                    <input
                                        type="text"
                                        placeholder="$120k - $150k"
                                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
                                        value={formData.salary}
                                        onChange={e => setFormData({ ...formData, salary: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Location</label>
                                    <input
                                        type="text"
                                        placeholder="Remote"
                                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
                                        value={formData.location}
                                        onChange={e => setFormData({ ...formData, location: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-5">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Status</label>
                                    <select
                                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all appearance-none"
                                        value={formData.status}
                                        onChange={e => setFormData({ ...formData, status: e.target.value as Status })}
                                    >
                                        <option value="Applied">Applied</option>
                                        <option value="Screening">Screening</option>
                                        <option value="Interview">Interview</option>
                                        <option value="Offer">Offer</option>
                                        <option value="Rejected">Rejected</option>
                                    </select>
                                </div>

                                <div className="space-y-1.5 flex flex-col">
                                    <label className="text-xs font-medium text-slate-500 uppercase tracking-wider flex items-center gap-1">
                                        Date Applied
                                    </label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <button
                                                type="button"
                                                className={cn(
                                                    "w-full flex items-center justify-start text-left font-normal bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 transition-all hover:bg-slate-50 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100",
                                                    !formData.dateAdded && "text-slate-400"
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4 text-slate-400" />
                                                {formData.dateAdded ? format(formData.dateAdded, "PPP") : <span>Pick a date</span>}
                                            </button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0 bg-white border-slate-200 rounded-2xl overflow-hidden shadow-xl" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={formData.dateAdded}
                                                onSelect={(date) => date && setFormData({ ...formData, dateAdded: date })}
                                                initialFocus
                                                className="p-4 pointer-events-auto"
                                            />
                                            <div className="flex items-center justify-between p-3 border-t border-slate-100 bg-slate-50/50">
                                                <button
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, dateAdded: undefined as any })}
                                                    className="px-3 py-1.5 rounded-full text-[10px] font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-200 transition-colors"
                                                >
                                                    Clear
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, dateAdded: new Date() })}
                                                    className="px-3 py-1.5 rounded-full text-[10px] font-medium text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-all hover:scale-105 active:scale-95"
                                                >
                                                    Today
                                                </button>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Tags</label>
                                <input
                                    type="text"
                                    placeholder="React, Design, Remote (comma separated)"
                                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
                                    value={formData.tags}
                                    onChange={e => setFormData({ ...formData, tags: e.target.value })}
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Job Link</label>
                                <div className="relative">
                                    <input
                                        type="url"
                                        placeholder="https://linkedin.com/jobs/..."
                                        className="w-full bg-white border border-slate-200 rounded-lg pl-3 pr-20 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
                                        value={formData.link}
                                        onChange={e => setFormData({ ...formData, link: e.target.value })}
                                    />
                                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                                        {formData.link && (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    navigator.clipboard.writeText(formData.link);
                                                }}
                                                className="p-1.5 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                                                title="Copy Link"
                                            >
                                                <Copy size={14} />
                                            </button>
                                        )}
                                        <button
                                            type="button"
                                            onClick={async () => {
                                                try {
                                                    const text = await navigator.clipboard.readText();
                                                    if (text) setFormData({ ...formData, link: text });
                                                } catch (err) {
                                                    console.error('Failed to read clipboard', err);
                                                }
                                            }}
                                            className="p-1.5 rounded-md text-indigo-500 hover:text-indigo-700 hover:bg-indigo-50 transition-colors"
                                            title="Paste from Clipboard"
                                        >
                                            <ClipboardPaste size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 flex gap-3 border-t border-slate-100 mt-4">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="flex-1 px-4 py-2.5 rounded-lg border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 hover:text-slate-800 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium shadow-md shadow-indigo-200 transition-all"
                                >
                                    {initialData ? 'Save Changes' : 'Create Application'}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default JobModal;
