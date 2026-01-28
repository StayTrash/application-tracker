'use client';

import React from 'react';
import { DashboardView } from '@/components/dashboard';
import { DashboardSkeleton } from '@/components/skeletons';
import { useDashboard } from '@/lib/context/DashboardContext';

export default function DashboardPage() {
    const { filteredJobs, loading, jobs, openAddModal } = useDashboard();

    const isInitialLoading = loading && jobs.length === 0;

    if (isInitialLoading) {
        return <DashboardSkeleton />;
    }

    return (
        <DashboardView
            jobs={filteredJobs}
            onAddJob={openAddModal}
        />
    );
}
