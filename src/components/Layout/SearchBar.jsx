import { Search, Funnel} from "lucide-react";
import { useLocation, useNavigate} from "react-router";


function SearchBar({ value, onChange }) {
    const navigate = useNavigate();
    const location = useLocation();

    function handleInputChange(e) {
        const newValue = e.target.value;

        if (onChange) onChange(newValue);
        
        if (newValue && location.pathname !== "/") {
            navigate("/");
        }
    }

    return (
        <div className="flex items-center space-x-2 w-full">
            <div className="relative grow flex items-center">
                <span className=" left-3 top-1/2 -translate-y-1/2 absolute   text-gray-400">
                    <Search className="w-3 h-3" />
                </span>
                <input  
                    id="search"
                    type="text"
                    placeholder="Rechercher des recettes..."
                    value={value}
                    autoComplete="false"
                    name="search"
                    onChange={handleInputChange}
                    className="border-gold-custom border-2 pl-8 p-2 focus:shadow-lg focus:shadow-gold-custom/20 text-gray-400 text-xs rounded-full focus:ring-gold-custom w-full bg-cream outline-none"
                />
            </div>
            <span className="bg-cream border-gold-custom border-2 w-10 h-10 rounded-full items-center flex justify-center cursor-pointer">
                 <Funnel className="text-gold-custom w-4" 
                   fill="currentColor" />
            </span>
        </div>
    );   
}

export default SearchBar;
