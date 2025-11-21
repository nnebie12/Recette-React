import { Star } from 'lucide-react';

function FavoriteButton({ isFavorite, onToggle }) {
  return (
    <span
      onClick={onToggle}
      className="bg-white/10 backdrop-blur-xs w-10 h-10 rounded-lg flex justify-center cursor-pointer"
    >
      <Star
        className="text-white w-5 my-auto"
        fill={isFavorite ? "currentColor" : "none"}  
      />
    </span>
  );
}
export default FavoriteButton;