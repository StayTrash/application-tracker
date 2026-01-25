import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Job, Status } from '@/types';

interface JobsState {
    jobs: Job[];
    loading: boolean;
    error: string | null;
}

const initialState: JobsState = {
    jobs: [],
    loading: true,
    error: null
};

// Async Thunks
export const fetchJobs = createAsyncThunk('jobs/fetchJobs', async () => {
    const res = await fetch('/api/applications');
    if (!res.ok) throw new Error('Failed to fetch jobs');
    const data = await res.json();
    return data.map((app: any) => ({
        id: app._id,
        company: app.company,
        role: app.role,
        location: app.location || 'Remote',
        salary: app.salary || 'N/A',
        status: app.status as Status,
        dateAdded: app.dateAdded,
        logo: app.logo || `https://ui-avatars.com/api/?name=${encodeURIComponent(app.company)}&background=random`,
        tags: Array.isArray(app.tags) ? app.tags : [],
        link: app.link,
        notes: app.notes
    })) as Job[];
});

export const addJob = createAsyncThunk('jobs/addJob', async (jobData: Omit<Job, 'id' | 'logo' | 'tags'> & { tags: string }, { dispatch }) => {
    const payload = {
        company: jobData.company,
        position: jobData.role,
        location: jobData.location,
        salaryRange: jobData.salary,
        status: jobData.status,
        dateApplied: jobData.dateAdded,
        tags: jobData.tags.split(',').map(t => t.trim()).filter(Boolean),
        link: jobData.link,
        notes: jobData.notes
    };

    const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error(await res.text());
    await dispatch(fetchJobs()); // Dispatch to refresh
    return;
});

export const updateJob = createAsyncThunk('jobs/updateJob', async ({ id, data }: { id: string; data: Partial<Job> }) => {
    const payload: any = {};
    if (data.company) payload.company = data.company;
    if (data.role) payload.position = data.role;
    if (data.location) payload.location = data.location;
    if (data.salary) payload.salaryRange = data.salary;
    if (data.status) payload.status = data.status;
    if (data.tags) payload.tags = data.tags;
    if (data.dateAdded) payload.dateApplied = data.dateAdded;

    const res = await fetch(`/api/applications/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error('Failed to update job');
    return { id, data };
});

export const deleteJob = createAsyncThunk('jobs/deleteJob', async (id: string) => {
    const res = await fetch(`/api/applications/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete job');
    return id;
});

export const moveJobStatus = createAsyncThunk('jobs/moveJobStatus', async ({ id, status }: { id: string; status: Status }) => {
    const res = await fetch(`/api/applications/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
    });
    if (!res.ok) throw new Error('Failed to move job status');
    return { id, status };
});

const jobsSlice = createSlice({
    name: 'jobs',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch
            .addCase(fetchJobs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchJobs.fulfilled, (state, action) => {
                state.loading = false;
                // Since fetchJobs can return void if chained? No, async thunk behavior. 
                // Wait, if addJob returns fetchJobs(), the payload of addJob will be the payload of fetchJobs execution? 
                // Ah, dispatch(fetchJobs()) returns a promise that resolves to the action. 
                // For simplicity, addJob re-fetches so we might just handle fetchJobs.fulfilled.
                // However, let's strictly type fetchJobs return.
                if (Array.isArray(action.payload)) {
                    state.jobs = action.payload;
                }
            })
            .addCase(fetchJobs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch jobs';
            })
            // Add (Using chaining pattern, so rely on subsequent fetch or manual update?)
            // We defined addJob to return fetchJobs(). Ideally we can just reload.
            .addCase(addJob.fulfilled, () => {
                // Determine if we need to do anything here. 
                // If addJob returns the result of fetchJobs dispatch... 
                // Actually, let's keep it simple: addJob just triggers fetch.
            })
            // Update
            .addCase(updateJob.fulfilled, (state, action) => {
                const { id, data } = action.payload;
                const index = state.jobs.findIndex(j => j.id === id);
                if (index !== -1) {
                    state.jobs[index] = { ...state.jobs[index], ...data };
                }
            })
            // Delete
            .addCase(deleteJob.fulfilled, (state, action) => {
                state.jobs = state.jobs.filter(j => j.id !== action.payload);
            })
            // Move Status
            .addCase(moveJobStatus.fulfilled, (state, action) => {
                const { id, status } = action.payload;
                const job = state.jobs.find(j => j.id === id);
                if (job) job.status = status;
            });
    }
});

export default jobsSlice.reducer;
