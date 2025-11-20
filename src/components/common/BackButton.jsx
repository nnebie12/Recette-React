import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function BackButton({ to, children, className }) {
  const navigate = useNavigate();

  function handleClick(e) {
    e.preventDefault();
    if (to) navigate(to);
    else navigate(-1);
  }

  return (
    <button onClick={handleClick} className={className} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '0.5rem 0.75rem', borderRadius: '6px', border: '1px solid #ddd', background: '#fff', cursor: 'pointer' }}>
      <span style={{ fontSize: '1.1rem' }}>←</span>
      <span>{children || 'Retour'}</span>
    </button>
  );
}
