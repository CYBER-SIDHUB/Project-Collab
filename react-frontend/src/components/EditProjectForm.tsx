import React, { useState } from "react";
import { updateProject } from "../services/projectService";
import { useAuth } from "../context/AuthContext";

interface EditProjectFormProps {
    projectId: string | undefined;
    currentName: string;
    currentDescription: string;
    onSuccess: () => void;
}

const EditProjectForm: React.FC<EditProjectFormProps> = ({
    projectId,
    currentName,
    currentDescription,
    onSuccess,
}) => {
    const { token } = useAuth();
    const [name, setName] = useState(currentName);
    const [description, setDescription] = useState(currentDescription);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (token) {
            // console.log(projectId, name, description)
            await updateProject(token, projectId, { name, description });
            onSuccess(); // Refresh or redirect after success
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </label>
            <br />
            <label>
                Description:
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </label>
            <br />
            <button type="submit">Save Changes</button>
        </form>
    );
};

export default EditProjectForm;
