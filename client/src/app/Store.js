import { configureStore, combineReducers } from '@reduxjs/toolkit';
import projectReducer from '../Features/Projects/ProjectSlice';
import taskReducer from '../Features/Tasks/TaskSlice';
import authReducer from '../Features/Auth/authSlice';

// Combine all reducers
const rootReducer = combineReducers({
  auth: authReducer,
  projects: projectReducer,
  tasks: taskReducer,
});

// Create the Redux store
export const store = configureStore({
  reducer: rootReducer,
});
