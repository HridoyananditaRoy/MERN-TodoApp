import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const NoteDetailPage = () => {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/v1/get/${id}`);
        setNote(res.data.notes);
      } catch (error) {
        toast.error('Failed to fetch note');
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  if (loading) return <p className="text-white">Loading...</p>;
  if (!note) return <p className="text-white">Note not found</p>;

  return (
    <div className="min-h-screen bg-black text-white p-6 flex justify-center">
      <div className="bg-zinc-800 rounded-xl p-5 max-w-2xl w-full">
        <h1 className="text-3xl font-bold mb-4 text-green-400">{note.title}</h1>
        <p className="text-gray-300 text-lg">{note.desc}</p>
      </div>
    </div>
  );
};

export default NoteDetailPage;
