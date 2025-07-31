import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
        <nav className="flex justify-between items-center p-4 bg-zinc-900 shadow-md">
          <h1 className="text-xl font-bold text-green-500">DreamzTracker</h1>
          <div className="space-x-4">
            <Link to="/" className="hover:text-green-400">Home</Link>
            <Link to="/create" className="hover:text-green-400 font-semibold">Create</Link>
            <button onClick={handleLogout} className="bg-red-600 px-3 py-1 rounded hover:bg-red-700">Logout</button>
          </div>
        </nav>
);

export default Navbar;
