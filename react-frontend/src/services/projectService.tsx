import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchProjects = async (token: string) => {
    const response = await axios.get(`${API_URL}/api/projects`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};
