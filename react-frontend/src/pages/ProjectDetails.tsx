import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { deleteProject, fetchProjectDetails } from "../services/projectService";
import { useAuth } from "../context/AuthContext";
import EditProjectForm from "../components/EditProjectForm";

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
    const [editing, setEditing] = useState(false);
    const navigate = useNavigate();
    const toggleEdit = () => setEditing(!editing);

    const handleDelete = async () => {
        if (token) {
            if (window.confirm("Are you sure you want to delete this project?")) {
                // console.log(projectId)
                await deleteProject(token, projectId);
                navigate("/dashboard"); // Redirect after deletion
            }
        }
    }; 

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
            {/* <div>
                <h1>Project Details</h1>
                <p><strong>Name:</strong> {project.name}</p>
                <p><strong>Description: </strong> {project.description}</p>
                <p><strong>Owner:</strong> {project.owner}</p>
                <p><strong>Created At:</strong> {new Date(project.created_at).toLocaleString()}</p>
                <button onClick={() => navigate("/dashboard")}>Back to Dashboard</button>
            </div> */}

            <div>
                <h1>Project Details</h1>
                {editing ? (
                    <EditProjectForm
                        projectId={projectId}
                        currentName={project.name}
                        currentDescription={project.description || ""}
                        onSuccess={() => {
                            setEditing(false);
                            window.location.reload();
                        }}
                    />
                ) : (
                    <>
                        <p><strong>Name:</strong> {project.name}</p>
                        <p><strong>Description:</strong> {project.description}</p>
                        <button onClick={toggleEdit}>Edit</button>
                    </>
                )}
                <button onClick={handleDelete}>Delete</button>
                <button onClick={() => navigate("/dashboard")}>Back to Dashboard</button>
            </div>
        </div>
    );
};

export default ProjectDetails;
