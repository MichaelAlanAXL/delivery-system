'use client';

import { useEffect, useState } from 'react';

export default function Header() {
  const [userName, setUserName] = useState('Carregando...');

  useEffect(() => {
    fetch('http://localhost:5000/api/users/me')
    .then(res=> res.json())
    .then(data => {
      if (data.name) setUserName(data.name);
      else setUserName('Usuário');
    })
    .catch(() => setUserName('Usuário'));
  }, []);

  return (
    <header className="flex justify-between items-center bg-gray-800 text-white p-4">
      <h1 className="text-xl font-bold">Sistema de Entregas</h1>
      <div className="flex items-center space-x-4">
        <span className="font-medium">👤 {userName}</span>
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
        >
          Sair
        </button>
      </div>
    </header>
  );
}
