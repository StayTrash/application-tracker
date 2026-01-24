export type Status = 'Applied' | 'Screening' | 'Interview' | 'Offer' | 'Rejected';

export interface Job {
  id: string;
  company: string;
  role: string;
  location: string;
  salary: string;
  status: Status;
  dateAdded: string;
  logo: string; // URL to logo
  tags: string[];
}

export interface Column {
  id: Status;
  title: string;
  count: number;
}

export interface Metric {
  label: string;
  value: string | number;
  trend: number; // Percentage change
  color: string; // Tailwind text color class
}

export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
}