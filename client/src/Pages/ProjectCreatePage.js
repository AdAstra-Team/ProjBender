import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ProjectList } from '../Components';

export default function ProjectCreatePage(){

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [projects, setProjects] = useState([]); // State to hold project list
    const [users, setUsers] = useState([]);
    const [userMe, setUserMe] = useState([]);
    const [notification, setNotification] = useState({ message: '', type: '' });

    // Replace with actual project and author IDs
    const projectId = "1e0566fb-f9df-43b0-b02c-d6098c5d893d"; // Example project ID
    const authorId = "415939f0-0c06-4a89-b35c-00aa7363f72d"; // Example author ID

    // Fetch projects when the component mounts
    useEffect(() => {
        const fetchData = async (url, setter) => {
            try {
                const token = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJrYk1yNjV5NVRRbnNQR1RDWFl2ZGg1bmdtZk5mZlNaTGdULVk1cW4xRFJ3In0.eyJleHAiOjE3Mjc2MjEyNjgsImlhdCI6MTcyNzU4NTI2OCwianRpIjoiMjUwMjc4ZDctMzU2MS00ZWExLWI3NzEtZjU2NjZhZWU1YWFmIiwiaXNzIjoiaHR0cDovL2RldHVsaWUuc3BhY2U6ODA4MC9yZWFsbXMvYXV0aCIsImF1ZCI6WyJyZWFsbS1tYW5hZ2VtZW50IiwiYWNjb3VudCJdLCJzdWIiOiI0MTU5MzlmMC0wYzA2LTRhODktYjM1Yy0wMGFhNzM2M2Y3MmQiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJkd2gtbWFuYWdlciIsInNlc3Npb25fc3RhdGUiOiIwMDJmNjc2OS02YjU5LTQxZjctOWMxYS01ZTA1ZDFhMWMyN2QiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIioiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIkRXSF83MjA3M18iLCJkZWZhdWx0LXJvbGVzLWF0bGFzIiwiRFdIX2Q3NmRiXyIsImFwcF9EV0hfTUFOQUdFUiIsIkRXSF8yOWRhYl8iLCJEV0hfMTgzMDhfIiwiUk9MRV9hZG1pbiIsImFkbWluIiwiRFdIXzFkOTk0XyIsIlJvbGUzIiwiRFdIXzgxMjA1XyIsIkRXSF80OTFlOV8iLCJvZmZsaW5lX2FjY2VzcyIsIlJPTEVfQURNSU4iLCJBRE1JTiIsInVtYV9hdXRob3JpemF0aW9uIiwiRFdIXzEzN2NmXyIsImFwcF9hZG1pbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7InJlYWxtLW1hbmFnZW1lbnQiOnsicm9sZXMiOlsidmlldy1pZGVudGl0eS1wcm92aWRlcnMiLCJ2aWV3LXJlYWxtIiwibWFuYWdlLWlkZW50aXR5LXByb3ZpZGVycyIsImltcGVyc29uYXRpb24iLCJyZWFsbS1hZG1pbiIsImNyZWF0ZS1jbGllbnQiLCJtYW5hZ2UtdXNlcnMiLCJxdWVyeS1yZWFsbXMiLCJ2aWV3LWF1dGhvcml6YXRpb24iLCJxdWVyeS1jbGllbnRzIiwicXVlcnktdXNlcnMiLCJtYW5hZ2UtZXZlbnRzIiwibWFuYWdlLXJlYWxtIiwidmlldy1ldmVudHMiLCJ2aWV3LXVzZXJzIiwidmlldy1jbGllbnRzIiwibWFuYWdlLWF1dGhvcml6YXRpb24iLCJtYW5hZ2UtY2xpZW50cyIsInF1ZXJ5LWdyb3VwcyJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwic2lkIjoiMDAyZjY3NjktNmI1OS00MWY3LTljMWEtNWUwNWQxYTFjMjdkIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5hbWUiOiJiIGIiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJhc2Fmb25pbkBlZHUuaHNlLnJ1IiwiZ2l2ZW5fbmFtZSI6ImIiLCJmYW1pbHlfbmFtZSI6ImIiLCJlbWFpbCI6ImFzYWZvbmluQGVkdS5oc2UucnUifQ.ZW9lkMfTafMk7q8mhNe9OcZEFTNjQ5aDdI9b8VB4aDYGvfizotDUu9in_lb9P07TQx6l3fwnB8_tOnirZdilJJd3HN60P2w0A8xb0kHAqbCZ5aGZTWMqLzzCzgXQmZ2HFDnv5fUcg8i_sqJQBv5YVSnV_wh6f7Zymq-Gu8vnv28mp-FIv7owrccMXlNiM89BtCktwK7htYJY5yyHWQWVW82zi5oNTRF3eGNyyMOsu_Mp9N5hDRUJo4EgYx9h8Vy_Yim17YBQYRBQNVOu1NB2RIc2cq32EwBiEDd_sgSYamwH5AhTsbI-YMBYczZO31ezTWpjarxJknZQDjjPElJwow"
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

        fetchData('http://localhost:8082/api/projects', setProjects);
        fetchData('http://localhost:8082/api/users', setUserMe);
    }, []);

    const handleAddUser = () => {
        setUsers([...users, '']);
    };

    const handleRemoveUser = (index) => {
        const newUsers = users.filter((_, i) => i !== index);
        setUsers(newUsers);
    };

    const handleUserChange = (index, value) => {
        const newUsers = [...users];
        newUsers[index] = value;
        setUsers(newUsers);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log(users)
        const projectData = {
            name: title,
            tasks: [],
            users: [users]
        };

        try {
            const response = await axios.post('http://localhost:8082/api/projects', projectData);

            setNotification({ message: 'Project created successfully!', type: 'success' });

            setTitle('');
            setDescription('');
            setProjects([]); // State to hold project list
            setUsers([]);
            setUserMe([]);

            console.log('Project created successfully:', response.data);
        } catch (error) {
            console.error('Error creating Project:', error);
            setNotification({ message: 'Failed to create Project. Please try again.', type: 'error' });
    
        }

        console.log({
            title,
            description,
            users
        });
    };

    return(
        <div className="max-w-md mx-auto mt-2 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Create a New Project</h2>
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
                <label className="block text-sm font-medium text-gray-700">Users</label>
                {users.map((user, index) => (
                    <div key={index} className="flex space-x-2 mt-2">
                    <input
                        type="text"
                        value={user}
                        onChange={(e) => handleUserChange(index, e.target.value)}
                        placeholder={`User ${index + 1}`}
                        className="flex-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-500"
                    />
                    <button
                        type="button"
                        onClick={() => handleRemoveUser(index)}
                        className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
                    >
                        Remove
                    </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={handleAddUser}
                    className="mt-2 w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
                >
                    Add User
                </button>
            </div>


            <button
                type="submit"
                className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
            >
                Create Project
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