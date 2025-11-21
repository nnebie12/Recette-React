import { Star, Moon} from 'lucide-react';
import SearchBar from './SearchBar';
import { Link } from "react-router";
import { useNavigate, useLocation } from "react-router";


export default function NavBar({  searchTerm, setSearchTerm, setActiveCategory}) {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleFavoriteClick = () => {
            
    if (location.pathname !== "/") {
            navigate("/");
     } 
    setActiveCategory('favoris');

  }
  return (
    <nav className="bg-white p-4 text-white shadow-xl w-full">
      <div className="container mx-auto flex justify-between items-center max-w-screen-xl space-x-4">
        <Link to="/">
        <div>
          <img src="/images/logo_n.png" alt="Logo" className="w-16 lg:w-20" />
        </div>
        </Link>
        <div className="container mx-auto md:w-150 md:block hidden">
        <SearchBar value ={searchTerm} onChange={setSearchTerm}/>
        </div>

        <div className="ml-4 flex space-x-2 items-center">
          <span 
            onClick={handleFavoriteClick}
            className="bg-gold-custom w-10 h-10 rounded-full flex justify-center cursor-pointer">
            <Star className="text-white w-4 my-auto"
            fill="currentColor" 
              />
          </span>
          <span className="bg-stone-950 w-10 h-10 rounded-full flex justify-center cursor-pointer">
            <Moon className="text-white w-4 my-auto " 
            fill="currentColor" 
/>
          </span>
        </div>
      </div>
      <div className="container w-full mx-auto mt-4 md:hidden">
        <SearchBar value = {searchTerm} onChange={setSearchTerm}/> 
      </div>
    </nav>
  );
}