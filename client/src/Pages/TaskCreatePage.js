import React, { useState } from 'react';
import axios from 'axios';

export default function TaskCreatePage(){

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('Medium');
    const [assignee, setAssignee] = useState('');
    const [dueDate, setDueDate] = useState('');

    // Replace with actual project and author IDs
    const projectId = "3fa85f64-5717-4562-b3fc-2c963f66afa6"; // Example project ID
    const authorId = "3fa85f64-5717-4562-b3fc-2c963f66afa6"; // Example author ID

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission logic here
        const taskData = {
            id: crypto.randomUUID(), // Generate a unique ID for the task
            description,
            project: {
                id: projectId,
                name: title, // Use the title as the project name or adjust accordingly
                tasks: [title], // Assuming tasks are related to the project
            },
            assignee: {
                id: assignee, // Set to the actual assignee ID
                authId: assignee, // Replace with actual authId if different
                name: assignee, // Set to the actual assignee name or modify accordingly
            },
            author: {
                id: authorId,
                authId: authorId, // Replace with actual authId if different
                name: "Author Name", // Replace with actual author name
            },
            hoursRemained: 0,
            hoursDone: 0,
        };

        try {
            const response = await axios.post('https://ad-4stra.ru/api/tasks', taskData);
            console.log('Task created successfully:', response.data);
            // Reset form or navigate to another page
        } catch (error) {
            console.error('Error creating task:', error);
        }

        console.log({
            title,
            description,
            priority,
            assignee,
            dueDate,
        });
    };

    return(
        <div className="max-w-md mx-auto mt-2 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Create a New Task</h2>
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700" htmlFor="title">
                    Title
                </label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-500"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700" htmlFor="description">
                    Description
                </label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-500"
                    rows="4"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700" htmlFor="priority">
                    Priority
                </label>
                <select
                    id="priority"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-500"
                >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700" htmlFor="assignee">
                    Assignee
                </label>
                <input
                    type="text"
                    id="assignee"
                    value={assignee}
                    onChange={(e) => setAssignee(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-500"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700" htmlFor="dueDate">
                    Due Date
                </label>
                <input
                    type="date"
                    id="dueDate"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-500"
                />
            </div>

            <button
                type="submit"
                className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
            >
                Create Task
            </button>
        </form>
    </div>
    )
}