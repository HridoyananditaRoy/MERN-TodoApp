import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/protectedRoute';
import Home from './components/Home';
import CreateNotes from './components/CreateNotes';
import NoteDetailPage from './components/NoteDetailPage';
import Login from './components/Login';
import Signup from './components/Signup';
import NotesList from './components/NotesList';

const App = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/create"
        element={
          <ProtectedRoute>
            <CreateNotes />
          </ProtectedRoute>
        }
      />
      <Route
        path="/update/:id"
        element={
          <ProtectedRoute>
            <NoteDetailPage />
          </ProtectedRoute>
        }
      />
      <Route
       path='/view-notes'
       element={
        <ProtectedRoute>
          <NotesList />
        </ProtectedRoute>
       }
       />
    </Routes>
  );
};

export default App;
