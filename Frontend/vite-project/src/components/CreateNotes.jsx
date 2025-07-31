import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const CreateNotePage = () => {
  const baseUrl = import.meta.env.VITE_API_URL;
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [editId, setEditId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      toast.error('Unauthorized. Please login.');
      return navigate('/login');
    }
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await axios.get(`${baseUrl}/api/v1/get`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(Array.isArray(res.data?.notes) ? res.data.notes : []);

    } catch (error) {
      toast.error('Failed to fetch notes');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!title || !desc) return toast.error('Please fill in both fields');
    try {
      const res = await axios.post(
        `${baseUrl}/api/v1/create`,
        { title, desc },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNotes([res.data.note, ...notes]);
      setTitle('');
      setDesc('');
      toast.success('Note created');
    } catch {
      toast.error('Failed to create note');
    }
  };

  const handleUpdate = async () => {
    if (!editId) return;
    try {
      const res = await axios.put(
        `${baseUrl}/api/v1/update/${editId}`,
        { title, desc },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const updated = notes.map((note) =>
        note._id === editId ? res.data.note : note
      );
      setNotes(updated);
      setIsEditing(false);
      setEditId(null);
      setTitle('');
      setDesc('');
      toast.success('Note updated');
    } catch {
      toast.error('Failed to update note');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseUrl}/api/v1/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(notes.filter((note) => note._id !== id));
      toast.success('Note deleted');
    } catch {
      toast.error('Failed to delete note');
    }
  };

  const handleEditStart = (note) => {
    setTitle(note.title);
    setDesc(note.desc);
    setEditId(note._id);
    setIsEditing(true);
  };

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

      {/* Create/Edit form */}
      <div className="max-w-xl mx-auto p-4 mt-6 space-y-4">
        <h2 className="text-2xl font-semibold">{isEditing ? 'Edit Note' : 'New Note'}</h2>
        <input
          type="text"
          placeholder="Title"
          className="w-full px-4 py-2 rounded bg-zinc-800 text-white"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          className="w-full px-4 py-2 rounded bg-zinc-800 text-white"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        ></textarea>
        <button
          onClick={isEditing ? handleUpdate : handleCreate}
          className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded ${isEditing ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-green-700 hover:bg-green-800'}`}
        >
          <Plus size={18} />
          {isEditing ? 'Update Note' : 'Create Note'}
        </button>
      </div>

      {/* Notes list */}
      <div className="max-w-6xl mx-auto mt-10 px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p>Loading...</p>
        ) : notes.length === 0 ? (
          <p>No notes found</p>
        ) : (
          notes.map((note) => (
            <div key={note._id} className="bg-zinc-800 p-4 rounded-xl shadow hover:shadow-lg hover:bg-zinc-700 transition">
              <h3 className="text-lg font-bold text-green-400 mb-2">{note.title}</h3>
              <p className="text-gray-300">{note.desc}</p>
              <div className="flex justify-between mt-4">
                <button onClick={() => handleEditStart(note)} className="text-yellow-400 hover:text-yellow-300">Edit</button>
                <button onClick={() => handleDelete(note._id)} className="text-red-500 hover:text-red-400">Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CreateNotePage;


