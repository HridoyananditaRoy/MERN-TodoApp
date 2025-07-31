// VerifyOtpPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const VerifyOtpPage = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const handleVerifyOtp = async () => {
    if (!email || !otp) return toast.error('Email and OTP required');
    try {
      const res = await axios.post('http://localhost:3000/api/v1/user/verify-otp', { email, otp });
      localStorage.setItem('token', res.data.token); // ✅ Save JWT
      toast.success('OTP Verified!');
      navigate('/'); // or dashboard
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid OTP');
    }
  };

  return (
    <div className="p-6 text-white bg-black min-h-screen flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Verify OTP</h1>
      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-4 px-4 py-2 bg-zinc-800 text-white rounded"
      />
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="mb-4 px-4 py-2 bg-zinc-800 text-white rounded"
      />
      <button onClick={handleVerifyOtp} className="bg-green-600 px-4 py-2 rounded">
        Verify OTP
      </button>
    </div>
  );
};

export default VerifyOtpPage;
