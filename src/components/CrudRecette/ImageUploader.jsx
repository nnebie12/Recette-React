import { useRef } from 'react';

export default function ImageUploader({ image, onChange }) {
  const fileInputRef = useRef(null);

  function handleImageChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      onChange(reader.result);
    };
    reader.readAsDataURL(file);
  }

  function removeImage() {
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }

  return (
    <div className="mb-6">
      <label className="block mb-2 font-medium">Image</label>

      {!image ? (
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
        />
      ) : (
        <div className="relative w-48">
          <img
            src={image}
            alt="Aperçu"
            className="rounded shadow"
          />
          <button
            type="button"
            onClick={removeImage}
            className="absolute top-1 right-1"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
