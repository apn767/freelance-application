import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NewProject = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState(0);
  const [skills, setSkills] = useState('');
  const [category, setCategory] = useState('');
  const [timeline, setTimeline] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async () => {
    await axios
      .post('http://localhost:5000/new-project', {
        title,
        description,
        budget,
        skills,
        category,
        timeline,
        clientId: localStorage.getItem('userId'),
        clientName: localStorage.getItem('username'),
        clientEmail: localStorage.getItem('email'),
      })
      .then((response) => {
        alert('New project added!!');
        setTitle('');
        setDescription('');
        setBudget(0);
        setSkills('');
        setCategory('');
        setTimeline('');
        navigate('/client');
      })
      .catch((err) => {
        alert('Operation failed!!');
      });
  };

  return (
    <div className="new-project-page bg-gray-100 min-h-screen flex flex-col items-center py-10 px-4 sm:px-6 lg:px-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Post New Project</h3>

      <div className="new-project-form bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        {/* Project Title */}
        <div className="form-floating mb-4">
        <label htmlFor="floatingTitle" className="text-sm text-gray-600">
            Project Title
          </label>
          <input
            type="text"
            className="form-control mb-3 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="floatingTitle"
            placeholder="Project title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          
        </div>

        {/* Project Description */}
        <div className="form-floating mb-4">
        <label htmlFor="floatingDescription" className="text-sm text-gray-600">
            Description
          </label>
          <textarea
            className="form-control mb-3 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="floatingDescription"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          
        </div>

        {/* Project Budget */}
        <div className="form-floating mb-4">
        <label htmlFor="floatingBudget" className="text-sm text-gray-600">
            Budget (in ₹)
          </label>
          <input
            type="number"
            className="form-control mb-3 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="floatingBudget"
            placeholder="Budget (in ₹)"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          />
          
        </div>

        {/* Required Skills */}
        <div className="form-floating mb-4">
        <label htmlFor="floatingSkills" className="text-sm text-gray-600">
            Required Skills (separate each with a comma)
          </label>
          <input
            type="text"
            className="form-control mb-3 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="floatingSkills"
            placeholder="Required skills (separate each with a comma)"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
          
        </div>

        {/* Project Category */}
        <div className="form-floating mb-4">
        <label htmlFor="floatingCategory" className="text-sm text-gray-600">
            Project Category
          </label>
          <input
            type="text"
            className="form-control mb-3 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="floatingCategory"
            placeholder="Project Category (e.g., Web Development, Mobile App)"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          
        </div>

        {/* Estimated Timeline */}
        <div className="form-floating mb-4">
        <label htmlFor="floatingTimeline" className="text-sm text-gray-600">
            Estimated Timeline
          </label>
          <input
            type="text"
            className="form-control mb-3 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="floatingTimeline"
            placeholder="Estimated Timeline (e.g., 2 weeks, 1 month)"
            value={timeline}
            onChange={(e) => setTimeline(e.target.value)}
          />
          
        </div>

        <button
          className="btn bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors w-full"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default NewProject;
