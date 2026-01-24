import { Column, Metric } from '@/types';

export const COLUMNS: Column[] = [
    { id: 'Applied', title: 'Applied', count: 0 },
    { id: 'Screening', title: 'Screening', count: 0 },
    { id: 'Interview', title: 'Interview', count: 0 },
    { id: 'Offer', title: 'Offer', count: 0 },
    { id: 'Rejected', title: 'Rejected', count: 0 },
];

export const STATUS_COLORS: Record<string, string> = {
    Applied: 'border-zinc-700 text-zinc-400 bg-zinc-400/10',
    Screening: 'border-blue-500/20 text-blue-400 bg-blue-400/10',
    Interview: 'border-violet-500/20 text-violet-400 bg-violet-400/10',
    Offer: 'border-emerald-500/20 text-emerald-400 bg-emerald-400/10',
    Rejected: 'border-red-500/20 text-red-400 bg-red-400/10',
};
