// SendOtpPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const SendOtpPage = () => {
  const [email, setEmail] = useState('');

  const handleSendOtp = async () => {
    if (!email) return toast.error('Email required');
    try {
      const res = await axios.post('http://localhost:3000/api/v1/user/send-otp', { email });
      toast.success(res.data.message || 'OTP sent to email');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error sending OTP');
    }
  };

  return (
    <div className="p-6 text-white bg-black min-h-screen flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Send OTP to Email</h1>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-4 px-4 py-2 bg-zinc-800 text-white rounded"
      />
      <button onClick={handleSendOtp} className="bg-blue-600 px-4 py-2 rounded">
        Send OTP
      </button>
    </div>
  );
};

export default SendOtpPage;
