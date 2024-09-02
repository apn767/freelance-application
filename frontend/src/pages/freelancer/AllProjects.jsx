import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AllProjects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [displayProjects, setDisplayProjects] = useState([]);
  const [allSkills, setAllSkills] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:5000/fetch-projects');
      setProjects(response.data);
      setDisplayProjects(response.data.reverse());

      const skills = response.data.flatMap(project => project.skills);
      setAllSkills([...new Set(skills)]);
    } catch (err) {
      console.log(err);
      fetchProjects();
    }
  };

  const handleCategoryCheckBox = (e) => {
    const value = e.target.value;
    setCategoryFilter(prev => e.target.checked
      ? [...prev, value]
      : prev.filter(skill => skill !== value)
    );
  };

  useEffect(() => {
    if (categoryFilter.length > 0) {
      setDisplayProjects(projects.filter(project =>
        categoryFilter.every(skill => project.skills.includes(skill))
      ).reverse());
    } else {
      setDisplayProjects(projects.reverse());
    }
  }, [categoryFilter, projects]);

  return (
    <>
      {projects.length > 0 && (
        <div className="flex flex-col lg:flex-row gap-8 p-6 bg-gray-100">
          <div className="w-full lg:w-1/4 bg-white rounded-lg shadow-md p-4">
            <h3 className="text-2xl font-semibold mb-4">Filters</h3>
            <hr className="mb-4" />
            <div className="mb-4">
              <h5 className="text-lg font-medium mb-2">Skills</h5>
              <div className="space-y-2">
                {allSkills.map(skill => (
                  <div className="flex items-center" key={skill}>
                    <input
                      className="form-checkbox h-4 w-4 text-blue-500 border-gray-300 rounded"
                      type="checkbox"
                      value={skill}
                      id={skill}
                      onChange={handleCategoryCheckBox}
                    />
                    <label className="ml-2 text-gray-700" htmlFor={skill}>
                      {skill}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full lg:w-3/4 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-2xl font-semibold mb-4">All Projects</h3>
            <hr className="mb-4" />
            {displayProjects.map(project => (
              <div
                className="bg-gray-50 p-4 mb-4 rounded-lg shadow-sm cursor-pointer hover:bg-gray-100"
                key={project._id}
                onClick={() => navigate(`/project/${project._id}`)}
              >
                <div className="flex justify-between mb-4">
                  <h3 className="text-xl font-bold">{project.title}</h3>
                  <p className="text-gray-500">{new Date(project.postedDate).toLocaleDateString()}</p>
                </div>
                <h5 className="text-lg font-semibold mb-2">Budget &#8377; {project.budget}</h5>
                <p className="text-gray-700 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.skills.map(skill => (
                    <span
                      key={skill}
                      className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between text-gray-700">
                  <p>{project.bids.length} bids</p>
                  <h6>
                    &#8377; {project.bids.length > 0
                      ? (project.bidAmounts.reduce((acc, amount) => acc + amount, 0) / project.bids.length).toFixed(2)
                      : 0} (avg bid)
                  </h6>
                </div>
                <hr className="mt-4" />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default AllProjects;
