import { configureStore } from '@reduxjs/toolkit';
import projectReducer from '../Features/Projects/ProjectSlice';
import taskReducer from '../Features/Tasks/TaskSlice';

export const store = configureStore({
  reducer: {
    projects: projectReducer,
    tasks: taskReducer,
  },
});