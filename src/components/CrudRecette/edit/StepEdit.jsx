function StepEdit( { form, setForm, addStep, removeStep } ) {
  return (
            <div>
          <span className="font-medium text-gray-700">Étapes</span>

          <div className="flex gap-3 mt-2">
            <input
              type="text"
              value={form.__stepText}
              onChange={e => setForm(prev => ({ ...prev, __stepText: e.target.value }))}
              className="flex-1 border border-gray-300 bg-gray-50 p-3 rounded-md"
            />
            <button
              type="button"
              onClick={() => addStep(form.__stepText)}
              className="px-4 py-2 rounded-md text-white"
              style={{ backgroundColor: "#CDA077" }}
            >
              +
            </button>
          </div>

          {form.preparation.length > 0 && (
            <ol className="list-decimal ml-6 mt-3 space-y-1">
              {form.preparation.map((st, idx) => (
                <li key={idx}>
                  {st}
                  <button type="button" onClick={() => removeStep(idx)} className="ml-2 text-red-500">
                    ×
                  </button>
                </li>
              ))}
            </ol>
          )}
        </div>
  );
}
export default StepEdit;