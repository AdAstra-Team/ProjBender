// src/features/projects/projectSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getTasks } from '../../services/taskService'; // API service

// Async action for fetching projects
export const fetchProjects = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await getTasks();
  return response;
});

const projectSlice = createSlice({
  name: 'tasks',
  initialState: {
    projects: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default taskSlice.reducer;
