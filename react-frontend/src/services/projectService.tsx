import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchProjects = async (token: string) => {
    const response = await axios.get(`${API_URL}/api/projects`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const fetchProjectDetails = async (token: string, projectId: string) => {
    const response = await axios.get(`${API_URL}/api/projects/${projectId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const updateProject = async (token: string, projectId: string | undefined, projectData: any) => {
    const response = await axios.put(`${API_URL}/api/projects/${projectId}`, projectData, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const deleteProject = async (token: string, projectId: string | undefined) => {
    await axios.delete(`${API_URL}/api/projects/${projectId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};
