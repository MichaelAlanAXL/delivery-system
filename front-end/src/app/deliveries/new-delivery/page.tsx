'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewDelivery() {
	const router = useRouter();

	const [clientName, setClientName] = useState('');
	const [address, setAddress] = useState('');

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			const response = await fetch('http://localhost:5000/api/deliveries/new-delivery', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ clientName, address }),
			});

			if (response.ok) {
				router.push('/deliveries'); // Redirect to page deliveries
			} else {
				console.error('Erro ao criar nova entrega');
			}

		} catch (error) {
			console.error('Error:', error);
		}
	};

	return (
		<div className="p-8">
			<h1 className="text-3x1 font-bold mb-6">New Delivery</h1>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label className="block mb-1 font-medium">Client Name</label>
					<input
						type="text"
						value={clientName}
						onChange={(e) => setClientName(e.target.value)}
						className="border px-3 py-2 rounded w-full"
						required
					/>
				</div>
				<div>
					<label className="block mb-1 font-medium">Address</label>
					<input
						type="text"
						value={address}
						onChange={(e) => setAddress(e.target.value)}
						className="border px-3 py-2 rounded w-full"
						required
					/>
				</div>
				<button	
					type="submit" 
					className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
				>
					Create Delivery
				</button>
			</form>
		</div>
	);
}