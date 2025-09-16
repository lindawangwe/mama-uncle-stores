import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SearchBox } from "../components/SearchBox";
import { categories } from "../data/categories";
import { useNavigate } from "react-router-dom";
import { ShoppingBasket, ArrowLeft } from "lucide-react";
import { Button } from "../components/Button";
import { useCartStore } from "../stores/useCartStore";

// Define the product interface
interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  imageUrl: string;
  description?: string;
  inStock: boolean;
}

export default function SearchResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCartStore();
  
  // Get search query from URL
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q") || "";
  
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [relevantCategories, setRelevantCategories] = useState<typeof categories>([]);
  const [error, setError] = useState<string | null>(null);

  // Handle search from the SearchBox component
  const handleSearch = (searchQuery: string) => {
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  // Add to cart function
  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id || product._id, // Handle both MongoDB _id and regular id
      name: product.name,
      price: product.price,
      quantity: 1,
      imageUrl: product.imageUrl
    });
  };

  // Go back to previous page
  const handleGoBack = () => {
    navigate(-1);
  };

  // Handle navigation to category page
  const handleCategoryClick = (categoryHref: string) => {
    navigate(categoryHref);
  };

  // Fetch products from your backend
  const fetchProducts = async (searchQuery: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Make sure this matches your backend API endpoint
      const response = await fetch(`/api/products/search?q=${encodeURIComponent(searchQuery)}`);
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Transform data if needed to match expected format
      // The following assumes your backend returns products in the expected format
      // If not, you'll need to transform the data here
      const transformedProducts = data.products.map(product => ({
        id: product._id || product.id, // Handle MongoDB _id
        name: product.name,
        price: product.price,
        category: product.category,
        imageUrl: product.imageUrl || `/api/placeholder/400/320`,
        description: product.description || '',
        inStock: product.inStock !== undefined ? product.inStock : true
      }));
      
      setResults(transformedProducts || []);
      
      // Get unique categories from search results
      const matchingCategories = categories.filter(category => 
        category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transformedProducts.some(product => product.category === category.name)
      );
      
      setRelevantCategories(matchingCategories);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setError("Failed to load products. Please try again later.");
      setResults([]);
      setRelevantCategories([]);
    } finally {
      setLoading(false);
    }
  };

  // Effect to run search when query changes
  useEffect(() => {
    if (query) {
      fetchProducts(query);
    } else {
      setResults([]);
      setRelevantCategories([]);
      setLoading(false);
    }
  }, [query]);

  return (
    <div className="pt-20 pb-16 min-h-screen bg-teal-950 text-amber-200">
      {/* Rest of your component remains the same as in the original */}
      
        {/* Search header */}
        <div className="flex items-center mb-6">
          <Button
            onClick={handleGoBack}
            variant="ghost"
            size="icon"
            className="mr-4 text-amber-500 hover:text-amber-300"
          >
            <ArrowLeft size={24} />
          </Button>
          
          <div className="flex-grow max-w-2xl">
            <SearchBox onSearch={handleSearch} />
          </div>
        </div>
        
        {/* Search results heading */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-amber-500">
            {query ? `Search results for "${query}"` : "Search Results"}
          </h1>
          <p className="text-amber-400 mt-1">
            {loading ? "Searching..." : 
             error ? "Error loading products" :
             results.length === 0 ? "No products found" : 
             `Found ${results.length} product${results.length === 1 ? "" : "s"}`}
          </p>
        </div>
        
        {/* Related categories section (if any) */}
        {relevantCategories.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-amber-500 mb-3">Related Categories</h2>
            <div className="flex flex-wrap gap-3">
              {relevantCategories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => handleCategoryClick(category.href)}
                  className="bg-teal-800 hover:bg-teal-700 text-amber-300 px-4 py-2 rounded-md transition duration-300"
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Error message */}
        {error && (
          <div className="bg-red-900/50 border border-red-700 text-amber-200 p-4 rounded-md mb-6">
            <p>{error}</p>
          </div>
        )}
        
        {/* Loading spinner */}
        {loading && (
          <div className="flex justify-center my-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
          </div>
        )}
        
        {/* Products grid */}
        {!loading && !error && results.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {results.map((product) => (
              <div 
                key={product.id} 
                className="bg-teal-900 border border-teal-700 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="h-48 overflow-hidden bg-gray-200">
                  <img 
                    src={product.imageUrl || `/api/placeholder/400/320`}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    onError={(e) => {
                      // Fallback if image fails to load
                      e.currentTarget.src = `/api/placeholder/400/320`;
                    }}
                  />
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-medium text-amber-300 mb-1">{product.name}</h3>
                  <p className="text-amber-500 mb-2">Ksh. {product.price.toFixed(2)}</p>
                  <p className="text-sm text-amber-400/70 mb-3">{product.category}</p>
                  
                  <div className="flex justify-between items-center">
                    <span className={`text-sm ${product.inStock ? 'text-green-400' : 'text-red-400'}`}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                    
                    <Button
                      onClick={() => handleAddToCart(product)}
                      variant="secondary"
                      size="sm"
                      disabled={!product.inStock}
                      className="flex items-center gap-1"
                    >
                      <ShoppingBasket size={16} />
                      <span>Add</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* No results message */}
        {!loading && !error && query && results.length === 0 && (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-amber-400 mb-2">No products found</h2>
            <p className="text-amber-300/70">
              We couldn't find any products matching "{query}". Try a different search term or browse our categories.
            </p>
            <div className="mt-6">
              <Button
                onClick={() => navigate("/")}
                variant="secondary"
                size="md"
              >
                Browse Categories
              </Button>
            </div>
          </div>
        )}
    </div>
  );
}