import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { GeneralContext } from '../context/GeneralContext';

const Navbar = () => {
  const usertype = localStorage.getItem('usertype');
  const navigate = useNavigate();
  const { logout } = useContext(GeneralContext);

  return (
    <>
      {usertype === 'freelancer' &&
        <div className="navbar bg-white shadow-md p-4 flex justify-between items-center">
          <h3 className="text-xl font-bold text-blue-600 cursor-pointer" onClick={() => navigate('/')}>SmartBridge Project</h3>
          
          <div className="nav-options flex space-x-4">
            <p className="text-gray-700 hover:text-blue-600 cursor-pointer" onClick={() => navigate('/freelancer')}>Dashboard</p>
            <p className="text-gray-700 hover:text-blue-600 cursor-pointer" onClick={() => navigate('/all-projects')}>All Projects</p>
            <p className="text-gray-700 hover:text-blue-600 cursor-pointer" onClick={() => navigate('/my-projects')}>My Projects</p>
            <p className="text-gray-700 hover:text-blue-600 cursor-pointer" onClick={() => navigate('/myApplications')}>Applications</p>
            <p className="text-gray-700 hover:text-red-600 cursor-pointer" onClick={() => logout()}>Logout</p>
          </div>
        </div>
      }

      {usertype === 'client' &&
        <div className="navbar bg-white shadow-md p-4 flex justify-between items-center">
          <h3 className="text-xl font-bold text-blue-600 cursor-pointer" onClick={() => navigate('/')}>SmartBridge Project</h3>
          
          <div className="nav-options flex space-x-4">
            <p className="text-gray-700 hover:text-blue-600 cursor-pointer" onClick={() => navigate('/client')}>Dashboard</p>
            <p className="text-gray-700 hover:text-blue-600 cursor-pointer" onClick={() => navigate('/new-project')}>New Project</p>
            <p className="text-gray-700 hover:text-blue-600 cursor-pointer" onClick={() => navigate('/project-applications')}>Applications</p>
            <p className="text-gray-700 hover:text-red-600 cursor-pointer" onClick={() => logout()}>Logout</p>
          </div>
        </div>
      }

      {usertype === 'admin' &&
        <div className="navbar bg-white shadow-md p-4 flex justify-between items-center">
          <h3 className="text-xl font-bold text-blue-600 cursor-pointer" onClick={() => navigate('/')}>SmartBridge Project (admin)</h3>
          
          <div className="nav-options flex space-x-4">
            <p className="text-gray-700 hover:text-blue-600 cursor-pointer" onClick={() => navigate('/admin')}>Home</p>
            <p className="text-gray-700 hover:text-blue-600 cursor-pointer" onClick={() => navigate('/all-users')}>All Users</p>
            <p className="text-gray-700 hover:text-blue-600 cursor-pointer" onClick={() => navigate('/admin-projects')}>Projects</p>
            <p className="text-gray-700 hover:text-blue-600 cursor-pointer" onClick={() => navigate('/admin-applications')}>Applications</p>
            <p className="text-gray-700 hover:text-red-600 cursor-pointer" onClick={() => logout()}>Logout</p>
          </div>
        </div>
      }
    </>
  )
}

export default Navbar;
