
export default function RemoveRecette({ id, onRemove }) {
	function handleRemove() {
		if (onRemove) onRemove(id);
	}

	return (
		<button onClick={handleRemove}>Supprimer</button>
	);
}
