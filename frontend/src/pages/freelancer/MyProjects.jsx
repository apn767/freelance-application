import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MyProjects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [displayProjects, setDisplayProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:5000/fetch-projects');
      const filteredProjects = response.data.filter(pro => pro.freelancerId === localStorage.getItem('userId'));
      setProjects(filteredProjects);
      setDisplayProjects(filteredProjects.reverse());
    } catch (err) {
      console.error(err);
      fetchProjects();
    }
  };

  const handleFilterChange = (data) => {
    if (data === "") {
      setDisplayProjects(projects.reverse());
    } else if (data === "In Progress") {
      setDisplayProjects(projects.filter(project => project.status === "Assigned").reverse());
    } else if (data === "Completed") {
      setDisplayProjects(projects.filter(project => project.status === "Completed").reverse());
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-semibold">My Projects</h3>
          <select
            className="form-select block w-1/4 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            onChange={(e) => handleFilterChange(e.target.value)}
          >
            <option value="">Choose project status</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <hr className="mb-4" />

        {displayProjects.map(project => (
          <div
            key={project._id}
            className="bg-white shadow-md rounded-lg p-4 mb-4 cursor-pointer hover:bg-gray-50 transition"
            onClick={() => navigate(`/project/${project._id}`)}
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-semibold">{project.title}</h3>
              <p className="text-gray-500 text-sm">{project.postedDate}</p>
            </div>
            <h5 className="text-lg font-medium mb-2">Budget - &#8377; {project.budget}</h5>
            <p className="text-gray-700 mb-2">{project.description}</p>
            <div className="flex items-center justify-between">
              <h6 className="text-sm font-medium">Status - {project.status}</h6>
            </div>
            <hr className="mt-4" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyProjects;
