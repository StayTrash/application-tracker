import mongoose, { Schema, Document, Model } from 'mongoose';

export type Status = 'Applied' | 'Screening' | 'Interview' | 'Offer' | 'Rejected';

export interface IJobApplication extends Document {
    userId: mongoose.Types.ObjectId;
    company: string;
    role: string; // Mapped to 'position' in older schemas, but let's use 'role' to match UI
    location: string;
    salary: string; // Mapped to 'salaryRange'
    status: Status;
    dateAdded: Date; // Mapped to 'dateApplied'
    logo?: string;
    tags: string[];
    link?: string;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}

const JobApplicationSchema: Schema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        company: { type: String, required: true },
        role: { type: String, required: true },
        location: { type: String, default: 'Remote' },
        salary: { type: String },
        status: {
            type: String,
            enum: ['Applied', 'Screening', 'Interview', 'Offer', 'Rejected'],
            default: 'Applied',
        },
        dateAdded: { type: Date, default: Date.now },
        logo: { type: String },
        tags: { type: [String], default: [] },
        link: { type: String },
        notes: { type: String },
    },
    { timestamps: true }
);

const JobApplication: Model<IJobApplication> =
    mongoose.models.JobApplication || mongoose.model<IJobApplication>('JobApplication', JobApplicationSchema);

export default JobApplication;
