import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";

type SearchBoxProps = {
  onSearch: (query: string) => void;

}

export function SearchBox({ onSearch}: SearchBoxProps) {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Sample product names to search from - replace with your actual data
  const productNames = [
    "Sugar", "Kabras sugar", "Mumias sugar",
    "Salt", "Kensalt", "Kay salt",
    "Maize flour", "Ndovu maize flour","Pembe maize flour", "Soko maize flour", 
    "Bread", "Festive bread", "Supaloaf bread", "Broadways bread",
    "Tea leaves", "Baraka Chai", "Fahari", "Tangawizi",
    "Toothpaste", "Colgate", "Pepsodent", "Sensodyne",
    "Bar soap", "Menengai soap", "Jamaa soap", "Lido soap",
    "Sanitary pads", "Always sanitary pads", "Kotex sanitary pads",
    "Milk", "Molo milk", "Mt. Kenya milk",
    "Cooking oil", "Rina oil", "Fresh fri oil", "ufuta",
    "Wheat flour", "Pembe wheat flour", "Ndovu wheat flour", "Exe wheat flour",
    "Rice", "Basmati rice", "Pishori rice"
  ];

  // Filter suggestions based on user input
  useEffect(() => {
    if (query.trim() === "") {
      setSuggestions([]);
      return;
    }

    const filtered = productNames.filter(product => 
      product.toLowerCase().includes(query.toLowerCase())
    );
    
    setSuggestions(filtered.slice(0, 7)); // Limit to 7 suggestions
  }, [query]);

  // Handle clicks outside the component to close suggestions
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        suggestionsRef.current && 
        inputRef.current && 
        !suggestionsRef.current.contains(event.target as Node) &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (e.target.value.trim() !== "") {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    onSearch(suggestion);
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
      setShowSuggestions(false);
    }
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => query.trim() !== "" && setShowSuggestions(true)}
          className="w-full bg-teal-900/30 border border-teal-600 rounded-full py-2 pl-4 pr-10 text-amber-300 placeholder-amber-600/70 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <button 
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 text-amber-500 hover:text-amber-300"
        >
          <Search size={20} />
        </button>
      </form>

      {/* Suggestions dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div 
          ref={suggestionsRef}
          className="absolute z-50 mt-1 w-full bg-teal-900 border border-teal-700 rounded-lg shadow-lg overflow-hidden"
        >
          <ul className="py-1">
            {suggestions.map((suggestion, index) => (
              <li 
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-4 py-2 hover:bg-teal-800 cursor-pointer text-amber-300"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}