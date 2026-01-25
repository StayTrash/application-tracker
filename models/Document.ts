import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IDocument extends Document {
    userId: string;
    title: string;
    content: string;
    type: 'cover_letter' | 'note' | 'requirement';
    createdAt: Date;
    updatedAt: Date;
}

const DocumentSchema: Schema = new Schema({
    userId: { type: String, required: true, index: true },
    title: { type: String, required: true },
    content: { type: String, default: '' },
    type: { type: String, enum: ['cover_letter', 'note', 'requirement'], default: 'note' },
}, { timestamps: true });

// Check if model exists to prevent overwrite error in hot-reload
const DocumentModel: Model<IDocument> = mongoose.models.Document || mongoose.model<IDocument>('Document', DocumentSchema);

export default DocumentModel;
