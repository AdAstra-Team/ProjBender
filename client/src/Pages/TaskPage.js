import { TaskCard } from "../Components";
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


export default function TaskPage(){

    const tasks = useSelector((state) => state.Tasks.Tasks);

    const Tasks = useSelector((state) => state.Tasks.Tasks);
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
        <ul>
          {Tasks.map((Task) => (
            <li key={Task.id}>
              {Task.text}
              <button onClick={() => handleUpdate(Task.id)}>Update</button>
              <button onClick={() => handleDelete(Task.id)}>Delete</button>
            </li>
          ))}
        </ul>
    )
}