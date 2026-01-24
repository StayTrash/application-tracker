import { Job, Column, Metric } from './types';

export const MOCK_JOBS: Job[] = [
  {
    id: '1',
    company: 'Vercel',
    role: 'Senior Frontend Engineer',
    location: 'Remote',
    salary: '$180k - $220k',
    status: 'Interview',
    dateAdded: '2023-10-24',
    logo: 'https://picsum.photos/48/48?random=1',
    tags: ['Next.js', 'React', 'Design Systems']
  },
  {
    id: '2',
    company: 'Linear',
    role: 'Product Designer',
    location: 'San Francisco, CA',
    salary: '$160k - $200k',
    status: 'Applied',
    dateAdded: '2023-10-26',
    logo: 'https://picsum.photos/48/48?random=2',
    tags: ['Figma', 'UI/UX', 'Motion']
  },
  {
    id: '3',
    company: 'Airbnb',
    role: 'Staff Engineer',
    location: 'Remote',
    salary: '$220k - $300k',
    status: 'Screening',
    dateAdded: '2023-10-22',
    logo: 'https://picsum.photos/48/48?random=3',
    tags: ['React', 'GraphQL', 'Node']
  },
  {
    id: '4',
    company: 'OpenAI',
    role: 'Design Engineer',
    location: 'San Francisco, CA',
    salary: '$200k - $350k',
    status: 'Offer',
    dateAdded: '2023-10-15',
    logo: 'https://picsum.photos/48/48?random=4',
    tags: ['AI', 'Python', 'React']
  },
  {
    id: '5',
    company: 'Stripe',
    role: 'Frontend Developer',
    location: 'New York, NY',
    salary: '$170k - $210k',
    status: 'Rejected',
    dateAdded: '2023-10-01',
    logo: 'https://picsum.photos/48/48?random=5',
    tags: ['Fintech', 'React', 'TypeScript']
  },
  {
    id: '6',
    company: 'Raycast',
    role: 'Core Engineer',
    location: 'London, UK',
    salary: '£100k - £140k',
    status: 'Applied',
    dateAdded: '2023-10-27',
    logo: 'https://picsum.photos/48/48?random=6',
    tags: ['Swift', 'MacOS', 'Performance']
  }
];

export const COLUMNS: Column[] = [
  { id: 'Applied', title: 'Applied', count: 12 },
  { id: 'Screening', title: 'Screening', count: 4 },
  { id: 'Interview', title: 'Interview', count: 2 },
  { id: 'Offer', title: 'Offer', count: 1 },
  { id: 'Rejected', title: 'Rejected', count: 8 },
];

export const METRICS: Metric[] = [
  { label: 'Total Applications', value: 27, trend: 12, color: 'text-zinc-200' },
  { label: 'Interviews Scheduled', value: 4, trend: 5, color: 'text-indigo-400' },
  { label: 'Offers Received', value: 1, trend: 100, color: 'text-emerald-400' },
];

export const STATUS_COLORS: Record<string, string> = {
  Applied: 'border-zinc-700 text-zinc-400 bg-zinc-400/10',
  Screening: 'border-blue-500/20 text-blue-400 bg-blue-400/10',
  Interview: 'border-violet-500/20 text-violet-400 bg-violet-400/10',
  Offer: 'border-emerald-500/20 text-emerald-400 bg-emerald-400/10',
  Rejected: 'border-red-500/20 text-red-400 bg-red-400/10',
};