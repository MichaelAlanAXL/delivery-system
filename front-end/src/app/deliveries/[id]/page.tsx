'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Header from '../../Header';

type Pedido = {
  _id: string;
  clientName: string;
  address: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
};

export default function PedidoDetalhes() {
  const { id } = useParams();
  const [pedido, setPedido] = useState<Pedido | null>(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/deliveries/${id}`)
      .then((res) => res.json())
      .then((data) => setPedido(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!pedido) {
    return <div className="p-8">Carregando...</div>;
  }

  return (
    <>
      <Header />
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">Detalhes do Pedido</h1>

        <div className="bg-white p-6 rounded shadow">
          <p><strong>ID:</strong> {pedido._id}</p>
          <p><strong>Cliente:</strong> {pedido.clientName}</p>
          <p><strong>Endereço:</strong> {pedido.address}</p>
          <p><strong>Status:</strong> {pedido.status}</p>
          {pedido.createdAt && (
            <p><strong>Criado em:</strong> {new Date(pedido.createdAt).toLocaleString()}</p>
          )}
          {pedido.updatedAt && (
            <p><strong>Atualizado em:</strong> {new Date(pedido.updatedAt).toLocaleString()}</p>
          )}
        </div>

        <Link href="/deliveries">
          <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
            Voltar
          </button>
        </Link>
      </div>
    </>
  );
}
