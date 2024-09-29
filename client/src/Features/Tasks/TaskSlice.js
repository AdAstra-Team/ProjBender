import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getTasks } from '../../Services/taskService.js'; // API service
import { TaskModel as Task } from '../../Components/index.js';
import { deleteTask } from '../../Pages/TaskPage.js';
import axios from 'axios';

// Async action for fetching tasks
// export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
//   const response = await getTasks(); // Make sure this returns an array of task objects
//   return response;
// });

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    taskList: [
      new Task(9999999, 'bug', 'Implement login', 'Create login functionality', 'In Progress', 'Alice', 'High'),
    ],
  },
  reducers: {
    createTask: (state, action) => {
      const taskData = action.payload; // Access the payload correctly
      const task = new Task(
        taskData.id,
        taskData.type,
        taskData.title,
        taskData.description,
        taskData.status,
        taskData.assignee,
        taskData.priority
      );
      state.taskList.push(task); // Correctly push to taskList
    },
    deleteTask: (state) => {
      axios.get()
    }
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchTasks.pending, (state) => {
  //       state.status = 'loading'; // Set loading state
  //     })
  //     .addCase(fetchTasks.fulfilled, (state, action) => {
  //       state.status = 'succeeded'; // Set succeeded state
  //       // If action.payload is an array of task objects, map them to Task instances
  //       state.taskList = action.payload.map((taskData) => new Task(
  //         taskData.id,
  //         taskData.type,
  //         taskData.title,
  //         taskData.description,
  //         taskData.status,
  //         taskData.assignee,
  //         taskData.priority
  //       ));
  //     })
  //     .addCase(fetchTasks.rejected, (state, action) => {
  //       state.status = 'failed'; // Set failed state
  //       state.error = action.error.message; // Capture error message
  //     });
  // },
});

export const { createTask } = taskSlice.actions;

export default taskSlice.reducer;
