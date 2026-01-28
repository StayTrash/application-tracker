'use client';

import React from 'react';
import Dashboard from '@/components/linear/Dashboard';
import { DashboardSkeleton } from '@/components/linear/Skeleton';
import { useDashboard } from '@/lib/context/DashboardContext';

export default function DashboardPage() {
    const { filteredJobs, loading, jobs, openAddModal } = useDashboard();

    const isInitialLoading = loading && jobs.length === 0;

    if (isInitialLoading) {
        return <DashboardSkeleton />;
    }

    return (
        <Dashboard
            jobs={filteredJobs}
            onAddJob={openAddModal}
        />
    );
}
