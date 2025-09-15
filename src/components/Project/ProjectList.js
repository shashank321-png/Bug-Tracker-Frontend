import React, { useEffect, useState } from "react";
import { getProjects, deleteProject, updateProject } from "../../services/projectService";
import ProjectDetail from "./ProjectDetail";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const UpdateProjectForm = ({ project, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: project.projectName || "",
    description: project.projectDescription || "",
    startDate: project.startDate || "",
    endDate: project.endDate || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...project, ...formData });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-6 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Update Project</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Project Name</label>
            <input
              type="text"
              name="name"
              value={formData.projectName}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded p-2"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.projectDescription}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded p-2"
              required
            />
          </div>
         

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 rounded bg-gray-300 text-gray-700 hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProject, setEditingProject] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this project?");
    if (!confirmed) return;

    try {
      await deleteProject(id);
      setProjects(projects.filter((p) => p.projectID !== id));
    } catch (err) {
      alert("Failed to delete project: " + err.message);
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {projects.length === 0 ? (
        <p className="text-gray-500">No projects available.</p>
      ) : (
        <ul className="space-y-6">
          {projects.map((project) => (
            <li
              key={project.projectId}
              className="flex justify-between items-center bg-white p-5 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <ProjectDetail project={project} />
              <div className="flex space-x-3">
                <button
                  onClick={() => handleEdit(project)}
                  className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition transform hover:scale-110"
                  title="Edit Project"
                >
                  <FiEdit size={20} />
                </button>
                <button
                  onClick={() => handleDelete(project.projectId)}
                  className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition transform hover:scale-110"
                  title="Delete Project"
                >
                  <FiTrash2 size={20} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Update Project Modal */}
      {editingProject && (
        <UpdateProjectForm
          project={editingProject}
          onSubmit={async (updatedProject) => {
            try {
              await updateProject(updatedProject.projectId, updatedProject);
              setEditingProject(null);
              fetchProjects();
            } catch (err) {
              alert("Failed to update project: " + err.message);
            }
          }}
          onCancel={() => setEditingProject(null)}
        />
      )}
    </div>
  );
};

export default ProjectList;
