import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProjectDetails } from "../services/projectService";
import { useAuth } from "../context/AuthContext";

interface Project {
    _id: string;
    name: string;
    description: string;
    tasks?: string[]; // Optional property for tasks
    owner: string;
    created_at: string;
}

const ProjectDetails: React.FC = () => {
    const { token } = useAuth();
    const { projectId } = useParams<{ projectId: string }>();
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const getProjectDetails = async () => {
            try {
                if (token && projectId) {
                    const data = await fetchProjectDetails(token, projectId);
                    setProject(data);
                }
            } catch (error) {
                console.error("Error fetching project details:", error);
                navigate("/dashboard"); // Redirect if error occurs
            } finally {
                setLoading(false);
            }
        };

        getProjectDetails();
    }, [token, projectId, navigate]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!project) {
        return <div>Project not found.</div>;
    }

    return (
        <div>
            <h1>Project Details</h1>
            <p><strong>Name:</strong> {project.name}</p>
            <p><strong>Description: </strong> {project.description}</p>
            <p><strong>Owner:</strong> {project.owner}</p>
            <p><strong>Created At:</strong> {new Date(project.created_at).toLocaleString()}</p>
            <button onClick={() => navigate("/dashboard")}>Back to Dashboard</button>
        </div>
    );
};

export default ProjectDetails;
