import { Column, Metric } from '@/types';

export const COLUMNS: Column[] = [
    { id: 'Applied', title: 'Applied', count: 0 },
    { id: 'Screening', title: 'Screening', count: 0 },
    { id: 'Interview', title: 'Interview', count: 0 },
    { id: 'Offer', title: 'Offer', count: 0 },
    { id: 'Rejected', title: 'Rejected', count: 0 },
];

export const STATUS_COLORS: Record<string, string> = {
    Applied: 'border-slate-300 text-slate-600 bg-slate-100',
    Screening: 'border-blue-200 text-blue-600 bg-blue-50',
    Interview: 'border-violet-200 text-violet-600 bg-violet-50',
    Offer: 'border-emerald-200 text-emerald-600 bg-emerald-50',
    Rejected: 'border-red-200 text-red-600 bg-red-50',
};
