export type Status = 'Applied' | 'Screening' | 'Interview' | 'Offer' | 'Rejected';

export interface Job {
    id: string;
    company: string;
    role: string;
    location: string;
    salary: string;
    status: Status;
    dateAdded: string;
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
