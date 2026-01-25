import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Document, DocumentType } from '@/types';

interface DocumentsState {
    documents: Document[];
    loading: boolean;
    error: string | null;
}

const initialState: DocumentsState = {
    documents: [],
    loading: false,
    error: null
};

// Async Thunks
export const fetchDocuments = createAsyncThunk('documents/fetchDocuments', async () => {
    const response = await fetch('/api/documents');
    if (!response.ok) throw new Error('Failed to fetch documents');
    const data = await response.json();
    // Map _id to id
    return data.map((doc: any) => ({ ...doc, id: doc._id }));
});

export const addDocument = createAsyncThunk('documents/addDocument', async (docData: Partial<Document>) => {
    const response = await fetch('/api/documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(docData)
    });
    if (!response.ok) throw new Error('Failed to create document');
    const data = await response.json();
    return { ...data, id: data._id };
});

export const updateDocument = createAsyncThunk('documents/updateDocument', async ({ id, data }: { id: string, data: Partial<Document> }) => {
    const response = await fetch(`/api/documents/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to update document');
    const updated = await response.json();
    return { ...updated, id: updated._id };
});

export const deleteDocument = createAsyncThunk('documents/deleteDocument', async (id: string) => {
    const response = await fetch(`/api/documents/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete document');
    return id;
});

const documentsSlice = createSlice({
    name: 'documents',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Fetch
        builder
            .addCase(fetchDocuments.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchDocuments.fulfilled, (state, action) => {
                state.loading = false;
                state.documents = action.payload;
            })
            .addCase(fetchDocuments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch messages';
            })
            // Add
            .addCase(addDocument.fulfilled, (state, action) => {
                state.documents.push(action.payload);
            })
            // Update
            .addCase(updateDocument.fulfilled, (state, action) => {
                const index = state.documents.findIndex(d => d.id === action.payload.id);
                if (index !== -1) {
                    state.documents[index] = action.payload;
                }
            })
            // Delete
            .addCase(deleteDocument.fulfilled, (state, action) => {
                state.documents = state.documents.filter(d => d.id !== action.payload);
            });
    }
});

export default documentsSlice.reducer;
