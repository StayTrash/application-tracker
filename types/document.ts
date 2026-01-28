export type DocumentType = 'cover_letter' | 'note' | 'requirement';

export interface Document {
    id: string;
    title: string;
    content: string;
    type: DocumentType;
    date: string;
}
