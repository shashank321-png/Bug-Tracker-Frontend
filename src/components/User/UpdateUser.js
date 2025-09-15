import React, { useState } from "react";

const UpdateUser = ({ user, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    firstname: user.firstname,
    lastname: user.lastname,
    password: "", // leave blank, optional to change
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...user, ...formData }); // merge userId etc.
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Update User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Firstname */}
        <div>
          <label className="block text-gray-700">Firstname</label>
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded p-2"
          />
        </div>

        {/* Lastname */}
        <div>
          <label className="block text-gray-700">Lastname</label>
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded p-2"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Leave blank to keep current password"
            className="mt-1 block w-full border border-gray-300 rounded p-2"
          />
        </div>

        {/* Buttons */}
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
  );
};

export default UpdateUser;
