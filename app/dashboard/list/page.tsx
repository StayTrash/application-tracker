'use client';

import React from 'react';
import { JobsList } from '@/components/jobs';
import { ListSkeleton } from '@/components/skeletons';
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
        return <ListSkeleton />;
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
