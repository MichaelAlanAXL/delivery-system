'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [userName, setUserName] = useState('Carregando...');
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter():

  useEffect(() => {
    fetch('http://localhost:5000/api/users/me')
    .then(res=> res.json())
    .then(data => {
      if (data.name) setUserName(data.name);
      else setUserName('Usuário');
    })
    .catch(() => setUserName('Usuário'));
  }, []);

  // Lógica para buscar no banco os pedidos retornados na busca
  const handleSearch = () => {
    router.push(`/deliveries?q=${encodeURIComponent(searchTerm)}`);    
  };

  return (
    <header className="flex justify-between items-center bg-gray-800 text-white p-4">
      <h1 className="text-xl font-bold">Sistema de Entregas</h1>

      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Buscar pedido..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-white px-2 py-1 rounded text-black"
        />
        <button 
          onClick={handleSearch}
          className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded">
          🔍
        </button>
      </div>
      
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
