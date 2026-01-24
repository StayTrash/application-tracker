import React, { useState, useMemo } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import KanbanBoard from './components/KanbanBoard';
import JobsList from './components/JobsList';
import NewJobModal from './components/NewJobModal';
import { ToastContainer } from './components/Toast';
import { Job, Status, Toast, ToastType } from './types';
import { MOCK_JOBS } from './constants';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'kanban' | 'list'>('dashboard');
  const [jobs, setJobs] = useState<Job[]>(MOCK_JOBS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null); // Track which job is being edited
  const [searchQuery, setSearchQuery] = useState('');
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Toast Helper
  const addToast = (message: string, type: ToastType = 'info') => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Filter Jobs
  const filteredJobs = useMemo(() => {
    if (!searchQuery) return jobs;
    const lowerQuery = searchQuery.toLowerCase();
    return jobs.filter(job => 
        job.company.toLowerCase().includes(lowerQuery) ||
        job.role.toLowerCase().includes(lowerQuery) ||
        job.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  }, [jobs, searchQuery]);

  // Handlers
  const handleEditJob = (job: Job) => {
    setEditingJob(job);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingJob(null);
  };

  const handleSaveJob = (jobData: Omit<Job, 'id' | 'logo' | 'tags'> & { tags: string }) => {
    if (editingJob) {
      // Update Existing Job
      setJobs(prev => prev.map(j => j.id === editingJob.id ? {
        ...j,
        ...jobData,
        tags: jobData.tags.split(',').map(t => t.trim()).filter(Boolean)
      } : j));
      addToast(`Updated ${jobData.company}`, 'success');
    } else {
      // Create New Job
      const newJob: Job = {
          id: Math.random().toString(36).substr(2, 9),
          ...jobData,
          logo: `https://picsum.photos/48/48?random=${Math.floor(Math.random() * 1000)}`,
          tags: jobData.tags.split(',').map(t => t.trim()).filter(Boolean)
      };
      setJobs(prev => [newJob, ...prev]);
      addToast(`Applied to ${newJob.company}`, 'success');
    }
    handleCloseModal();
  };

  const handleStatusChange = (id: string, newStatus: Status) => {
    const job = jobs.find(j => j.id === id);
    if (!job) return;

    setJobs(prev => prev.map(j => 
        j.id === id ? { ...j, status: newStatus } : j
    ));
    addToast(`Moved ${job.company} to ${newStatus}`, 'info');
  };

  const handleDeleteJob = (id: string) => {
    const job = jobs.find(j => j.id === id);
    setJobs(prev => prev.filter(j => j.id !== id));
    if (job) {
        addToast(`Removed ${job.company} application`, 'error');
    }
  };

  return (
    <>
      {/* Global Noise Overlay for Texture */}
      <div className="bg-noise-overlay" />
      
      <Layout 
        currentView={currentView} 
        onViewChange={setCurrentView}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      >
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
      </Layout>

      <NewJobModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        onSave={handleSaveJob}
        initialData={editingJob}
      />

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </>
  );
};

export default App;