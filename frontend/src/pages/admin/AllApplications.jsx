import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllApplications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    await axios
      .get('http://localhost:5000/fetch-applications')
      .then((response) => {
        setApplications(response.data.reverse());
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="user-applications-page bg-gray-100 min-h-screen p-8">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">All Applications</h3>

      <div className="user-applications-body space-y-6">
        {applications.map((application) => (
          <div
            className="user-application bg-white p-6 rounded-lg shadow-md"
            key={application._id}
          >
            <div className="user-application-body flex flex-col md:flex-row justify-between">
              <div className="user-application-half w-full md:w-1/2 mb-6 md:mb-0">
                <h4 className="text-xl font-medium text-gray-800">{application.title}</h4>
                <p className="text-gray-700 mt-2">{application.description}</p>
                <div className="mt-4">
                  <h5 className="text-lg font-semibold text-gray-800">Skills</h5>
                  <div className="application-skills flex flex-wrap mt-2 space-x-2">
                    {application.requiredSkills.map((skill) => (
                      <span
                        className="bg-indigo-100 text-indigo-600 text-sm font-medium mr-2 px-2.5 py-0.5 rounded"
                        key={skill}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <h6 className="text-lg font-semibold text-gray-800 mt-4">
                  Budget: &#8377; {application.budget}
                </h6>
                <h5 className="text-gray-700 mt-2">
                  <b>Client:</b> {application.clientName}
                </h5>
                <h5 className="text-gray-700 mt-1">
                  <b>Client ID:</b> {application.clientId}
                </h5>
                <h5 className="text-gray-700 mt-1">
                  <b>Client Email:</b> {application.clientEmail}
                </h5>
              </div>

              <div className="vertical-line hidden md:block w-px bg-gray-200 mx-4"></div>

              <div className="user-application-half w-full md:w-1/2">
                <div className="mt-4 md:mt-0">
                  <h5 className="text-lg font-semibold text-gray-800">Proposal</h5>
                  <p className="text-gray-700 mt-2">{application.proposal}</p>
                </div>
                <div className="mt-4">
                  <h5 className="text-lg font-semibold text-gray-800">Freelancer Skills</h5>
                  <div className="application-skills flex flex-wrap mt-2 space-x-2">
                    {application.freelancerSkills.map((skill) => (
                      <span
                        className="bg-indigo-100 text-indigo-600 text-sm font-medium mr-2 px-2.5 py-0.5 rounded"
                        key={skill}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <h6 className="text-lg font-semibold text-gray-800 mt-4">
                  Proposed Budget: &#8377; {application.bidAmount}
                </h6>
                <h5 className="text-gray-700 mt-2">
                  <b>Freelancer:</b> {application.freelancerName}
                </h5>
                <h5 className="text-gray-700 mt-1">
                  <b>Freelancer ID:</b> {application.freelancerId}
                </h5>
                <h5 className="text-gray-700 mt-1">
                  <b>Freelancer Email:</b> {application.freelancerEmail}
                </h5>
                <h6 className="text-lg font-semibold mt-4">
                  Status:{' '}
                  <span
                    className={`font-bold ${
                      application.status === 'Accepted' ? 'text-green-600' : 'text-gray-800'
                    }`}
                  >
                    {application.status}
                  </span>
                </h6>
              </div>
            </div>
            <hr className="mt-6 border-gray-200" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllApplications;
