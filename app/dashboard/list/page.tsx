'use client';

import React from 'react';
import JobsList from '@/components/linear/JobsList';
import { JobsListSkeleton } from '@/components/linear/Skeleton';
import { useDashboard } from '@/lib/context/DashboardContext';

export default function ListPage() {
    const { 
        filteredJobs, 
        loading, 
        jobs, 
        openAddModal, 
        openEditModal, 
        handleDeleteJob 
    } = useDashboard();

    const isInitialLoading = loading && jobs.length === 0;

    if (isInitialLoading) {
        return <JobsListSkeleton />;
    }

    return (
        <JobsList
            jobs={filteredJobs}
            onAddJob={openAddModal}
            onEditJob={openEditModal}
            onDeleteJob={handleDeleteJob}
        />
    );
}
