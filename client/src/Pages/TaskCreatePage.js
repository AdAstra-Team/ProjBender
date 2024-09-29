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
    const [notification, setNotification] = useState({ message: '', type: '' });

    // Replace with actual project and author IDs
    const projectId = "1e0566fb-f9df-43b0-b02c-d6098c5d893d"; // Example project ID
    const authorId = "415939f0-0c06-4a89-b35c-00aa7363f72d"; // Example author ID

    // Fetch projects when the component mounts
    useEffect(() => {
        const fetchData = async (url, setter) => {
            try {
                const token = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJrYk1yNjV5NVRRbnNQR1RDWFl2ZGg1bmdtZk5mZlNaTGdULVk1cW4xRFJ3In0.eyJleHAiOjE3Mjc1ODE1MzIsImlhdCI6MTcyNzU4MTIzMiwianRpIjoiMzg0NjMyZDAtNGEzMy00N2ZlLThjY2EtNTY3ZjYwYWEwYjRjIiwiaXNzIjoiaHR0cDovL2RldHVsaWUuc3BhY2U6ODA4MC9yZWFsbXMvYXV0aCIsImF1ZCI6WyJyZWFsbS1tYW5hZ2VtZW50IiwiYWNjb3VudCJdLCJzdWIiOiI0MTU5MzlmMC0wYzA2LTRhODktYjM1Yy0wMGFhNzM2M2Y3MmQiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJkd2gtbWFuYWdlciIsInNlc3Npb25fc3RhdGUiOiI3NTQ3NWNjYi1hN2NmLTQ4MzAtYmNkMi0yNzhhODZjOWI5YzIiLCJhY3IiOiIxIiwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIkRXSF83MjA3M18iLCJkZWZhdWx0LXJvbGVzLWF0bGFzIiwiRFdIX2Q3NmRiXyIsImFwcF9EV0hfTUFOQUdFUiIsIkRXSF8yOWRhYl8iLCJEV0hfMTgzMDhfIiwiUk9MRV9hZG1pbiIsImFkbWluIiwiRFdIXzFkOTk0XyIsIlJvbGUzIiwiRFdIXzgxMjA1XyIsIkRXSF80OTFlOV8iLCJvZmZsaW5lX2FjY2VzcyIsIlJPTEVfQURNSU4iLCJBRE1JTiIsInVtYV9hdXRob3JpemF0aW9uIiwiRFdIXzEzN2NmXyIsImFwcF9hZG1pbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7InJlYWxtLW1hbmFnZW1lbnQiOnsicm9sZXMiOlsidmlldy1pZGVudGl0eS1wcm92aWRlcnMiLCJ2aWV3LXJlYWxtIiwibWFuYWdlLWlkZW50aXR5LXByb3ZpZGVycyIsImltcGVyc29uYXRpb24iLCJyZWFsbS1hZG1pbiIsImNyZWF0ZS1jbGllbnQiLCJtYW5hZ2UtdXNlcnMiLCJxdWVyeS1yZWFsbXMiLCJ2aWV3LWF1dGhvcml6YXRpb24iLCJxdWVyeS1jbGllbnRzIiwicXVlcnktdXNlcnMiLCJtYW5hZ2UtZXZlbnRzIiwibWFuYWdlLXJlYWxtIiwidmlldy1ldmVudHMiLCJ2aWV3LXVzZXJzIiwidmlldy1jbGllbnRzIiwibWFuYWdlLWF1dGhvcml6YXRpb24iLCJtYW5hZ2UtY2xpZW50cyIsInF1ZXJ5LWdyb3VwcyJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwic2lkIjoiNzU0NzVjY2ItYTdjZi00ODMwLWJjZDItMjc4YTg2YzliOWMyIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5hbWUiOiJiIGIiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJhc2Fmb25pbkBlZHUuaHNlLnJ1IiwiZ2l2ZW5fbmFtZSI6ImIiLCJmYW1pbHlfbmFtZSI6ImIiLCJlbWFpbCI6ImFzYWZvbmluQGVkdS5oc2UucnUifQ.ivF9Xfqn0is8DMMEjrIL_aRqDnrD-39lzcy9cEEjqsMly71uQngRb5bEiYfS51bDAC4VxHe1zqweyYsJiWqWJaC4elo9O3p5cTSYwrMlOToPiyOxKMK-AwjizchNVABb5NoBiw4a3DsyuYjLubcvgzubrsQTNqOr8bD9XbznzLSASvVAzlyN_SMxCEXCeelGwo-eKHnGNKagYHDrtS3sRt8xj4nPOk-YNFsnEU9Gc4l3eiBNA_IbuyGgd3ZDjIEdlYPLK6JOJjnsjNpH8ZSpSUGG2Hu_yl03EAfpnxoj-rugaOjAdi8jYd-ysTuStpHwZuGO1k2Z0Yna7TDTAAVAPg"
                const config = {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                };

                const response = await axios.get(url, config);
                // var data = JSON.parse(response);
                
                setter(response.data); // Assuming response.data contains the list of projects
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        fetchData('https://ad-4stra.ru/api/projects', setProjects);
        fetchData('https://ad-4stra.ru/api/users', setUsers);
        fetchData('https://ad-4stra.ru/api/statuses', setStatuses);
    }, []);

    const priorityMap = {
        "Low": 0,
        "Medium": 1,
        "High": 2,
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission logic here
        const taskData = {
            description: description,
            name: title,
            hoursRemained: 0,
            hoursDone: 0,
            priority: priorityMap[priority],
            status: {
                id: '9153bce8-a67b-49bb-b6fc-d7096e62abdb' // status "to do"
            },
            author: {
                id: '415939f0-0c06-4a89-b35c-00aa7363f72d',
                name: 'admin',
            },
            assignee: {
                id: '415939f0-0c06-4a89-b35c-00aa7363f72d',
                name: 'admin',
            },
            project: {
                id: selectedProjectId, // Convert to Number if necessary
                name: projects.find(x => x.id == selectedProjectId).name
            }
        };

        try {
            const response = await axios.post('https://ad-4stra.ru/api/tasks', taskData);

            setNotification({ message: 'Task created successfully!', type: 'success' });

            setTitle('');
            setDescription('');
            setPriority('Medium');
            setAssigneeId('');
            setAssigneeName('');
            setSelectedProjectId('');
            setStatusId('');
            setDueDate('');

            console.log('Task created successfully:', response.data);
        } catch (error) {
            console.error('Error creating task:', error);
            setNotification({ message: 'Failed to create task. Please try again.', type: 'error' });
    
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

            {notification.message && (
                <div
                    className={`mb-4 p-3 rounded ${
                        notification.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}
                >
                    {notification.message}
                </div>
            )}
        </form>
    </div>
    )
}