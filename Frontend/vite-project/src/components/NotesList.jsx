import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const NotesList = () => {
  const baseUrl = import.meta.env.VITE_API_URL;
  const [notes, setNotes] = useState([]);
  const [filterNotes, setFilterNotes] = useState([]);
  const [searchNotes, setSearchNotes] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${baseUrl}/api/v1/get`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNotes(res.data.notes || []);
        setFilterNotes(res.data.notes);

      } catch (err) {
        if (err.response?.status === 401) {
            toast.error('Session expired. Please login.');
            navigate('/login');
}

      }
    };
    fetchNotes();
  }, []);

  useEffect(() => {
    const result = notes.filter(note =>
      note.title.toLowerCase().includes(searchNotes.toLowerCase())
    );
    setFilterNotes(result);
  }, [searchNotes, notes]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Logged out');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 bg-zinc-900 shadow-md">
        <h1 className="text-xl font-bold text-green-500">DreamzTracker</h1>
        <div className="space-x-4">
          <Link to="/" className="hover:text-green-400">Home</Link>
          <Link to="/create" className="hover:text-green-400 font-semibold">Create</Link>
          <button onClick={handleLogout} className="bg-red-600 px-3 py-1 rounded hover:bg-red-700">Logout</button>
        </div>
      </nav>

      {/* Content */}
      <div className="min-h-screen bg-zinc-950 text-white px-6 py-10">
        <h2 className="text-2xl font-bold mb-6 text-green-400 border-b border-zinc-700 pb-2">
          📄 View Your Notes
        </h2>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by Title"
            value={searchNotes}
            onChange={(e) => setSearchNotes(e.target.value)}
            className="w-full sm:w-1/2 px-4 py-2 rounded-lg bg-zinc-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filterNotes?.length > 0 ? (
            filterNotes.map((note) => (
              <div
                key={note._id}
                className="bg-zinc-900 border border-zinc-700 p-5 rounded-xl shadow-lg transition duration-200 hover:scale-[1.02] hover:border-green-400 hover:bg-zinc-800"
              >
                <h3 className="text-xl font-semibold text-green-300 mb-2">{note.title}</h3>
                <p className="text-zinc-300">{note.desc}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-400 col-span-full text-center">No matching notes found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotesList;
