'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { Job, Status, Toast, ToastType } from '@/types';

interface JobsContextType {
    jobs: Job[];
    loading: boolean;
    toasts: Toast[];
    currentView: 'dashboard' | 'kanban' | 'list';
    setCurrentView: (view: 'dashboard' | 'kanban' | 'list') => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    filteredJobs: Job[];
    addToast: (message: string, type?: ToastType) => void;
    removeToast: (id: string) => void;
    addJob: (jobData: Omit<Job, 'id' | 'logo' | 'tags'> & { tags: string }) => Promise<void>;
    updateJob: (id: string, jobData: Partial<Job>) => Promise<void>;
    deleteJob: (id: string) => Promise<void>;
    moveJobStatus: (id: string, newStatus: Status) => Promise<void>;
}

const JobsContext = createContext<JobsContextType | undefined>(undefined);

export function JobsProvider({ children }: { children: React.ReactNode }) {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [toasts, setToasts] = useState<Toast[]>([]);
    const [currentView, setCurrentView] = useState<'dashboard' | 'kanban' | 'list'>('dashboard');
    const [searchQuery, setSearchQuery] = useState('');

    // Toast Helper
    const addToast = useCallback((message: string, type: ToastType = 'info') => {
        const id = Math.random().toString(36).substr(2, 9);
        setToasts(prev => [...prev, { id, message, type }]);
    }, []);

    const removeToast = useCallback((id: string) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    // Fetch Jobs
    const fetchJobs = useCallback(async () => {
        try {
            const res = await fetch('/api/applications');
            if (!res.ok) throw new Error('Failed to fetch');
            const data = await res.json();

            // Transform backend data to frontend model
            const mappedJobs: Job[] = data.map((app: any) => ({
                id: app._id,
                company: app.company,
                role: app.role, // Matches backend 'role'
                location: app.location || 'Remote',
                salary: app.salary || 'N/A', // Matches backend 'salary'
                status: app.status as Status,
                dateAdded: app.dateAdded, // Matches backend 'dateAdded'
                logo: app.logo || `https://ui-avatars.com/api/?name=${encodeURIComponent(app.company)}&background=random`,
                tags: Array.isArray(app.tags) ? app.tags : [],
                link: app.link,
                notes: app.notes
            }));

            setJobs(mappedJobs);
        } catch (error) {
            console.error('Failed to fetch jobs', error);
            // Don't toast on initial load failure to avoid spam, or handle gracefully
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchJobs();
    }, [fetchJobs]);

    // Actions
    const addJob = async (jobData: Omit<Job, 'id' | 'logo' | 'tags'> & { tags: string }) => {
        try {
            const payload = {
                company: jobData.company,
                position: jobData.role,
                location: jobData.location,
                salaryRange: jobData.salary, // Route expects salaryRange -> maps to salary
                status: jobData.status,
                dateApplied: jobData.dateAdded, // Route expects dateApplied -> maps to dateAdded
                tags: jobData.tags.split(',').map(t => t.trim()).filter(Boolean),
                link: jobData.link,
                notes: jobData.notes
            };

            const res = await fetch('/api/applications', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!res.ok) {
                const errorText = await res.text();
                console.error('Failed to create job:', errorText);
                throw new Error(errorText || 'Failed to create');
            }

            await fetchJobs();
            addToast(`Applied to ${jobData.company}`, 'success');
        } catch (error) {
            console.error('Job creation error:', error);
            addToast('Failed to add application', 'error');
        }
    };

    const updateJob = async (id: string, jobData: Partial<Job>) => {
        try {
            const payload: any = {};
            if (jobData.company) payload.company = jobData.company;
            if (jobData.role) payload.position = jobData.role; // Map to route expected 'position'
            if (jobData.location) payload.location = jobData.location;
            if (jobData.salary) payload.salaryRange = jobData.salary; // Map to 'salaryRange'
            if (jobData.status) payload.status = jobData.status;
            if (jobData.tags) payload.tags = jobData.tags;
            if (jobData.dateAdded) payload.dateApplied = jobData.dateAdded;

            const res = await fetch(`/api/applications/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!res.ok) throw new Error('Failed to update');

            setJobs(prev => prev.map(j => j.id === id ? { ...j, ...jobData } : j));
            addToast('Application updated', 'success');
        } catch (error) {
            addToast('Failed to update application', 'error');
        }
    };

    const moveJobStatus = async (id: string, newStatus: Status) => {
        // Optimistic update
        const job = jobs.find(j => j.id === id);
        if (!job) return;

        setJobs(prev => prev.map(j => j.id === id ? { ...j, status: newStatus } : j));

        try {
            const res = await fetch(`/api/applications/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });
            if (!res.ok) throw new Error('Failed to update status');
            addToast(`Moved ${job.company} to ${newStatus}`, 'info');
        } catch (error) {
            // Revert on failure
            setJobs(prev => prev.map(j => j.id === id ? { ...j, status: job.status } : j));
            addToast('Failed to move application', 'error');
        }
    };

    const deleteJob = async (id: string) => {
        const job = jobs.find(j => j.id === id);
        try {
            const res = await fetch(`/api/applications/${id}`, {
                method: 'DELETE'
            });
            if (!res.ok) throw new Error('Failed to delete');

            setJobs(prev => prev.filter(j => j.id !== id));
            if (job) addToast(`Removed ${job.company}`, 'info');
        } catch (error) {
            addToast('Failed to delete application', 'error');
        }
    };

    const filteredJobs = useMemo(() => {
        if (!searchQuery) return jobs;
        const lowerQuery = searchQuery.toLowerCase();
        return jobs.filter(job =>
            job.company.toLowerCase().includes(lowerQuery) ||
            job.role.toLowerCase().includes(lowerQuery) ||
            job.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
        );
    }, [jobs, searchQuery]);

    return (
        <JobsContext.Provider value={{
            jobs,
            loading,
            toasts,
            currentView,
            setCurrentView,
            searchQuery,
            setSearchQuery,
            filteredJobs,
            addToast,
            removeToast,
            addJob,
            updateJob,
            deleteJob,
            moveJobStatus
        }}>
            {children}
        </JobsContext.Provider>
    );
}

export function useJobs() {
    const context = useContext(JobsContext);
    if (context === undefined) {
        throw new Error('useJobs must be used within a JobsProvider');
    }
    return context;
}
