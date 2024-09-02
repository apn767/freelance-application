import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    await axios
      .get('http://localhost:5000/fetch-users')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="all-users-page bg-gray-100 min-h-screen p-8">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">All Users</h3>

      <div className="all-users grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div
            className="user bg-white p-6 rounded-lg shadow-md"
            key={user._id}
          >
            <div className="mb-4">
              <span className="block text-sm font-medium text-gray-600">User ID</span>
              <p className="text-lg font-semibold text-gray-800">{user._id}</p>
            </div>
            <div className="mb-4">
              <span className="block text-sm font-medium text-gray-600">Username</span>
              <p className="text-lg font-semibold text-gray-800">{user.username}</p>
            </div>
            <div className="mb-4">
              <span className="block text-sm font-medium text-gray-600">Email</span>
              <p className="text-lg font-semibold text-gray-800">{user.email}</p>
            </div>
            <div>
              <span className="block text-sm font-medium text-gray-600">User Role</span>
              <p className="text-lg font-semibold text-gray-800">{user.usertype}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllUsers;
