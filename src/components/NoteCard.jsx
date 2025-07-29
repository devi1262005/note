import React from 'react';

const NoteCard = ({ note, onEdit, onDelete, showActions = false }) => {
  return (
    <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '1rem', marginBottom: '1rem', background: '#fff' }}>
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      {showActions && (
        <div style={{ marginTop: '1rem' }}>
          <button onClick={() => onEdit(note)}>Edit</button>
          <button onClick={() => onDelete(note._id)} style={{ marginLeft: '0.5rem', color: 'red' }}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default NoteCard; 