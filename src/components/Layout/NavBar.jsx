import { useContext } from 'react'; 
import { Star } from 'lucide-react';
import { Moon } from 'lucide-react';
import { AppContext } from '../../context/appContext'; 
import SearchBar from './SearchBar';

export default function NavBar() {
  // Utiliser le contexte pour accéder aux valeurs
  const { isDark, toggleTheme } = useContext(AppContext);

  // Définir les classes pour la NavBar en fonction du thème
  const navClasses = isDark
    ? 'bg-stone-900 text-white shadow-xl w-full' // Thème sombre
    : 'bg-white text-stone-900 shadow-xl w-full'; // Thème clair

  const ThemeIcon = isDark ? Star : Moon;
  
  const iconClasses = isDark
    ? 'text-yellow-400'
    : 'text-white'; 

  return (
    <nav className={`p-4 ${navClasses}`}>
      <div className="container mx-auto flex justify-between items-center max-w-screen-xl space-x-4">
        <div>
          <img src="/images/logo_n.png" alt="Logo" className="w-16 lg:w-20" />
        </div>

        <div className="container mx-auto md:w-150 md:block hidden">
          <SearchBar />
        </div>

        <div className="ml-4 flex space-x-2 items-center">
          {/* Bouton pour les favoris/étoile - on garde vos classes pour l'instant */}
          <span className="bg-gold-custom w-10 h-10 rounded-full flex justify-center cursor-pointer">
            <Star className="text-white w-4 my-auto" fill="currentColor" />
          </span>

          {/* Bouton de basculement du thème */}
          <span
            className="bg-stone-950 dark:bg-gray-700 w-10 h-10 rounded-full flex justify-center items-center cursor-pointer transition-colors duration-300"
            onClick={toggleTheme} 
          >
            <ThemeIcon className={`w-4 my-auto ${iconClasses}`} fill="currentColor" />
          </span>
        </div>
      </div>
      <div className="container w-full mx-auto mt-4 md:hidden">
        <SearchBar />
      </div>
    </nav>
  );
}