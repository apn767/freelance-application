import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userType = localStorage.getItem("usertype");
    if (userType === 'freelancer') {
      navigate("/freelancer")
    } else if (userType === 'client') {
      navigate("/client")
    } else if (userType === 'admin') {
      navigate("/admin")
    }
  }, [navigate]);

  return (
    <div className="landing-page min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white flex flex-col justify-between">

      <div className="landing-hero flex flex-col justify-between p-8">
        
        {/* Navigation Bar */}
        <div className="landing-nav flex justify-between items-center">
          <h3 className="text-2xl font-bold cursor-pointer" onClick={() => navigate('/')}>Smartbridge Project</h3>
          <button 
            className="bg-white text-blue-500 hover:bg-gray-200 px-4 py-2 rounded-lg font-semibold shadow transition duration-300"
            onClick={() => navigate('/authenticate')}
          >
            Sign In
          </button>
        </div>

        {/* Hero Section */}
        <div className="landing-hero-text text-center mt-32">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
            Empower Your Journey: <br/> Elevate Your Craft on Smartbridge Project
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
          Discover a platform that bridges the gap between talent and opportunity. Whether you're a freelancer seeking your next big project or a client looking for top-notch professionals, our application offers a seamless experience from project bidding to final delivery. Join a thriving community where skills meet demand, and creativity meets results. Your next opportunity is just a click away.
          </p>
          <button 
            className="bg-white text-blue-500 hover:bg-gray-200 px-6 py-3 rounded-lg font-semibold shadow transition duration-300"
            onClick={() => navigate('/authenticate')}
          >
            Join Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default Landing;
