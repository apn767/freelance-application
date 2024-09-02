import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Client = () => {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [displayProjects, setDisplayProjects] = useState([]);
  const [filterProject, setFilterProject] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    await axios
      .get('http://localhost:5000/fetch-projects')
      .then((response) => {
        let pros = response.data.filter(
          (pro) => pro.clientId === localStorage.getItem('userId')
        );
        setProjects(pros);
        setDisplayProjects(pros.reverse());
      })
      .catch((err) => {
        console.log(err);
        fetchProjects();
      });
  };

  const handleFilterChange = (data) => {
    if (data === '') {
      setDisplayProjects(projects);
    } else if (data === 'Un Assigned') {
      setDisplayProjects(
        projects.filter((project) => project.status === 'Available').reverse()
      );
    } else if (data === 'In Progress') {
      setDisplayProjects(
        projects.filter((project) => project.status === 'Assigned').reverse()
      );
    } else if (data === 'Completed') {
      setDisplayProjects(
        projects.filter((project) => project.status === 'Completed').reverse()
      );
    }
  };

  return (
    <div className="client-projects-page bg-gray-100 min-h-screen p-8">
      <div className="client-projects-list max-w-4xl mx-auto">
        <div className="client-projects-header flex justify-between items-center mb-4">
          <h3 className="text-2xl font-semibold text-gray-800">My Projects</h3>
          <select
            className="form-control bg-white border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Project status"
            onChange={(e) => handleFilterChange(e.target.value)}
          >
            <option value="">Choose project status</option>
            <option value="Un Assigned">Un Assigned</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <hr className="mb-4" />

        {displayProjects.map((project) => (
          <div
            className="listed-project bg-white p-6 rounded-lg shadow-md mb-6 cursor-pointer hover:bg-gray-50 transition-colors"
            key={project._id}
            onClick={() => navigate(`/client-project/${project._id}`)}
          >
            <div className="listed-project-head flex justify-between items-center mb-3">
              <h3 className="text-xl font-semibold text-gray-900">
                {project.title}
              </h3>
              <p className="text-sm text-gray-600">
                {String(project.postedDate).slice(0, 25)}
              </p>
            </div>
            <h5 className="text-lg text-gray-700">
              Budget - &#8377; {project.budget}
            </h5>
            <p className="text-gray-600 mb-4">{project.description}</p>

            <div className="bids-data flex justify-between items-center">

              <h6 className="text-sm font-medium text-blue-600">
                Status - {project.status}
              </h6>
            </div>
            <hr className="mt-4" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Client;
