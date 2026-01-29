import { Column, Metric } from '@/types';

export const COLUMNS: Column[] = [
    { id: 'Applied', title: 'Applied', count: 0 },
    { id: 'Screening', title: 'Screening', count: 0 },
    { id: 'Interview', title: 'Interview', count: 0 },
    { id: 'Offer', title: 'Offer', count: 0 },
    { id: 'Rejected', title: 'Rejected', count: 0 },
];

export const STATUS_COLORS: Record<string, string> = {
    Applied: 'border-slate-300 dark:border-zinc-700 text-slate-600 dark:text-zinc-400 bg-slate-100 dark:bg-zinc-400/10',
    Screening: 'border-blue-200 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-400/10',
    Interview: 'border-violet-200 dark:border-violet-500/20 text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-400/10',
    Offer: 'border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-400/10',
    Rejected: 'border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-400/10',
};
