import { configureStore } from '@reduxjs/toolkit';
import projectReducer from '../Features/Projects/ProjectSlice';
import taskReducer from '../Features/Tasks/TaskSlice';
import authReducer from '../Features/Auth/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectReducer,
    tasks: taskReducer,
  },
});