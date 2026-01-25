'use client';

import React from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { fetchJobs, addJob, updateJob, deleteJob, moveJobStatus } from '@/lib/store/features/jobs/jobsSlice';
import { addToast } from '@/lib/store/features/ui/uiSlice';
import LinearShell from '@/components/linear/LinearShell';
import Dashboard from '@/components/linear/Dashboard';
import KanbanBoard from '@/components/linear/KanbanBoard';
import JobsList from '@/components/linear/JobsList';
import NewJobModal from '@/components/linear/NewJobModal';
// import { Toaster } from 'sonner'; // Using custom Toast component instead of sonner actually

// Wrapper component to consume Redux
const DashboardContent = () => {
    const dispatch = useAppDispatch();
    const { jobs, loading } = useAppSelector(state => state.jobs);
    const { currentView, searchQuery } = useAppSelector(state => state.ui);

    // Initial Fetch
    React.useEffect(() => {
        dispatch(fetchJobs());
    }, [dispatch]);

    // Derived State (Selector logic)
    const filteredJobs = React.useMemo(() => {
        if (!searchQuery) return jobs;
        const lowerQuery = searchQuery.toLowerCase();
        return jobs.filter(job =>
            job.company.toLowerCase().includes(lowerQuery) ||
            job.role.toLowerCase().includes(lowerQuery) ||
            job.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
        );
    }, [jobs, searchQuery]);

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
        if (editingJob) {
            await dispatch(updateJob({
                id: editingJob.id,
                data: {
                    ...jobData,
                    tags: typeof jobData.tags === 'string' ? jobData.tags.split(',').map((t: string) => t.trim()).filter(Boolean) : jobData.tags
                }
            }));
            dispatch(addToast({ message: 'Application updated', type: 'success' }));
        } else {
            // addJob Thunk expects object with tags: string. 
            // Wait, our slice addJob takes: (jobData: ... & { tags: string })
            // NewJobModal passes tags: string usually (if not modified).
            // Let's ensure we match the Thunk signature.
            await dispatch(addJob(jobData));
            dispatch(addToast({ message: `Applied to ${jobData.company}`, type: 'success' }));
        }
        handleCloseModal();
    };

    // Handlers
    const handleDeleteJob = async (id: string) => {
        await dispatch(deleteJob(id));
        dispatch(addToast({ message: 'Application removed', type: 'info' }));
    };

    const handleStatusChange = async (id: string, status: any) => {
        await dispatch(moveJobStatus({ id, status }));
        dispatch(addToast({ message: `Moved to ${status}`, type: 'info' }));
    };

    if (loading && jobs.length === 0) {
        return <div className="flex h-screen items-center justify-center text-zinc-500">Loading workspace...</div>;
    }

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
                    onStatusChange={handleStatusChange}
                    onDeleteJob={handleDeleteJob}
                />
            )}
            {currentView === 'list' && (
                <JobsList
                    jobs={filteredJobs}
                    onAddJob={() => setIsModalOpen(true)}
                    onEditJob={handleEditJob}
                    onDeleteJob={handleDeleteJob}
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
        <DashboardContent />
    );
}
