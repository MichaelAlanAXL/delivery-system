'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type Pedido = {
  _id: string;
  cliente: string;
  status: string;
};

export default function Pedidos() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/deliveries')
      .then((res) => res.json())
      .then((data) => setPedidos(data))
      .catch((err) => console.error(err));
  }, []);

  const alterarStatus = (id: string, novoStatus: string) => {
    fetch(`http://localhost:5000/api/deliveries/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: novoStatus }),
    })
      .then(() => {
        setPedidos((prev) =>
          prev.map((p) => (p._id === id ? { ...p, status: novoStatus } : p))
        );
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">Lista de Pedidos</h1>

      <Link href="/deliveries/new-delivery">
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            + Nova Entrega
        </button>
      </Link>
    </div>

      {pedidos.length === 0 ? (
        <p>Carregando...</p>
      ) : (
        pedidos.map((pedido) => (
          <div
            key={pedido._id}
            className="mb-4 p-4 border rounded-lg shadow-sm bg-white"
          >
            <p className="font-semibold">Cliente: {pedido.clientName}</p>
            <p>Endereço: {pedido.address}</p>
            <p>Status: {pedido.status}</p>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => alterarStatus(pedido._id, 'in_progress')}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Em Preparo
              </button>
              <button
                onClick={() => alterarStatus(pedido._id, 'delivered')}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Saiu para Entrega
              </button>
              <button
                onClick={() => alterarStatus(pedido._id, 'delivered')}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              >
                Finalizado
              </button>
              <button  
                onClick={() => {
                  const confirmar = window.confirm(
                    'Tem certeza que deseja CANCELAR este pedido?'
                    );
                  if (confirmar) {
                    alterarStatus(pedido._id, 'cancelled');
                  }
                }}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Cancelar
              </button>

            </div>
          </div>
        ))
      )}
    </div>
  );
}
