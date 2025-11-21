import img from '../../assets/imgRecette/recette1.png';
import FavoriteButton from './FavoriteButton';


function Card({recettes, toggleFavorite}) {


    return (
    <>
    {

    <div 
        className="rounded-xl shadow-lg aspect-square p-3 grid gap-2 align-items-center relative overflow-hidden cursor-pointer hover:scale-105 transition-transform">
            <div
                className="absolute inset-0 bg-cover bg-center brightness-70"
                style={{ backgroundImage: `url(${img})` }}>
                   
            </div>
            <a href={`/recette/${recettes.id}`} className="absolute inset-0 z-10"> 

           </a>
            <div className="relative  text-white h-full flex flex-col justify-between text-center gap-4">
                <div className="flex justify-end z-20">
                <FavoriteButton 
                isFavorite={recettes.isFavorite}
                onToggle={() => toggleFavorite(recettes.id)}
                />
                </div>
                <h3 className="text-white grow font-bold text-lg mt-2 items-center my-auto">{recettes.title}</h3>
        
            </div>
            
    </div>
        
         
    }

    </>
    );
}
export default Card;