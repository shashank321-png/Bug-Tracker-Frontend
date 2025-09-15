import React from 'react';
import ProjectList from '../components/Project/ProjectList';
import ProjectForm from '../components/Project/ProjectForm';

const Projects = () => {
    return (
        <div className="container mx-auto p-4">
            <ProjectForm />
            <ProjectList />
        </div>
    );
};

export default Projects;