import { useNavigate } from 'react-router-dom';
import img from '../../assets/imgRecette/recette1.png';
import FavoriteButton from './FavoriteButton';

function Card({ recette, toggleFavorite }) {  // ← Recevoir recette en props
    const navigate = useNavigate();

    const handleCardClick = (id) => {
        navigate(`/recette/${id}`);
    };

    return (
        <div 
            key={recette.id}
            onClick={() => handleCardClick(recette.id)}
            className="rounded-xl shadow-lg aspect-square max-w-50 p-3 grid gap-2 align-items-center relative overflow-hidden cursor-pointer hover:scale-105 transition-transform"
        >
            <div
                className="absolute inset-0 bg-cover bg-center brightness-70"
                style={{ backgroundImage: `url(${recette.image || img})` }}
            >
            </div>
            
            <div className="relative text-white h-full flex flex-col justify-between text-center gap-4">
                <div className="flex justify-end z-20">
                    <FavoriteButton 
                        isFavorite={recette.isFavorite}
                        onToggle={(e) => {
                            e.stopPropagation();
                            toggleFavorite(recette.id);
                        }}
                    />
                </div>
                <h3 className="text-white grow font-bold text-lg mt-2 items-center my-auto">
                    {recette.title || recette.name}
                </h3>
            </div>
        </div>
    );
}

export default Card;