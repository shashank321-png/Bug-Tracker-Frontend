import React from "react";

const ProjectDetail = ({ project }) => {
  return (
    <div className="bg-black text-yellow-400 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold">{project.projectName}</h2>
      <p className="text-sm">{project.projectDescription}</p>
      <p className="text-sm">Created By: {project.managerId}</p>
    </div>
  );
};

export default ProjectDetail;
