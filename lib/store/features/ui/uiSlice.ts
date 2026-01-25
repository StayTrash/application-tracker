import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Toast, ToastType } from '@/types';

interface UiState {
    currentView: 'dashboard' | 'kanban' | 'list' | 'documents';
    searchQuery: string;
    toasts: Toast[];
}

const initialState: UiState = {
    currentView: 'dashboard',
    searchQuery: '',
    toasts: []
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setCurrentView: (state, action: PayloadAction<'dashboard' | 'kanban' | 'list' | 'documents'>) => {
            state.currentView = action.payload;
        },
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
        },
        addToast: (state, action: PayloadAction<{ message: string; type?: ToastType }>) => {
            const id = Math.random().toString(36).substr(2, 9);
            state.toasts.push({
                id,
                message: action.payload.message,
                type: action.payload.type || 'info'
            });
        },
        removeToast: (state, action: PayloadAction<string>) => {
            state.toasts = state.toasts.filter(t => t.id !== action.payload);
        }
    }
});

export const { setCurrentView, setSearchQuery, addToast, removeToast } = uiSlice.actions;
export default uiSlice.reducer;
