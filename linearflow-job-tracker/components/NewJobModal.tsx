import React, { useEffect, useState } from 'react';
import { X, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Status, Job } from '../types';

interface NewJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (job: Omit<Job, 'id' | 'logo' | 'tags'> & { tags: string }) => void;
  initialData?: Job | null;
}

const NewJobModal: React.FC<NewJobModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    location: '',
    salary: '',
    status: 'Applied' as Status,
    dateAdded: new Date().toISOString().split('T')[0],
    tags: ''
  });

  // Effect to populate form when editing or reset when adding
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({
          company: initialData.company,
          role: initialData.role,
          location: initialData.location,
          salary: initialData.salary,
          status: initialData.status,
          dateAdded: initialData.dateAdded,
          tags: initialData.tags.join(', ')
        });
      } else {
        setFormData({
          company: '',
          role: '',
          location: '',
          salary: '',
          status: 'Applied',
          dateAdded: new Date().toISOString().split('T')[0],
          tags: ''
        });
      }
    }
  }, [isOpen, initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          {/* Modal Content - Centered via Flexbox parent */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800/50">
              <h2 className="text-lg font-medium text-zinc-100">
                {initialData ? 'Edit Application' : 'Add Application'}
              </h2>
              <button onClick={onClose} className="text-zinc-500 hover:text-zinc-300 transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              
              <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Company</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Linear"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all"
                      value={formData.company}
                      onChange={e => setFormData({ ...formData, company: e.target.value })}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Role</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Senior Product Designer"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all"
                      value={formData.role}
                      onChange={e => setFormData({ ...formData, role: e.target.value })}
                    />
                  </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                 <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Salary Range</label>
                    <input
                      type="text"
                      placeholder="$120k - $150k"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all"
                      value={formData.salary}
                      onChange={e => setFormData({ ...formData, salary: e.target.value })}
                    />
                 </div>
                 <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Location</label>
                    <input
                      type="text"
                      placeholder="Remote"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all"
                      value={formData.location}
                      onChange={e => setFormData({ ...formData, location: e.target.value })}
                    />
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Status</label>
                    <select
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all appearance-none"
                      value={formData.status}
                      onChange={e => setFormData({ ...formData, status: e.target.value as Status })}
                    >
                      <option value="Applied">Applied</option>
                      <option value="Screening">Screening</option>
                      <option value="Interview">Interview</option>
                      <option value="Offer">Offer</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider flex items-center gap-1">
                        <Calendar size={12} /> Date Applied
                    </label>
                    <input
                      type="date"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all"
                      value={formData.dateAdded}
                      onChange={e => setFormData({ ...formData, dateAdded: e.target.value })}
                    />
                  </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Tags</label>
                <input
                  type="text"
                  placeholder="React, Design, Remote (comma separated)"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all"
                  value={formData.tags}
                  onChange={e => setFormData({ ...formData, tags: e.target.value })}
                />
              </div>

              <div className="pt-4 flex gap-3 border-t border-zinc-800/50 mt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-2.5 rounded-lg border border-zinc-800 text-zinc-400 text-sm font-medium hover:bg-zinc-800/50 hover:text-zinc-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium shadow-lg shadow-indigo-900/20 transition-all"
                >
                  {initialData ? 'Save Changes' : 'Create Application'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default NewJobModal;