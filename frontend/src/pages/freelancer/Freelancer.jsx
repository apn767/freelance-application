import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Freelancer = () => {
  const [isDataUpdateOpen, setIsDataUpdateOpen] = useState(false);
  const navigate = useNavigate();
  const [freelancerData, setFreelancerData] = useState();
  const [skills, setSkills] = useState([]);
  const [description, setDescription] = useState('');
  const [freelancerId, setFreelancerId] = useState('');
  const [updateSkills, setUpdateSkills] = useState('');
  const [updateDescription, setUpdateDescription] = useState('');
  const [applicationsCount, setApplicationsCount] = useState([]);

  useEffect(() => {
    fetchUserData(localStorage.getItem('userId'));
    fetchApplications();
  }, []);

  const fetchUserData = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/fetch-freelancer/${id}`);
      setFreelancerData(response.data);
      if (response.data) {
        setFreelancerId(response.data._id);
        setSkills(response.data.skills);
        setDescription(response.data.description);
        setUpdateSkills(response.data.skills.join(', '));
        setUpdateDescription(response.data.description);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateUserData = async () => {
    try {
      await axios.post(`http://localhost:5000/update-freelancer`, {
        freelancerId,
        updateSkills: updateSkills.split(',').map(skill => skill.trim()),
        description: updateDescription
      });
      fetchUserData(freelancerId);
      setIsDataUpdateOpen(false);
      alert('User data updated');
    } catch (error) {
      console.error(error);
    }
  };

  const fetchApplications = async () => {
    try {
      const response = await axios.get('http://localhost:5000/fetch-applications');
      setApplicationsCount(response.data.filter(application => application.freelancerId === localStorage.getItem('userId')));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {freelancerData && (
        <div className="flex flex-col lg:flex-row gap-6 p-6 bg-gray-100">
          <div className="w-full lg:w-1/3 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-2xl font-semibold mb-4">Home Cards</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold mb-2">Current Projects</h4>
                <p className="text-xl">{freelancerData.currentProjects.length}</p>
                <button
                  className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  onClick={() => navigate('/my-projects')}
                >
                  View Projects
                </button>
              </div>
              <div className="bg-green-50 p-4 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold mb-2">Completed Projects</h4>
                <p className="text-xl">{freelancerData.completedProjects.length}</p>
                <button
                  className="mt-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                  onClick={() => navigate('/my-projects')}
                >
                  View Projects
                </button>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold mb-2">Applications</h4>
                <p className="text-xl">{applicationsCount.length}</p>
                <button
                  className="mt-2 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                  onClick={() => navigate('/myApplications')}
                >
                  View Applications
                </button>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold mb-2">Funds</h4>
                <p className="text-xl">Available: &#8377; {freelancerData.funds}</p>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-2/3 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-2xl font-semibold mb-4">Freelancer Details</h3>
            {!isDataUpdateOpen ? (
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold mb-2">My Skills</h4>
                  <div className="space-y-2">
                    {skills.map(skill => (
                      <span key={skill} className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">{skill}</span>
                    ))}
                    {skills.length === 0 && <p>No skills available</p>}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-2">Description</h4>
                  <p>{description || 'Please add your description'}</p>
                </div>

                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  onClick={() => setIsDataUpdateOpen(true)}
                >
                  Update
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label htmlFor="skills" className="block text-lg font-semibold mb-2">My Skills</label>
                  <input
                    type="text"
                    id="skills"
                    className="w-full border-gray-300 rounded-lg p-2"
                    placeholder="Enter skills"
                    value={updateSkills}
                    onChange={(e) => setUpdateSkills(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-lg font-semibold mb-2">Description</label>
                  <textarea
                    id="description"
                    className="w-full border-gray-300 rounded-lg p-2"
                    placeholder="Enter your description"
                    value={updateDescription}
                    onChange={(e) => setUpdateDescription(e.target.value)}
                  />
                </div>

                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                  onClick={updateUserData}
                >
                  Update
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Freelancer;
