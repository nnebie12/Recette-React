import { Search } from "lucide-react";
import { Funnel } from 'lucide-react';


function SearchBar({ value, onChange }) {
    function handleInputChange(e) {
        if (onChange) onChange(e.target.value);
    }

    return (
        <div className="flex items-center space-x-1 w-full">
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
                    className="border-gold-custom border-2 pl-8 p-2 text-gray-400 text-xs rounded-full w-full bg-cream"
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
