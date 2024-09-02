import React, { useContext } from 'react'
import { GeneralContext } from '../context/GeneralContext';

const Login = ({ setAuthType }) => {
  const { setEmail, setPassword, login } = useContext(GeneralContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    await login();
  }

  return (
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-sm mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      
      <div className="mb-4">
        <label htmlFor="floatingInput" className="block text-gray-700 text-sm font-bold mb-2">Email address</label>
        <input 
          type="email" 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
          id="floatingInput" 
          placeholder="name@example.com" 
          onChange={(e) => setEmail(e.target.value)} 
        />
      </div>

      <div className="mb-6">
        <label htmlFor="floatingPassword" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
        <input 
          type="password" 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
          id="floatingPassword" 
          placeholder="Password" 
          onChange={(e) => setPassword(e.target.value)} 
        />
      </div>

      <div className="flex items-center justify-between">
        <button 
          type="submit" 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
          onClick={handleLogin}
        >
          Sign in
        </button>
      </div>

      <p className="text-center text-sm mt-4">
        Not registered? <span 
          className="text-blue-500 hover:text-blue-700 cursor-pointer" 
          onClick={() => setAuthType('register')}
        >
          Register
        </span>
      </p>
    </form>
  );
}

export default Login;
