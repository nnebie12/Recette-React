import { useState } from 'react';

export default function EditRecette({ recette, onSave, onCancel }) {
	const [form, setForm] = useState({
		title: recette?.title || '',
		preparation: recette?.preparation || ''
	});

	function handleChange(e) {
		const { name, value } = e.target;
		setForm(prev => ({ ...prev, [name]: value }));
	}

	function handleSubmit(e) {
		e.preventDefault();
		onSave({ ...recette, ...form });
	}

	return (
		<div className="bg-white p-6 rounded-md shadow border border-gray-200">
			<h2 className="text-xl font-semibold mb-4 text-gray-900">Modifier la Recette</h2>

			<form onSubmit={handleSubmit} className="space-y-4">

				<div className="flex flex-col">
					<label className="text-sm font-medium text-gray-700 mb-1">Titre</label>
					<input
						name="title"
						value={form.title}
						onChange={handleChange}
						className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none bg-gray-50"
					/>
				</div>

				<div className="flex flex-col">
					<label className="text-sm font-medium text-gray-700 mb-1">Préparation</label>
					<textarea
						name="preparation"
						value={form.preparation}
						onChange={handleChange}
						className="border border-gray-300 rounded-md px-3 py-2 bg-gray-50 h-32 focus:outline-none"
					/>
				</div>

				<div className="flex gap-3">
					<button
						type="submit"
						className="px-5 py-2 rounded-md text-white font-medium shadow"
						style={{ backgroundColor: "#CDA077" }}
					>
						Enregistrer
					</button>

					<button
						type="button"
						onClick={onCancel}
						className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 bg-gray-100 hover:bg-gray-200"
					>
						Annuler
					</button>
				</div>

			</form>
		</div>
	);
}
