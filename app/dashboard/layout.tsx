'use client';

import React from 'react';
import { Shell } from '@/components/layout';
import { JobModal } from '@/components/jobs';
import { DashboardProvider, useDashboard } from '@/lib/context/DashboardContext';

// Inner layout that uses the dashboard context
const DashboardLayoutInner: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isModalOpen, editingJob, closeModal, handleSaveJob } = useDashboard();

    return (
        <Shell>
            {children}
            <JobModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onSave={handleSaveJob}
                initialData={editingJob}
            />
        </Shell>
    );
};

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <DashboardProvider>
            <DashboardLayoutInner>
                {children}
            </DashboardLayoutInner>
        </DashboardProvider>
    );
}
