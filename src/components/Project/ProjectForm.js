import React, { useState, useEffect } from 'react';
import { createProject, updateProject, getProjectById } from '../../services/projectService';
import { getVacantManagers } from '../../services/managerService';
import { useNavigate, useParams } from 'react-router-dom';

const ProjectFormModal = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [project, setProject] = useState({ projectName: '', projectDescription: '', managerId: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [managers, setManagers] = useState([]);

    useEffect(() => {
        getVacantManagers()
            .then(data => setManagers(data))
            .catch(() => setError('Failed to fetch managers'));

        if (id) {
            setIsEditing(true);
            getProjectById(id)
                .then(data => {
                    setProject(data);
                    setShowModal(true);
                })
                .catch(() => setError('Failed to fetch project details'));
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProject({ ...project, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        const action = isEditing ? updateProject : createProject;

        try {
            await action(project);
            setSuccessMessage(`Project "${project.projectName}" created successfully!`);
            setProject({ projectName: '', projectDescription: '', managerId: '' });
            setShowModal(false);
        } catch {
            setError('Failed to save project');
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-8 py-4">
            {/* Header with title and Add Project button */}
            <div className="flex justify-between items-center mb-4 w-full">
                <h2 className="text-2xl font-bold text-black-400">Projects</h2>
                <button
                    className="flex items-center gap-2 bg-yellow-400 text-black px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
                    onClick={() => setShowModal(true)}
                >
                    📁 Add Project
                </button>
            </div>

            {/* Success / Error messages */}
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative">
                        <h3 className="text-xl font-bold text-black-400 mb-4">
                            {isEditing ? 'Edit Project' : 'Create Project'}
                        </h3>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <div>
                                <label className="block text-gray-700 mb-1">Project Name</label>
                                <input
                                    type="text"
                                    name="projectName"
                                    value={project.projectName}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-1">Description</label>
                                <textarea
                                    name="projectDescription"
                                    value={project.projectDescription}
                                    onChange={handleChange}
                                    required
                                    rows={3}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-1">Manager</label>
                                <select
                                    name="managerId"
                                    value={project.managerId}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                                >
                                    <option value="">Select Manager</option>
                                    {managers.map(manager => (
                                        <option key={manager.userId} value={manager.userId}>
                                            {manager.firstname} {manager.lastname}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex justify-end gap-2 mt-4">
                                <button
                                    type="button"
                                    className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-yellow-400 text-black px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
                                >
                                    {isEditing ? 'Update' : 'Create'}
                                </button>
                            </div>
                        </form>

                        {/* Close icon */}
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl font-bold"
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectFormModal;
