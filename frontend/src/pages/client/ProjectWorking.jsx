import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { GeneralContext } from '../../context/GeneralContext';

const ProjectWorking = () => {
  const { socket } = useContext(GeneralContext);
  const params = useParams();

  const [project, setProject] = useState(null);
  const [clientId, setClientId] = useState(localStorage.getItem('userId'));
  const [projectId, setProjectId] = useState(params['id']);
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState(null);

  useEffect(() => {
    fetchProject(params['id']);
    joinSocketRoom();
  }, []);

  const joinSocketRoom = async () => {
    await socket.emit('join-chat-room', { projectId: params['id'], freelancerId: '' });
  };

  const fetchProject = async (id) => {
    await axios.get(`http://localhost:5000/fetch-project/${id}`).then((response) => {
      setProject(response.data);
      setProjectId(response.data._id);
      setClientId(response.data.clientId);
    }).catch((err) => {
      console.log(err);
    });
  };

  const handleApproveSubmission = async () => {
    await axios.get(`http://localhost:5000/approve-submission/${params['id']}`).then((response) => {
      fetchProject(params['id']);
      alert('Submission approved!!');
    }).catch((err) => {
      console.log(err);
    });
  };

  const handleRejectSubmission = async () => {
    await axios.get(`http://localhost:5000/reject-submission/${params['id']}`).then((response) => {
      fetchProject(params['id']);
      alert('Submission rejected!!');
    }).catch((err) => {
      console.log(err);
    });
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
    await axios.get(`http://localhost:5000/fetch-chats/${params['id']}`).then((response) => {
      setChats(response.data);
    });
  };

  useEffect(() => {
    socket.on('message-from-user', () => {
      fetchChats();
    });
  }, [socket]);

  return (
    <>
      {project ? (
        <div className="flex justify-between p-5 bg-gray-100">
          <div className="w-3/5 bg-white rounded-lg shadow-lg p-6 mr-6">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
              <p className="text-gray-600 mb-6">{project.description}</p>
              <div className="mb-6">
                <h5 className="text-lg font-semibold mb-2">Required skills</h5>
                <div className="flex flex-wrap gap-2">
                  {project.skills.map((skill) => (
                    <p key={skill} className="bg-gray-200 px-3 py-1 rounded-lg text-gray-700">{skill}</p>
                  ))}
                </div>
              </div>
              <div>
                <h5 className="text-lg font-semibold mb-2">Budget</h5>
                <h6 className="text-lg font-bold text-gray-700">&#8377; {project.budget}</h6>
              </div>
            </div>

            {project.freelancerId && project.freelancerId !== "" && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-xl font-semibold mb-4">Submission</h4>
                <div>
                  {project.submission ? (
                    <div className="p-4 bg-white rounded-lg shadow-md">
                      <div className="mb-4">
                        <h5 className="font-semibold">Project Link:</h5>
                        <a href={project.projectLink} target='_blank' className="text-blue-500">{project.projectLink}</a>
                      </div>
                      <div className="mb-4">
                        <h5 className="font-semibold">Manual Link:</h5>
                        <a href={project.manulaLink} target='_blank' className="text-blue-500">{project.manulaLink}</a>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Description for work</h5>
                        <p className="text-gray-600">{project.submissionDescription}</p>
                      </div>
                      {project.submissionAccepted ? (
                        <h5 className="text-green-500 font-semibold mt-4">Project completed!!</h5>
                      ) : (
                        <div className="flex mt-4 space-x-4">
                          <button className="btn bg-green-500 text-white py-2 px-4 rounded-lg" onClick={handleApproveSubmission}>Approve</button>
                          <button className="btn bg-red-500 text-white py-2 px-4 rounded-lg" onClick={handleRejectSubmission}>Reject</button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-500">No submissions yet!!</p>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="w-2/5 bg-white rounded-lg shadow-lg p-6">
            <h4 className="text-xl font-semibold mb-4">Chat with the Freelancer</h4>
            <hr className="mb-4" />
            {project.freelancerId ? (
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
                ) : ""}
                <hr />
                <div className="flex mt-4">
                  <input type="text" className="form-control flex-1 border border-gray-300 rounded-lg p-2" placeholder='Enter something...' value={message} onChange={(e) => setMessage(e.target.value)} />
                  <button className="ml-4 bg-blue-500 text-white py-2 px-4 rounded-lg" onClick={handleMessageSend}>Send</button>
                </div>
              </div>
            ) : (
              <i className="text-gray-400">Chat will be enabled if the project is assigned to you!!</i>
            )}
          </div>
        </div>
      ) : ""}
    </>
  );
};

export default ProjectWorking;
