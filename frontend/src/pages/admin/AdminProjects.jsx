import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminProjects = () => {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [displayProjects, setDisplayProjects] = useState([]);
  const [allSkills, setAllSkills] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    await axios
      .get('http://localhost:5000/fetch-projects')
      .then((response) => {
        setProjects(response.data);
        setDisplayProjects(response.data.reverse());

        response.data.map((project) => {
          project.skills.map((skill) => {
            if (!allSkills.includes(skill)) {
              setAllSkills((prevSkills) => [...prevSkills, skill]);
            }
          });
        });
      })
      .catch((err) => {
        console.log(err);
        fetchProjects();
      });
  };

  const handleCategoryCheckBox = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setCategoryFilter([...categoryFilter, value]);
    } else {
      setCategoryFilter(categoryFilter.filter((size) => size !== value));
    }
  };

  useEffect(() => {
    if (categoryFilter.length > 0) {
      setDisplayProjects(
        projects
          .filter((project) =>
            categoryFilter.every((skill) => project.skills.includes(skill))
          )
          .reverse()
      );
    } else {
      setDisplayProjects(projects.reverse());
    }
  }, [categoryFilter]);

  return (
    <div className="all-projects-page bg-gray-100 min-h-screen p-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="project-filters bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-700">Filters</h3>
          <hr className="my-4" />

          <div className="filters">
            <h5 className="text-lg font-medium text-gray-600">Skills</h5>

            {allSkills.length > 0 ? (
              <div className="filter-options mt-4 space-y-2">
                {allSkills.map((skill) => (
                  <div className="form-check" key={skill}>
                    <input
                      className="form-check-input mr-2"
                      type="checkbox"
                      value={skill}
                      id={skill}
                      onChange={handleCategoryCheckBox}
                    />
                    <label
                      className="form-check-label text-gray-600"
                      htmlFor={skill}
                    >
                      {skill}
                    </label>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No skills available</p>
            )}
          </div>
        </div>

        <div className="projects-list md:col-span-3 bg-white shadow-md rounded-lg p-6">
          <h3 className="text-2xl font-semibold text-gray-700">All Projects</h3>
          <hr className="my-4" />

          {displayProjects.map((project) => (
            <div
              className="listed-project border-b border-gray-200 pb-4 mb-4"
              key={project._id}
            >
              <div className="listed-project-head flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-800">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-500">{project.postedDate}</p>
              </div>
              <h5 className="text-lg font-medium text-indigo-600">
                Budget: &#8377; {project.budget}
              </h5>
              <h5 className="text-lg font-medium text-gray-600">
                Client: {project.clientName} ({project.clientEmail})
              </h5>
              <p className="text-gray-600 mt-2">{project.description}</p>
              <div className="skills flex flex-wrap mt-3">
                {project.skills.map((skill) => (
                  <span
                    className="bg-indigo-100 text-indigo-600 text-sm font-medium mr-2 px-2.5 py-0.5 rounded"
                    key={skill}
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="bids-data mt-4 flex justify-between items-center">
                <p className="text-sm text-gray-600">{project.bids.length} bids</p>
                <h6 className="text-lg font-medium text-green-600">
                  Avg Bid: &#8377;{' '}
                  {project.bids.length > 0
                    ? (
                        project.bidAmounts.reduce(
                          (accumulator, currentValue
                        ) => accumulator + currentValue, 0) / project.bids.length
                      ).toFixed(2)
                    : 0}
                </h6>
              </div>
              <h5 className="text-sm font-medium text-gray-600 mt-2">
                Status: <span className="text-blue-600">{project.status}</span>
              </h5>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminProjects;
