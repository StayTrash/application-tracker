'use client';

import React from 'react';
import { KanbanBoard } from '@/components/jobs';
import { KanbanSkeleton } from '@/components/skeletons';
import { useDashboard } from '@/lib/context/DashboardContext';

export default function KanbanPage() {
    const { 
        filteredJobs, 
        loading, 
        jobs, 
        openAddModal, 
        openEditModal, 
        handleDeleteJob, 
        handleStatusChange 
    } = useDashboard();

    const isInitialLoading = loading && jobs.length === 0;

    if (isInitialLoading) {
        return <KanbanSkeleton />;
    }

    return (
        <KanbanBoard
            jobs={filteredJobs}
            onAddJob={openAddModal}
            onEditJob={openEditModal}
            onStatusChange={handleStatusChange}
            onDeleteJob={handleDeleteJob}
        />
    );
}
