import { configureStore } from '@reduxjs/toolkit';
import jobsReducer from './features/jobs/jobsSlice';
import uiReducer from './features/ui/uiSlice';
import documentsReducer from './features/documents/documentsSlice';

export const store = configureStore({
    reducer: {
        jobs: jobsReducer,
        ui: uiReducer,
        documents: documentsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
