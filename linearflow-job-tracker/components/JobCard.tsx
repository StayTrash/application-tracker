import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Banknote, Calendar, Trash2, Pencil } from 'lucide-react';
import { Job } from '../types';
import { STATUS_COLORS } from '../constants';

interface JobCardProps {
  job: Job;
  isCompact?: boolean;
  onDragStart?: (e: React.DragEvent<HTMLDivElement>, id: string) => void;
  onDelete?: (id: string) => void;
  onEdit?: (job: Job) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, isCompact = false, onDragStart, onDelete, onEdit }) => {
  return (
    <motion.div
      layoutId={job.id}
      layout
      draggable={!!onDragStart}
      onDragStart={(e) => onDragStart?.(e as unknown as React.DragEvent<HTMLDivElement>, job.id)}
      whileHover={{ 
        scale: 1.02,
        y: -2,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)",
        zIndex: 10
      }}
      whileDrag={{ scale: 1.05, opacity: 0.8, cursor: 'grabbing' }}
      className={`
        relative group overflow-hidden
        rounded-xl border border-zinc-800/50 
        bg-gradient-card backdrop-blur-sm
        ${isCompact ? 'p-3' : 'p-4'}
        hover:border-zinc-700/80 transition-colors duration-300
        cursor-grab active:cursor-grabbing
      `}
    >
      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-noise pointer-events-none" />
      
      {/* Shine effect */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Action Buttons (visible on hover) */}
      {!isCompact && (
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2 z-20">
          {onEdit && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onEdit(job);
              }}
              className="p-1.5 rounded-md bg-zinc-900/90 border border-zinc-700/50 text-zinc-500 hover:text-indigo-400 hover:border-indigo-500/30 transition-colors backdrop-blur-md"
              title="Edit Application"
            >
              <Pencil size={12} />
            </button>
          )}
          {onDelete && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onDelete(job.id);
              }}
              className="p-1.5 rounded-md bg-zinc-900/90 border border-zinc-700/50 text-zinc-500 hover:text-red-400 hover:border-red-500/30 transition-colors backdrop-blur-md"
              title="Delete Application"
            >
              <Trash2 size={12} />
            </button>
          )}
        </div>
      )}

      <div className="relative z-10 flex flex-col gap-3">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex gap-3">
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-zinc-700/50 bg-zinc-900 shadow-inner">
              <img 
                src={job.logo} 
                alt={`${job.company} logo`} 
                className="h-full w-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
              />
            </div>
            <div>
              <h3 className="font-medium text-zinc-100 leading-tight group-hover:text-indigo-400 transition-colors">
                {job.role}
              </h3>
              <p className="text-sm text-zinc-500 font-light">{job.company}</p>
            </div>
          </div>
          
          {/* Status Badge */}
          <div className={`
            px-2 py-0.5 rounded-full text-[10px] font-medium tracking-wide uppercase border
            ${STATUS_COLORS[job.status]}
            ${!isCompact ? 'group-hover:opacity-0 transition-opacity duration-200' : ''}
          `}>
            {job.status}
          </div>
        </div>

        {/* Metadata */}
        <div className="grid grid-cols-2 gap-y-2 text-xs text-zinc-400">
          <div className="flex items-center gap-1.5">
            <MapPin size={12} className="text-zinc-600" />
            <span className="truncate">{job.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Banknote size={12} className="text-zinc-600" />
            <span className="tabular-nums">{job.salary}</span>
          </div>
          <div className="flex items-center gap-1.5 col-span-2">
            <Calendar size={12} className="text-zinc-600" />
            <span className="text-zinc-500">Applied </span>
            <span className="tabular-nums text-zinc-300">{job.dateAdded}</span>
          </div>
        </div>

        {/* Tags */}
        {!isCompact && (
          <div className="flex flex-wrap gap-1.5 mt-1">
            {job.tags.map((tag) => (
              <span 
                key={tag} 
                className="px-2 py-0.5 rounded-md bg-zinc-800/50 border border-zinc-700/30 text-[10px] text-zinc-400 group-hover:bg-zinc-800 group-hover:text-zinc-300 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default JobCard;