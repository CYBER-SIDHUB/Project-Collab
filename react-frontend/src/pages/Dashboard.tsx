import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

// Define a type for the project object
interface Project {
  id: string;
  name: string;
  description: string;
  tasks?: string[]; // Optional property for tasks
}

const Dashboard = () => {
  const { token, logout } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]); // Explicitly type the state
  const [newProject, setNewProject] = useState({ name: "", description: "" });
  // const [selectedProject, setSelectedProject] = useState<Project | null>(null); // Type for selectedProject

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/projects`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(response.data); // Assume API returns an array of projects
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const createProject = async () => {
    try {
      await axios.post(`${API_URL}/api/projects`, newProject, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNewProject({ name: "", description: "" });
      fetchProjects(); // Refresh the list
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  // const viewProjectDetails = async (projectId: string) => {
  //   try {
  //     const response = await axios.get(`${API_URL}/api/projects/${projectId}`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     setSelectedProject(response.data); // Assume API returns a single project object
  //   } catch (error) {
  //     console.error("Error fetching project details:", error);
  //   }
  // };

  // const hideProjectDetails = async () => {
  //   try {
  //     setSelectedProject(null); // Assume API returns a single project object
  //   } catch (error) {
  //     console.error("Error hiding project details:", error);
  //   }
  // }

  return (
    <div>
      <header>
        <h1>Dashboard</h1>
        <button onClick={logout}>Logout</button>
      </header>
      {/* Create Project Form */}
      <div>
        <input
          type="text"
          placeholder="Project Name"
          value={newProject.name}
          onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={newProject.description}
          onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
        ></textarea>
        <button onClick={createProject}>Create Project</button>
      </div>

      {/* Project List */}
      <div>
      <h2>Projects:</h2>
        {projects.map((project) => (
          <div key={project.id}>
            <ul>
                {/* {projects.map((project) => (
                    <li key={project.id}> */}
                        <Link to={`/projects/${project.id}`}>{project.name}</Link>
                    {/* </li>
                ))} */}
            </ul>
            {/* <p>{project.description}</p> */}
            {/* <button onClick={() => viewProjectDetails(project.id)}>View Details</button>
            <button onClick={() => hideProjectDetails()}>Hide Details</button> */}
          </div>
        ))}
      </div>

      {/* Project Details
      {selectedProject && (
        <div>
          <h2>Project Name:</h2>
          <h3>{selectedProject.name}</h3>
          <p>{selectedProject.description}</p>
          <h3>Tasks:</h3>
          {selectedProject.tasks && selectedProject.tasks.length > 0 ? (
            <ul>
              {selectedProject.tasks.map((task, index) => (
                <li key={index}>{task}</li>
              ))}
            </ul>
          ) : (
            <p>No tasks yet.</p>
          )}
        </div>
      )} */}

    </div>
  );
};

export default Dashboard;
