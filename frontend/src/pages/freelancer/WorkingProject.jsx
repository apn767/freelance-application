import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { GeneralContext } from '../../context/GeneralContext';

const WorkingProject = () => {
  const { socket } = useContext(GeneralContext);
  const params = useParams();

  const [project, setProject] = useState(null);
  const [clientId, setClientId] = useState('');
  const [freelancerId, setFreelancerId] = useState(localStorage.getItem('userId'));
  const [projectId, setProjectId] = useState(params['id']);
  const [proposal, setProposal] = useState('');
  const [bidAmount, setBidAmount] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState('');
  const [projectLink, setProjectLink] = useState('');
  const [manualLink, setManualLink] = useState('');
  const [submissionDescription, setSubmissionDescription] = useState('');
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState(null);

  useEffect(() => {
    fetchProject(params['id']);
    joinSocketRoom();
  }, []);

  const joinSocketRoom = async () => {
    await socket.emit('join-chat-room', { projectId: params['id'], freelancerId: localStorage.getItem('userId') });
  };

  const fetchProject = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/fetch-project/${id}`);
      setProject(response.data);
      setClientId(response.data.clientId);
      setProjectId(response.data._id);
    } catch (err) {
      console.error(err);
    }
  };

  const handleBidding = async () => {
    try {
      await axios.post('http://localhost:5000/make-bid', { clientId, freelancerId, projectId, proposal, bidAmount, estimatedTime });
      setProposal('');
      setBidAmount(0);
      setEstimatedTime('');
      alert('Bidding successful!');
    } catch (err) {
      alert('Bidding failed! Try again.');
    }
  };

  const handleProjectSubmission = async () => {
    try {
      await axios.post('http://localhost:5000/submit-project', { clientId, freelancerId, projectId, projectLink, manualLink, submissionDescription });
      setProjectLink('');
      setManualLink('');
      setSubmissionDescription('');
      alert('Submission successful!');
    } catch (err) {
      alert('Submission failed! Try again.');
    }
  };

  const handleMessageSend = async () => {
    socket.emit('new-message', { projectId: params['id'], senderId: localStorage.getItem('userId'), message, time: new Date() });
    setMessage('');
    fetchChats();
  };

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/fetch-chats/${params['id']}`);
      setChats(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    socket.on('message-from-user', () => {
      fetchChats();
    });
  }, [socket]);

  return (
    <>
      {project ? (
        <div className="flex justify-between p-5 bg-gray-100 min-h-screen">
          {/* Project Details Section */}
          <div className="w-3/5 bg-white rounded-lg shadow-lg p-6 mr-6">
            <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
            <p className="text-gray-600 mb-6">{project.description}</p>
            <div className="mb-6">
              <h5 className="text-lg font-semibold mb-2">Required Skills</h5>
              <div className="flex flex-wrap gap-2">
                {project.skills.map((skill) => (
                  <span key={skill} className="bg-gray-200 px-3 py-1 rounded-full text-gray-700">{skill}</span>
                ))}
              </div>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-2">Budget</h5>
              <h6 className="text-lg font-bold text-gray-700">&#8377; {project.budget}</h6>
            </div>

            {project.status === 'Available' && (
              <div className="mt-6">
                <h4 className="text-xl font-semibold mb-4">Send Proposal</h4>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1" htmlFor="bidAmount">
                    Budget
                  </label>
                  <input
                    type="number"
                    id="bidAmount"
                    className="form-input w-full mb-3"
                    placeholder="Enter your bid amount"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1" htmlFor="estimatedTime">
                    Estimated Time (days)
                  </label>
                  <input
                    type="number"
                    id="estimatedTime"
                    className="form-input w-full mb-3"
                    placeholder="Enter estimated time"
                    value={estimatedTime}
                    onChange={(e) => setEstimatedTime(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1" htmlFor="proposal">
                    Describe Your Proposal
                  </label>
                  <textarea
                    id="proposal"
                    className="form-textarea w-full mb-3"
                    placeholder="Enter your proposal"
                    value={proposal}
                    onChange={(e) => setProposal(e.target.value)}
                  />
                </div>
                {!project.bids.includes(localStorage.getItem('userId')) ? (
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                    onClick={handleBidding}
                  >
                    Post Bid
                  </button>
                ) : (
                  <button
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg cursor-not-allowed"
                    disabled
                  >
                    Already Bid
                  </button>
                )}
              </div>
            )}

            {project.freelancerId === localStorage.getItem('userId') && (
              <div className="mt-6">
                <h4 className="text-xl font-semibold mb-4">Submit the Project</h4>
                {project.submissionAccepted ? (
                  <p className="text-green-600 font-semibold">Project Completed</p>
                ) : (
                  <>
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1" htmlFor="projectLink">
                        Project Link
                      </label>
                      <input
                        type="text"
                        id="projectLink"
                        className="form-input w-full mb-3"
                        placeholder="Enter project link"
                        value={projectLink}
                        onChange={(e) => setProjectLink(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1" htmlFor="manualLink">
                        Manual Link
                      </label>
                      <input
                        type="text"
                        id="manualLink"
                        className="form-input w-full mb-3"
                        placeholder="Enter manual link"
                        value={manualLink}
                        onChange={(e) => setManualLink(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1" htmlFor="submissionDescription">
                        Describe Your Work
                      </label>
                      <textarea
                        id="submissionDescription"
                        className="form-textarea w-full mb-3"
                        placeholder="Describe your work"
                        value={submissionDescription}
                        onChange={(e) => setSubmissionDescription(e.target.value)}
                      />
                    </div>
                    {project.submission ? (
                      <button
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg cursor-not-allowed"
                        disabled
                      >
                        Already Submitted
                      </button>
                    ) : (
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                        onClick={handleProjectSubmission}
                      >
                        Submit Project
                      </button>
                    )}
                  </>
                )}
              </div>
            )}
          </div>

          {/* Chat Section */}
          <div className="w-2/5 bg-white rounded-lg shadow-lg p-6">
            <h4 className="text-xl font-semibold mb-4">Chat with the Client</h4>
            <hr className="mb-4" />
            {project && project.freelancerId === localStorage.getItem('userId') ? (
              <div>
                {chats ? (
                  <div className="overflow-y-auto max-h-96 mb-4">
                    {chats.messages.map((message) => (
                      <div key={message.id} className={`mb-3 ${message.senderId === localStorage.getItem('userId') ? 'text-right' : 'text-left'}`}>
                        <div className={`inline-block p-3 rounded-lg ${message.senderId === localStorage.getItem('userId') ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                          <p>{message.text}</p>
                          <h6 className="text-xs mt-1">{message.time.slice(5, 10)} - {message.time.slice(11, 19)}</h6>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No messages yet.</p>
                )}
                <hr />
                <div className="flex mt-4">
                  <input
                    type="text"
                    className="form-control flex-1 border border-gray-300 rounded-lg p-2"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <button
                    className="ml-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
                    onClick={handleMessageSend}
                  >
                    Send
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-gray-400">Chat will be available once the project is assigned to you.</p>
            )}
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">Loading project details...</p>
      )}
    </>
  );
};

export default WorkingProject;
