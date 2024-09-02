import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyApplications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await axios.get("http://localhost:5000/fetch-applications");
      setApplications(response.data.reverse());
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h3 className="text-2xl font-semibold mb-6">My Applications</h3>

      <div className="space-y-6">
        {applications
          .filter(application => application.freelancerId === localStorage.getItem('userId'))
          .map(application => (
            <div key={application._id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="flex">
                <div className="w-full p-6 border-r border-gray-200">
                  <h4 className="text-xl font-semibold mb-2">{application.title}</h4>
                  <p className="text-gray-700 mb-4">{application.description}</p>
                  <div className="mb-4">
                    <h5 className="font-semibold mb-2">Skills</h5>
                    <div className="flex flex-wrap gap-2">
                      {application.requiredSkills.map(skill => (
                        <span key={skill} className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded">{skill}</span>
                      ))}
                    </div>
                  </div>
                  <h6 className="font-semibold">Budget - &#8377; {application.budget}</h6>
                </div>

                <div className="w-full p-6">
                  <div className="mb-4">
                    <h5 className="font-semibold mb-2">Proposal</h5>
                    <p className="text-gray-700">{application.proposal}</p>
                  </div>
                  <div className="mb-4">
                    <h5 className="font-semibold mb-2">Skills</h5>
                    <div className="flex flex-wrap gap-2">
                      {application.freelancerSkills.map(skill => (
                        <span key={skill} className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded">{skill}</span>
                      ))}
                    </div>
                  </div>
                  <h6 className="font-semibold">Proposed Budget - &#8377; {application.bidAmount}</h6>
                  <h6 className="font-semibold">Status: <span className={`font-bold ${application.status === 'Accepted' ? 'text-green-600' : application.status === 'Rejected' ? 'text-red-600' : 'text-gray-600'}`}>{application.status}</span></h6>
                </div>
              </div>
              <hr className="my-4" />
            </div>
          ))}
      </div>
    </div>
  );
};

export default MyApplications;
