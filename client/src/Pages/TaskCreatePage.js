import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ProjectList } from '../Components';

export default function TaskCreatePage(){

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('Medium');
    const [assignee, setAssignee] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [projects, setProjects] = useState([]); // State to hold project list
    const [users, setUsers] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [selectedProjectId, setSelectedProjectId] = useState('');

    // Replace with actual project and author IDs
    const projectId = "1e0566fb-f9df-43b0-b02c-d6098c5d893d"; // Example project ID
    const authorId = "415939f0-0c06-4a89-b35c-00aa7363f72d"; // Example author ID

    // Fetch projects when the component mounts
    useEffect(() => {
        const fetchData = async (url, setter) => {
            try {
                const response = await axios.get(url);
                // var data = JSON.parse(response);
                
                setter(response.data); // Assuming response.data contains the list of projects
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        fetchData('https://localhost:8082/api/projects', setProjects);
        fetchData('https://localhost:8082/api/users', setUsers);
        fetchData('https://localhost:8082/api/statuses', setStatuses);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission logic here
        const taskData = taskData = {
            description: description,
            name: title,
            hoursRemained: 0,
            hoursDone: 0,
            priority: priorityMap[priority],
            status: {
                id: "9153bce8-a67b-49bb-b6fc-d7096e62abdb" // status "to do"
            },
            user: {
                id: users.find(x => x.name == assignee.name).id,
                name: assignee
            },
            project: {
                id: selectedProjectId, // Convert to Number if necessary
                name: projects.find(x => x.id == selectedProjectId).name
            }
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
                    <label className="block text-sm font-medium text-gray-700" htmlFor="project">
                        Project
                    </label>
                    <select
                        id="project"
                        value={selectedProjectId}
                        onChange={(e) => setSelectedProjectId(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-500"
                        required
                    >
                        <option value="" disabled>Select a project</option>
                        {projects.map((project) => (
                            <option key={project.id} value={project.id}>
                                {project.name}
                            </option>
                        ))}
                    </select>
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