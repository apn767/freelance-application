import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Admin = () => {
  const navigate = useNavigate();

  const [projectsCount, setProjectsCount] = useState(0);
  const [completedProsCount, setCompletedProsCount] = useState(0);
  const [applicationsCount, setApplicationsCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);

  useEffect(() => {
    fetchProjects();
    fetchApplications();
    fetchUsers();
  }, []);

  const fetchProjects = async () => {
    await axios
      .get('http://localhost:5000/fetch-projects')
      .then((response) => {
        setProjectsCount(response.data.length);
        const comPros = response.data.filter((pro) => pro.status === 'Completed');
        setCompletedProsCount(comPros.length);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchApplications = async () => {
    await axios
      .get('http://localhost:5000/fetch-applications')
      .then((response) => {
        setApplicationsCount(response.data.length);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchUsers = async () => {
    await axios
      .get('http://localhost:5000/fetch-users')
      .then((response) => {
        setUsersCount(response.data.length);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="admin-page bg-gray-100 min-h-screen p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="home-card bg-white shadow-lg rounded-lg p-6 text-center">
          <h4 className="text-lg font-semibold text-gray-700">All Projects</h4>
          <p className="text-2xl font-bold text-indigo-600">{projectsCount}</p>
          <button
            className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-500 transition"
            onClick={() => navigate('/admin-projects')}
          >
            View Projects
          </button>
        </div>

        <div className="home-card bg-white shadow-lg rounded-lg p-6 text-center">
          <h4 className="text-lg font-semibold text-gray-700">Completed Projects</h4>
          <p className="text-2xl font-bold text-green-600">{completedProsCount}</p>
          <button
            className="mt-4 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-500 transition"
            onClick={() => navigate('/admin-projects')}
          >
            View Projects
          </button>
        </div>

        <div className="home-card bg-white shadow-lg rounded-lg p-6 text-center">
          <h4 className="text-lg font-semibold text-gray-700">Applications</h4>
          <p className="text-2xl font-bold text-blue-600">{applicationsCount}</p>
          <button
            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-500 transition"
            onClick={() => navigate('/admin-applications')}
          >
            View Applications
          </button>
        </div>

        <div className="home-card bg-white shadow-lg rounded-lg p-6 text-center">
          <h4 className="text-lg font-semibold text-gray-700">Users</h4>
          <p className="text-2xl font-bold text-purple-600">{usersCount}</p>
          <button
            className="mt-4 bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-500 transition"
            onClick={() => navigate('/all-users')}
          >
            View Users
          </button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
