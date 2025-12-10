function BaseField({ form, handleChange }) {
  return (
    <>
    <label className="block">
          <span className="font-medium text-gray-700">Titre</span>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 bg-gray-50 p-3 rounded-md"
          />
        </label>

        {/* DIFFICULTÉ + TEMPS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="block">
            <span className="font-medium text-gray-700">Difficulté</span>
            <select
              name="difficulte"
              value={form.difficulte}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 bg-gray-50 p-3 rounded-md"
            >
              <option value="Facile">Facile</option>
              <option value="Moyenne">Moyenne</option>
              <option value="Difficile">Difficile</option>
            </select>
          </label>

          <label className="block">
            <span className="font-medium text-gray-700">Temps de préparation</span>
            <input
              name="temps"
              type="text"
              value={form.temps}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 bg-gray-50 p-3 rounded-md"
            />
          </label>
        </div>

        {/* DESCRIPTION */}
        <label className="block">
          <span className="font-medium text-gray-700">Description</span>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 bg-gray-50 p-3 rounded-md h-28"
          />
        </label>
    </>
  );
}
export default BaseField;