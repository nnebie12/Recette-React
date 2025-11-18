export default function RemoveRecette({ id, onRemove }) {
	function handleRemove() {
		if (onRemove) onRemove(id);
	}

	return (
		<button
			onClick={handleRemove}
			className="px-4 py-2 text-white rounded-md shadow font-medium"
			style={{ backgroundColor: "#C75D5D" }}
		>
			Supprimer
		</button>
	);
}
