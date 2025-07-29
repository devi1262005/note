import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NoteCard from '../components/NoteCard';

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/notes', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setNotes(data);
      setLoading(false);
    };
    fetchNotes();
  }, []);

  const handleEdit = (note) => {
    navigate(`/edit/${note._id}`);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    await fetch(`/api/notes/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    setNotes(notes.filter(note => note._id !== id));
  };

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto' }}>
      <h2>Your Notes</h2>
      <button onClick={() => navigate('/new')} style={{ marginBottom: 16 }}>New Note</button>
      {loading ? <div>Loading...</div> : (
        notes.length === 0 ? <div>No notes yet.</div> : (
          notes.map(note => (
            <NoteCard
              key={note._id}
              note={note}
              onEdit={handleEdit}
              onDelete={handleDelete}
              showActions={true}
            />
          ))
        )
      )}
    </div>
  );
};

export default Dashboard; 