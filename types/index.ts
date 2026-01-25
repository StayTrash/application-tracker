export type Status = 'Applied' | 'Screening' | 'Interview' | 'Offer' | 'Rejected';

export interface Job {
    id: string; // Mapped from _id
    company: string;
    role: string; // Mapped from position
    location: string;
    salary: string; // Mapped from salaryRange
    status: Status;
    dateAdded: string; // Mapped from dateApplied
    logo?: string;
    tags: string[];
    link?: string;
    notes?: string;
}

export interface Column {
    id: Status;
    title: string;
    count: number;
}

export interface Metric {
    label: string;
    value: string | number;
    trend: number;
    color: string;
}

export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
    id: string;
    message: string;
    type: ToastType;
}

export type DocumentType = 'cover_letter' | 'note' | 'requirement';

export interface Document {
    id: string;
    title: string;
    content: string;
    type: DocumentType;
    date: string;
}
