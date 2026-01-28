'use client';

import React from 'react';
import LinearShell from '@/components/linear/LinearShell';
import NewJobModal from '@/components/linear/NewJobModal';
import { DashboardProvider, useDashboard } from '@/lib/context/DashboardContext';

// Inner layout that uses the dashboard context
const DashboardLayoutInner: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isModalOpen, editingJob, closeModal, handleSaveJob } = useDashboard();

    return (
        <LinearShell>
            {children}
            <NewJobModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onSave={handleSaveJob}
                initialData={editingJob}
            />
        </LinearShell>
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
