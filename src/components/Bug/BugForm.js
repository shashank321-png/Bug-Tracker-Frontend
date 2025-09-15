import React, { useState, useEffect } from 'react';
import { getVacantUsers } from '../../services/userService';
import { getProjects } from '../../services/projectService';
import { Bug } from 'lucide-react';

const BugForm = ({ onSubmit, initialData = {} }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [bug, setBug] = useState({
    title: '',
    description: '',
    priority: 'Low',
    startDate: '',
    endDate: '',
    projectId: '',
    assignedTo: '',
    environment: '',
    ...initialData
  });
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getVacantUsers().then(setUsers);
    getProjects().then(setProjects);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBug({ ...bug, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(bug);
    setIsOpen(false);
  };

  return (
    <div>
      {/* Add Bug Button */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg shadow transition"
        >
          <Bug className="w-5 h-5" />
          Add Bug
        </button>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 max-h-[80vh] flex flex-col relative">
            
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              ✖
            </button>

            {/* Header */}
            <div className="p-6 border-b">
              <h3 className="text-xl font-bold text-gray-700">
                {initialData?.id ? 'Update Bug' : 'Create Bug'}
              </h3>
            </div>

            {/* Scrollable Form */}
            <div className="p-6 overflow-y-auto flex-1">
              <form id="bugForm" onSubmit={handleSubmit} className="space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-gray-700">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={bug.title}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded p-2"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-gray-700">Description</label>
                  <textarea
                    name="description"
                    value={bug.description}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded p-2"
                  />
                </div>

                {/* Priority */}
                <div>
                  <label className="block text-gray-700">Priority</label>
                  <select
                    name="priority"
                    value={bug.priority}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded p-2"
                  >
                    <option value="Low">Low</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>

                {/* Start Date */}
                <div>
                  <label className="block text-gray-700">Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={bug.startDate}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded p-2"
                  />
                </div>

                {/* End Date */}
                <div>
                  <label className="block text-gray-700">End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    value={bug.endDate}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded p-2"
                  />
                </div>

                {/* Project */}
                <div>
                  <label className="block text-gray-700">Project</label>
                  <select
                    name="projectId"
                    value={bug.projectId}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded p-2"
                  >
                    <option value="">Select Project</option>
                    {projects.map(project => (
                      <option key={project.id} value={project.id}>
                        {project.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Assigned To */}
                <div>
                  <label className="block text-gray-700">Assigned To</label>
                  <select
                    name="assignedTo"
                    value={bug.assignedTo}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded p-2"
                  >
                    <option value="">Select User</option>
                    {users.map(user => (
                      <option key={user.id} value={user.id}>
                        {user.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Environment */}
                <div>
                  <label className="block text-gray-700">Recreation Step (Environment)</label>
                  <textarea
                    name="environment"
                    value={bug.environment}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded p-2"
                  />
                </div>
              </form>
            </div>

            {/* Footer */}
            <div className="border-t p-4 flex justify-end gap-3 bg-white">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 rounded bg-gray-300 text-gray-700 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="bugForm"
                className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
              >
                {initialData?.id ? 'Update Bug' : 'Create Bug'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BugForm;
