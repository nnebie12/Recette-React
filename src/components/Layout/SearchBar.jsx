import { Search, Funnel } from "lucide-react";
import { useNavigate, useLocation } from "react-router";


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
                    name="search"
                    onChange={handleInputChange}
                    className="border-gold-custom border-2 pl-8 p-2 text-gray-400 text-xs focus:border-none focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-gold-custom rounded-full w-full bg-cream transition-all"
                />
            </div>
            <div className="relative">
            <span id="dropdownHoverButton"
            className="bg-cream border-gold-custom border-2 w-10 h-10 rounded-full items-center flex justify-center cursor-pointer">
                 <Funnel className="text-gold-custom w-4" 
                   fill="currentColor" />
            </span>

            {/* Dropdown menu */}
            <div id="dropdownHover" className="hidden absolute z-30 bg-white divide-y divide-gray-100 rounded-lg shadow right-0 md:-left-8 md:-right-10 top-10 ">
                <ul className="py-2 text-sm text-gray-700 text-center " aria-labelledby="dropdownHoverButton"> 
                    
                    <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 ">Dashboard</a>
                    </li>
                    <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 ">Settings</a>
                    </li>
                    <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 ">Earnings</a>
                    </li>
                </ul>
            </div>
            </div>
        </div>
    );   
}

export default SearchBar;
