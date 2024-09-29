import { TaskCard } from "../Components";
import { TaskModel as Task } from "../Components/Task/TaskModel";
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";


export const ADD_Task = 'ADD_Task';
export const DELETE_Task = 'DELETE_Task';
export const UPDATE_Task = 'UPDATE_Task';

export const addTask = (Task) => ({
  type: ADD_Task,
  payload: Task,
});

export const deleteTask = (id) => ({
  type: DELETE_Task,
  payload: id,
});

export const updateTask = (id, updatedTask) => ({
  type: UPDATE_Task,
  payload: { id, updatedTask },
});



const TaskSearchForm = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (event) => {
      event.preventDefault();
      onSearch(searchTerm);
  };

  return (
      <form onSubmit={handleSubmit} className="flex justify-center my-4">
          <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search tasks..."
              className="p-2 text-lg border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="submit" className="p-2 text-lg text-white bg-blue-600 rounded-r-md hover:bg-blue-700">
              Search
          </button>
      </form>
  );
};

export const TaskBoard = ({ tasks }) => {

  const Tasks = useSelector((state) => state.Tasks);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  const handleUpdate = (id) => {
      const updatedText = prompt('Update Task text:');
      if (updatedText) {
      dispatch(updateTask(id, { text: updatedText }));
      }
  };


  return (
    <div className="flex flex-col items-center my-4">
    {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks found.</p>
        ) : (
            tasks.map((task) => (
                <div key={task.id} className="w-full max-w-md p-4 my-2 border border-gray-300 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-200">
                    <h3 className="text-xl font-semibold text-gray-800">{task.title}</h3>
                    <p className="text-gray-700">{task.description}</p>
                    <div className="mt-4">
                        <button 
                            onClick={() => handleUpdate(task.id)} 
                            className="mr-2 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                        >
                            Update
                        </button>
                        <button 
                            onClick={() => handleDelete(task.id)} 
                            className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transition"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))
        )}
    </div>
  );
};

const TaskManager = () => {
  // const dispatch = useDispatch();


  const API_URL = 'https://ad-4stra.ru/api/projects';
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const state = useSelector((state) => state);
  const token = state.auth.token;
  // const taskState = useSelector((state) => state.tasks);
  // var statetest = state.tasks;
  // // const tasks = taskState.taskList;

  const response = axios.get(API_URL, {
    headers: {
      // Include any required headers here, e.g., Authorization
      'Authorization': token, // Replace with your token if needed
    },
  }).then(response => {
    setTasks(response.data); // Assuming response.data is an array of tasks
    setFilteredTasks(response.data); // Initialize filtered tasks with all tasks
  })
  .catch(err => {
    setError('Failed to fetch tasks');
    console.error('Error fetching tasks:', err);
  })
  .finally(() => {
    setLoading(false);
  });



  const [tasks, setTasks] = useState([
    new Task(1, 'bug', 'Implement login', 'Create login functionality', 'In Progress', 'Alice', 'High'),
    new Task(2, 'fix','Setup Redux', 'Initialize Redux store and slices', 'Backlog', 'Bob', 'Medium'),
    new Task(3, 'feature','Design database schema', 'Prepare schema for database', 'Done', 'Charlie', 'Low'),
    new Task(4, 'feature','Design database schema', 'Some long description Some long description Some long description Some long description Some long description Some long description ', 'Done', 'Charlie', 'Low'),
      // Add more sample tasks as needed
  ]);


  const [filteredTasks, setFilteredTasks] = useState(tasks);

  const handleSearch = (searchTerm) => {
      const results = tasks.filter(task => 
          task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredTasks(results);
  };

  return (
      <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold text-center mb-6">Task Manager</h1>
          <TaskSearchForm onSearch={handleSearch} />
          <TaskBoard tasks={filteredTasks} />
      </div>
  );
};


export default function TaskPage(){

    // Fetch projects when the component mounts
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get('');
                // var data = JSON.parse(response);
                
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        fetchTasks();
    }, []);

    return (

      <div>
        <TaskManager />
      </div>
        // <ul>
        //   {Tasks.map((Task) => (
        //     <li key={Task.id}>
        //       {Task.text}
        //       <button onClick={() => handleUpdate(Task.id)}>Update</button>
        //       <button onClick={() => handleDelete(Task.id)}>Delete</button>
        //     </li>
        //   ))}
        // </ul>
    )
}