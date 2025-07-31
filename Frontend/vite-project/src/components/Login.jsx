import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email || !password) {
      toast.error('Email and password are required');
      setIsLoading(false);
      return;
    }

    try {
      const res = await axios.post('http://localhost:3000/api/v1/user/login', {
        email,
        password,
      });

      toast.success(res.data.message || 'Login successful');
      setEmail('');
      setPassword('');
      // Optionally store token or user info in localStorage/session

      localStorage.setItem('token', res.data.token); // ✅ Store token
      console.log('Saved token:', res.data.token);

      navigate('/'); // Redirect to home

    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white">
      <form
        onSubmit={handleLogin}
        className="bg-zinc-900 p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>

        <div className="space-y-4">
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
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
          <div>
           <p>New user? <Link to="/signup" className="text-green-500 hover:underline">Sign up here</Link></p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
