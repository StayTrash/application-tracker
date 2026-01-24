'use client';

import React from 'react';
import { JobsProvider, useJobs } from '@/context/JobsContext';
import LinearShell from '@/components/linear/LinearShell';
import Dashboard from '@/components/linear/Dashboard';
import KanbanBoard from '@/components/linear/KanbanBoard';
import JobsList from '@/components/linear/JobsList';
import NewJobModal from '@/components/linear/NewJobModal';
// import { Toaster } from 'sonner'; // Using custom Toast component instead of sonner actually

// Wrapper component to consume context
const DashboardContent = () => {
    const {
        currentView,
        filteredJobs,
        addJob,
        updateJob,
        deleteJob,
        moveJobStatus
    } = useJobs();

    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [editingJob, setEditingJob] = React.useState<any>(null);

    const handleEditJob = (job: any) => {
        setEditingJob(job);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingJob(null);
    };

    const handleSaveJob = async (jobData: any) => {
        // Ensure tags are always passed as string since API/Context expects processing (or if context expects string, pass string).
        // Wait, Context addJob expects { tags: string }. 
        // updateJob expects Partial<Job>. Job has tags: string[].
        // NewJobModal returns { tags: string }.

        const processedData = {
            ...jobData,
            tags: jobData.tags // Keep as string for addJob (Context handles it)
        };

        if (editingJob) {
            // For update, context updateJob takes Partial<Job> where tags is string[]
            // But if we pass string, it might fail if context doesn't handle it.
            // Let's check Context updateJob. It assigns to payload directly.
            // payload.tags = jobData.tags.
            // If we send string here, payload.tags = string.
            // We should split it here for consistency if updating local state directly.
            // BUT, context updateJob: 
            // if (jobData.tags) payload.tags = jobData.tags;
            // setJobs(prev => prev.map(j => j.id === id ? { ...j, ...jobData } : j));

            // So if we pass string, local state gets string -> Crash.
            // API payload? API might handle array or string? API expects array likely if schema is [String].
            // Schema has `tags: { type: [String] }` so Mongoose handles casting if array. If string "a,b", Mongoose might cast to ["a,b"] or fail.

            // Correct fix: Convert string to array for updateJob.
            await updateJob(editingJob.id, {
                ...jobData,
                tags: typeof jobData.tags === 'string' ? jobData.tags.split(',').map((t: string) => t.trim()).filter(Boolean) : jobData.tags
            });
        } else {
            // addJob expects { tags: string } in signature `addJob: (jobData: ... & { tags: string })`.
            await addJob(jobData);
        }
        handleCloseModal();
    };

    return (
        <LinearShell>
            {currentView === 'dashboard' && (
                <Dashboard
                    jobs={filteredJobs}
                    onAddJob={() => setIsModalOpen(true)}
                />
            )}
            {currentView === 'kanban' && (
                <KanbanBoard
                    jobs={filteredJobs}
                    onAddJob={() => setIsModalOpen(true)}
                    onEditJob={handleEditJob}
                    onStatusChange={moveJobStatus}
                    onDeleteJob={deleteJob}
                />
            )}
            {currentView === 'list' && (
                <JobsList
                    jobs={filteredJobs}
                    onAddJob={() => setIsModalOpen(true)}
                    onEditJob={handleEditJob}
                    onDeleteJob={deleteJob}
                />
            )}

            <NewJobModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSave={handleSaveJob}
                initialData={editingJob}
            />
        </LinearShell>
    );
};

export default function DashboardPage() {
    return (
        <JobsProvider>
            <DashboardContent />
        </JobsProvider>
    );
}
