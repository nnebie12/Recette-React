import { useState } from 'react';

export default function EdditRecette({ recette, onSave, onCancel }) {
	const [form, setForm] = useState({ title: recette?.title || '', preparation: recette?.preparation || '' });

	function handleChange(e) {
		const { name, value } = e.target;
		setForm(prev => ({ ...prev, [name]: value }));
	}

	function handleSubmit(e) {
		e.preventDefault();
		onSave({ ...recette, title: form.title, preparation: form.preparation });
	}

	return (
		<form onSubmit={handleSubmit}>
			<input name="title" value={form.title} onChange={handleChange} />
			<textarea name="preparation" value={form.preparation} onChange={handleChange} />
			<button type="submit">Enregistrer</button>
			<button type="button" onClick={onCancel}>Annuler</button>
		</form>
	);
}
