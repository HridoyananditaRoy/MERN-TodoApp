import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Signup = () => {
   const baseUrl = import.meta.env.VITE_API_URL;
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!fullName || !email || !password) {
      toast.error('All fields are required');
      setIsLoading(false);
      return;
    }

    try {
      const res = await axios.post(`${baseUrl}/api/v1/user/signup`, {
        fullName,
        email,
        password,
      });

      toast.success(res.data.message || 'Signup successful');
      setFullName('');
      setEmail('');
      setPassword('');
      navigate('/login')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">Signup</h1>

        <div className="space-y-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-4 py-2 bg-zinc-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-green-600"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 bg-zinc-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-green-600"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 bg-zinc-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-green-600"
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-700 hover:bg-green-800 py-2 rounded font-semibold mt-2"
          >
            {isLoading ? 'Signing Up...' : 'Sign Up'}
          </button>
          <div>
           <p>Already a user? <Link to="/login" className="text-green-500 hover:underline"> Login here</Link></p>     
         </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
