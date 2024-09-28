import axios from 'axios';

const API_URL = 'https://api.example.com/projects';

export const getTasks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createTask = async (projectData) => {
  const response = await axios.post(API_URL, projectData);
  return response.data;
};
