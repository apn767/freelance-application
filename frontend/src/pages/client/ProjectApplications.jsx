import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProjectApplications = () => {
  const [applications, setApplications] = useState([]);
  const [displayApplications, setDisplayApplications] = useState([]);
  const [projectTitles, setProjectTitles] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    await axios
      .get('http://localhost:5000/fetch-applications')
      .then((response) => {
        const filteredApplications = response.data.filter(
          (application) => application.clientId === localStorage.getItem('userId')
        );
        setApplications(filteredApplications);
        setDisplayApplications(filteredApplications.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (applications.length > 0) {
      applications.map((application) => {
        projectTitles.includes(application.title)
          ? setProjectTitles([...projectTitles])
          : setProjectTitles([...projectTitles, application.title]);
      });
    }
  }, [applications]);

  useEffect(() => {
    if (projectTitles.length > 0) {
      projectTitles.filter((title) => !projectTitles.includes(title));
    }
  }, [projectTitles]);

  const handleApprove = async (id) => {
    await axios
      .get(`http://localhost:5000/approve-application/${id}`)
      .then((response) => {
        alert('Application approved');
        fetchApplications();
      })
      .catch((err) => {
        alert('Operation failed!!');
      });
  };

  const handleReject = async (id) => {
    await axios
      .get(`http://localhost:5000/reject-application/${id}`)
      .then((response) => {
        alert('Application rejected!!');
        fetchApplications();
      })
      .catch((err) => {
        alert('Operation failed!!');
      });
  };

  const [projectFilter, setProjectFilter] = useState('');

  const handleFilterChange = (value) => {
    if (value === '') {
      setDisplayApplications(applications.reverse());
    } else {
      setDisplayApplications(applications.filter((application) => application.title === value).reverse());
    }
  };

  return (
    <div className="client-applications-page bg-gray-100 min-h-screen py-10 px-6 sm:px-10 lg:px-20">
      {projectTitles.length > 0 && (
        <div className="mb-8 flex items-center justify-between">
          <h3 className="text-2xl font-bold text-gray-800">Applications</h3>

          <select
            className="form-control bg-white border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => handleFilterChange(e.target.value)}
          >
            <option value="">All Projects</option>
            {projectTitles.map((title) => (
              <option key={title} value={title}>
                {title}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="client-applications-body space-y-6">
        {displayApplications.map((application) => (
          <div className="client-application bg-white p-6 rounded-lg shadow-md" key={application._id}>
            <div className="client-application-body flex flex-col lg:flex-row">
              <div className="client-application-half flex-1">
                <h4 className="text-xl font-bold text-gray-800">{application.title}</h4>
                <p className="text-gray-700 mt-2">{application.description}</p>
                <div className="application-skills mt-4">
                  <h5 className="text-gray-600 font-medium">Skills Required</h5>
                  <div className="flex flex-wrap mt-2">
                    {application.requiredSkills.map((skill) => (
                      <span
                        key={skill}
                        className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm mr-2 mb-2"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <h6 className="text-gray-800 mt-4">Budget: &#8377; {application.budget}</h6>
              </div>

              <div className="vertical-line hidden lg:block w-px bg-gray-300 mx-6"></div>

              <div className="client-application-half flex-1 mt-6 lg:mt-0">
                <div className="mt-4">
                  <h5 className="text-gray-600 font-medium">Proposal</h5>
                  <p className="text-gray-700 mt-2">{application.proposal}</p>
                </div>

                <div className="application-skills mt-4">
                  <h5 className="text-gray-600 font-medium">Freelancer Skills</h5>
                  <div className="flex flex-wrap mt-2">
                    {application.freelancerSkills.map((skill) => (
                      <span
                        key={skill}
                        className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm mr-2 mb-2"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <h6 className="text-gray-800 mt-4">Proposed Budget: &#8377; {application.bidAmount}</h6>

                <div className="approve-btns mt-6">
                  {application.status === 'Pending' ? (
                    <div className="flex space-x-4">
                      <button
                        className="btn bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
                        onClick={() => handleApprove(application._id)}
                      >
                        Approve
                      </button>
                      <button
                        className="btn bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
                        onClick={() => handleReject(application._id)}
                      >
                        Decline
                      </button>
                    </div>
                  ) : (
                    <h6 className="text-gray-700 mt-4">
                      Status: <b>{application.status}</b>
                    </h6>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectApplications;
