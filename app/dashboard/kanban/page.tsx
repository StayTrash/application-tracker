'use client';

import React from 'react';
import KanbanBoard from '@/components/linear/KanbanBoard';
import { KanbanBoardSkeleton } from '@/components/linear/Skeleton';
import { useDashboard } from '@/lib/context/DashboardContext';

export default function KanbanPage() {
    const { 
        filteredJobs, 
        loading, 
        jobs, 
        openAddModal, 
        openEditModal, 
        handleStatusChange, 
        handleDeleteJob 
    } = useDashboard();

    const isInitialLoading = loading && jobs.length === 0;

    if (isInitialLoading) {
        return <KanbanBoardSkeleton />;
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
