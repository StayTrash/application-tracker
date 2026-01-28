'use client';

import React, { createContext, useContext, useState, useMemo, useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { fetchJobs, addJob, updateJob, deleteJob, moveJobStatus } from '@/lib/store/features/jobs/jobsSlice';
import { addToast } from '@/lib/store/features/ui/uiSlice';
import { Job, Status } from '@/types';

interface DashboardContextType {
    jobs: Job[];
    filteredJobs: Job[];
    loading: boolean;
    isModalOpen: boolean;
    editingJob: Job | null;
    openAddModal: () => void;
    openEditModal: (job: Job) => void;
    closeModal: () => void;
    handleSaveJob: (jobData: any) => Promise<void>;
    handleDeleteJob: (id: string) => Promise<void>;
    handleStatusChange: (id: string, status: Status) => Promise<void>;
}

const DashboardContext = createContext<DashboardContextType | null>(null);

export const useDashboard = () => {
    const context = useContext(DashboardContext);
    if (!context) {
        throw new Error('useDashboard must be used within DashboardProvider');
    }
    return context;
};

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const dispatch = useAppDispatch();
    const { jobs, loading } = useAppSelector(state => state.jobs);
    const { searchQuery } = useAppSelector(state => state.ui);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingJob, setEditingJob] = useState<Job | null>(null);

    // Initial Fetch
    useEffect(() => {
        dispatch(fetchJobs());
    }, [dispatch]);

    // Filtered jobs based on search
    const filteredJobs = useMemo(() => {
        if (!searchQuery) return jobs;
        const lowerQuery = searchQuery.toLowerCase();
        return jobs.filter(job =>
            job.company.toLowerCase().includes(lowerQuery) ||
            job.role.toLowerCase().includes(lowerQuery) ||
            job.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
        );
    }, [jobs, searchQuery]);

    const openAddModal = useCallback(() => {
        setEditingJob(null);
        setIsModalOpen(true);
    }, []);

    const openEditModal = useCallback((job: Job) => {
        setEditingJob(job);
        setIsModalOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsModalOpen(false);
        setEditingJob(null);
    }, []);

    const handleSaveJob = useCallback(async (jobData: any) => {
        if (editingJob) {
            await dispatch(updateJob({
                id: editingJob.id,
                data: {
                    ...jobData,
                    tags: typeof jobData.tags === 'string' 
                        ? jobData.tags.split(',').map((t: string) => t.trim()).filter(Boolean) 
                        : jobData.tags
                }
            }));
            dispatch(addToast({ message: 'Application updated', type: 'success' }));
        } else {
            await dispatch(addJob(jobData));
            dispatch(addToast({ message: `Applied to ${jobData.company}`, type: 'success' }));
        }
        closeModal();
    }, [dispatch, editingJob, closeModal]);

    const handleDeleteJob = useCallback(async (id: string) => {
        await dispatch(deleteJob(id));
        dispatch(addToast({ message: 'Application removed', type: 'info' }));
    }, [dispatch]);

    const handleStatusChange = useCallback(async (id: string, status: Status) => {
        await dispatch(moveJobStatus({ id, status }));
        dispatch(addToast({ message: `Moved to ${status}`, type: 'info' }));
    }, [dispatch]);

    const value = useMemo(() => ({
        jobs,
        filteredJobs,
        loading,
        isModalOpen,
        editingJob,
        openAddModal,
        openEditModal,
        closeModal,
        handleSaveJob,
        handleDeleteJob,
        handleStatusChange,
    }), [
        jobs,
        filteredJobs,
        loading,
        isModalOpen,
        editingJob,
        openAddModal,
        openEditModal,
        closeModal,
        handleSaveJob,
        handleDeleteJob,
        handleStatusChange,
    ]);

    return (
        <DashboardContext.Provider value={value}>
            {children}
        </DashboardContext.Provider>
    );
};
