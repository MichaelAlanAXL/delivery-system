'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '../Header';

type Pedido = {
  _id: string;
  clientName: string;
  address: string;
  status: string;
};

export default function Pedidos() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const query = searchParams.get('q');

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        setLoading(true);

        const url = query
          ? `http://localhost:5000/api/deliveries/search?q=${encodeURIComponent(query)}`
          : `http://localhost:5000/api/deliveries`;

        const res = await fetch(url);
        const data = await res.json();
        setPedidos(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPedidos();
  }, [query]);

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
    <>
      <Header />
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">Lista de Pedidos</h1>

      <Link href="/deliveries/new-delivery">
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            + Nova Entrega
        </button>
      </Link>
    </div>

    {loading ? (
        <p>Carregando...</p>
      ) : pedidos.length === 0 ? (
        <p>Nenhum pedido encontrado.</p>
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

              {/* Em Preparo */}
              <button
                onClick={() => alterarStatus(pedido._id, 'in_progress')}
                disabled={pedido.status !== 'in_progress'} // desabilita caso contrário
                className={`${
                  pedido.status !== 'in_progress'
                  ? 'bg-yellow-300 cursor-not-allowed'
                  : 'bg-yellow-500 hover:bg-yellow-600'
                } text-white px-3 py-1 rounded`}
              >
                Em Preparo
              </button>

              {/* Saiu para Entrega */}
              <button
                onClick={() => alterarStatus(pedido._id, 'on_the_way')}
                disabled={pedido.status === 'delivered' || pedido.status === 'cancelled' || pedido.status === 'finalizado'}
                className={`${
                  pedido.status === 'delivered' || pedido.status === 'cancelled' || pedido.status === 'finalizado'
                  ? 'bg-blue-300 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600'
                } text-white px-3 py-1 rounded`}
              >
                Saiu para Entrega
              </button>

              {/* Finalizado */}
              <button
                onClick={() => alterarStatus(pedido._id, 'delivered')}
                disabled={pedido.status === 'cancelled' || pedido.status === 'finalizado'}
                className={`${
                  pedido.status === 'cancelled' || pedido.status === 'finalizado'
                  ? 'bg-green-300 cursor-not-allowed'
                  : 'bg-green-500 hover:bg-green-600'
                } text-white px-3 py-1 rounded`}
              >
                Finalizado
              </button>

              { /* Cancelado */ }
              <button  
                onClick={() => {
                  const confirmar = window.confirm(
                    'Tem certeza que deseja CANCELAR este pedido?'
                    );
                  if (confirmar) {
                    alterarStatus(pedido._id, 'cancelled');
                  }
                }}
                disabled={pedido.status === 'cancelled' || pedido.status === 'finalizado' || pedido.status === 'delivered' }
                className={`${
                  pedido.status === 'cancelled' || pedido.status  === 'finalizado' || pedido.status === 'delivered'
                  ? 'bg-red-300 cursor-not-allowed'
                  : 'bg-red-500 hover:bg-red-600'
                } text-white px-3 py-1 rounded`}
              >
                Cancelar
              </button>

              <Link href={`/deliveries/${pedido._id}`}>
                <button className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded">
                  + detalhes
                </button>
              </Link>

            </div>
          </div>
        ))
      )}
    </div>
    </>
  );
}
