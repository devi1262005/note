import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ViewNote = () => {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) return navigate('/dashboard');
      const data = await res.json();
      setNote(data);
      setLoading(false);
    };
    fetchNote();
  }, [id, navigate]);

  if (loading) return <div>Loading...</div>;
  if (!note) return null;

  return (
    <div style={{ maxWidth: 500, margin: '2rem auto' }}>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <button onClick={() => navigate('/dashboard')}>Memory atlas</button>
    </div>
  );
};

export default ViewNote; 
