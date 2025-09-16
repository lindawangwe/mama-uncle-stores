import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../lib/axios";
import { useCartStore } from "../stores/useCartStore";
import { useUserStore } from "../stores/useUserStore";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { ShoppingCart, ArrowLeft } from "lucide-react";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

const AVAILABLE_SIZES = {
  "bar soap": ["Small", "Medium", "Large"],
  "bread": ["Small", "Regular", "Large", "Family Size"],
  "coffee": ["50g", "100g", "250g", "500g"],
  "tea leaves": ["50g", "100g", "250g", "500g"],
  "cooking oil": ["250ml", "500ml", "1L", "2L", "5L"],
  "milk": ["250ml", "500ml", "1L"],
  "rice": ["500g", "1kg", "2kg", "5kg"],
  "sugar": ["500g", "1kg", "2kg"],
  "maize flour": ["1kg", "2kg", "5kg"],
  "wheat flour": ["1kg", "2kg", "5kg"],
  "salt": ["100g", "250g", "500g", "1kg"],
  "detergents": ["Small", "Medium", "Large", "Economy"],
  "sanitary pads": ["Regular", "Super", "Night", "Panty Liners"],
  "tissue": ["Single", "4-Pack", "8-Pack", "12-Pack"],
  "default": ["Standard"]
};

// Price multipliers for different sizes
const SIZE_MULTIPLIERS = {
  "bar soap": {
    "Small": 0.8,
    "Medium": 1.0,
    "Large": 1.3
  },
  "bread": {
    "Small": 0.7,
    "Regular": 1.0,
    "Large": 1.4,
    "Family Size": 1.8
  },
  "coffee": {
    "50g": 0.6,
    "100g": 1.0,
    "250g": 2.2,
    "500g": 4.0
  },
  "tea leaves": {
    "50g": 0.6,
    "100g": 1.0,
    "250g": 2.2,
    "500g": 4.0
  },
  "cooking oil": {
    "250ml": 0.5,
    "500ml": 1.0,
    "1L": 1.8,
    "2L": 3.2,
    "5L": 7.5
  },
  "milk": {
    "250ml": 0.6,
    "500ml": 1.0,
    "1L": 1.8
  },
  "rice": {
    "500g": 0.7,
    "1kg": 1.0,
    "2kg": 1.8,
    "5kg": 4.2
  },
  "sugar": {
    "500g": 0.7,
    "1kg": 1.0,
    "2kg": 1.9
  },
  "maize flour": {
    "1kg": 1.0,
    "2kg": 1.8,
    "5kg": 4.2
  },
  "wheat flour": {
    "1kg": 1.0,
    "2kg": 1.8,
    "5kg": 4.2
  },
  "salt": {
    "100g": 0.4,
    "250g": 0.7,
    "500g": 1.0,
    "1kg": 1.8
  },
  "detergents": {
    "Small": 0.7,
    "Medium": 1.0,
    "Large": 1.5,
    "Economy": 2.2
  },
  "sanitary pads": {
    "Regular": 1.0,
    "Super": 1.2,
    "Night": 1.4,
    "Panty Liners": 0.8
  },
  "tissue": {
    "Single": 1.0,
    "4-Pack": 3.5,
    "8-Pack": 6.5,
    "12-Pack": 9.0
  },
  "default": {
    "Standard": 1.0
  }
};

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedSize, setSelectedSize] = useState<string>("");
  
  const { user } = useUserStore();
  const { addToCart } = useCartStore();
  
  // Calculate current price based on selected size
  const getCurrentPrice = () => {
    if (!product || !selectedSize) return product?.price || 0;
    
    const categoryMultipliers = SIZE_MULTIPLIERS[product.category] || SIZE_MULTIPLIERS.default;
    const multiplier = categoryMultipliers[selectedSize] || 1.0;
    
    return product.price * multiplier;
  };
  
  // Fetch product data when component mounts or ID changes
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await axios.get(`/products/${id}`);
        setProduct(response.data);
        
        // Set default size based on product category
        const availableSizes = response.data.category && AVAILABLE_SIZES[response.data.category]
          ? AVAILABLE_SIZES[response.data.category]
          : AVAILABLE_SIZES.default;
          
        setSelectedSize(availableSizes[0]);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchProduct();
    }
  }, [id]);
  
  // Handle add to cart button click
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!product) return;
    
    if (!user) {
      toast.error("Please login to add products to cart", { id: "login" });
      return;
    }
    
    // Add product to cart with size, quantity, and current price
    addToCart({
      ...product,
      price: getCurrentPrice(), // Use the calculated price
      selectedSize,
      quantity
    });
    
    toast.success(`${quantity} × ${product.name} (${selectedSize}) added to cart`);
  };
  
  // Get available sizes for current product
  const getAvailableSizes = () => {
    if (!product || !product.category) return AVAILABLE_SIZES.default;
    return AVAILABLE_SIZES[product.category] || AVAILABLE_SIZES.default;
  };
  
  // Handle quantity input change
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 1;
    setQuantity(Math.max(1, value));
  };
  
  // Handle size selection
  const handleSizeSelect = (size: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setSelectedSize(size);
  };
  
  // Handle quantity increment/decrement
  const handleQuantityIncrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuantity(prev => prev + 1);
  };
  
  const handleQuantityDecrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuantity(prev => Math.max(1, prev - 1));
  };
  
  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }
  
  // Error state
  if (error || !product) {
    return (
      <div className="p-6 max-w-3xl mx-auto text-center text-white">
        <p>{error || "Product not found"}</p>
        <Link to="/" className="text-emerald-400 hover:underline mt-4 inline-block">
          Back to products
        </Link>
      </div>
    );
  }
  
  return (
    <motion.div 
      className="max-w-6xl mx-auto px-4 py-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Back navigation */}
      <Link 
        to="/" 
        className="inline-flex items-center text-emerald-400 hover:text-emerald-500 mb-8 transition-colors duration-200 relative z-10"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to products
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="bg-gray-800 rounded-xl p-4 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto max-h-[500px] object-contain rounded-lg mx-auto"
          />
        </div>
        
        {/* Product Details */}
        <div className="bg-gray-800 p-6 rounded-xl relative z-0">
          {/* Product name and category */}
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-white mb-2">{product.name}</h1>
            <span className="inline-block bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">
              {product.category}
            </span>
          </div>
          
          {/* Dynamic Price */}
          <div className="mb-6">
            <p className="text-2xl font-bold text-emerald-400">
              ${getCurrentPrice().toFixed(2)}
              {selectedSize && (
                <span className="text-sm text-gray-400 ml-2">
                  for {selectedSize}
                </span>
              )}
            </p>
            {getCurrentPrice() !== product.price && (
              <p className="text-sm text-gray-500 line-through">
                Original: ${product.price.toFixed(2)}
              </p>
            )}
          </div>
          
          {/* Description */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-2">Description</h2>
            <p className="text-gray-300">{product.description}</p>
          </div>
          
          {/* Size Selection */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-white mb-3">Select Size</h2>
            <div className="flex flex-wrap gap-3">
              {getAvailableSizes().map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={(e) => handleSizeSelect(size, e)}
                  className={`px-4 py-2 rounded-md border transition-all duration-200 relative z-10 cursor-pointer hover:scale-105 ${
                    selectedSize === size
                      ? "border-emerald-500 bg-emerald-500 bg-opacity-20 text-emerald-400 shadow-lg"
                      : "border-gray-600 text-gray-300 hover:border-emerald-500 hover:bg-gray-700"
                  }`}
                  style={{ 
                    pointerEvents: 'auto',
                    touchAction: 'manipulation'
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          
          {/* Quantity Selection */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-3">Quantity</h2>
            <div className="flex items-center">
              <button 
                type="button"
                className="bg-gray-700 text-white w-10 h-10 rounded-l-md flex items-center justify-center border border-gray-600 hover:bg-gray-600 transition-colors duration-200 relative z-10 cursor-pointer"
                onClick={handleQuantityDecrement}
                style={{ 
                  pointerEvents: 'auto',
                  touchAction: 'manipulation'
                }}
              >
                -
              </button>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
                className="h-10 w-16 text-center bg-gray-700 text-white border-t border-b border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 relative z-10"
                style={{ 
                  pointerEvents: 'auto'
                }}
              />
              <button 
                type="button"
                className="bg-gray-700 text-white w-10 h-10 rounded-r-md flex items-center justify-center border border-gray-600 hover:bg-gray-600 transition-colors duration-200 relative z-10 cursor-pointer"
                onClick={handleQuantityIncrement}
                style={{ 
                  pointerEvents: 'auto',
                  touchAction: 'manipulation'
                }}
              >
                +
              </button>
            </div>
          </div>
          
          {/* Add to Cart Button */}
          <button
            type="button"
            onClick={handleAddToCart}
            className="w-full bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-all duration-200 flex items-center justify-center relative z-10 cursor-pointer hover:scale-105 active:scale-95"
            style={{ 
              pointerEvents: 'auto',
              touchAction: 'manipulation'
            }}
          >
            <ShoppingCart size={22} className="mr-2" />
            Add to Cart - ${(getCurrentPrice() * quantity).toFixed(2)}
          </button>
        </div>
      </div>
    </motion.div>
  );
};


export default function AppLayout() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  return (
    <div className="w-full min-h-screen h-screen bg-gray-900 text-amber-300 relative overflow-hidden">
      {/* Background gradient or effects can go here if needed */}
      <div className="w-full h-full flex flex-col">
        {/* Top Navbar */}
        <Navbar />
        <div className="w-full grid grid-cols-[auto,1fr] flex-1 overflow-hidden pt-16">
          {/* Sidebar */}
          <Sidebar />
          {/* Main Content Area */}
          <div className="w-full overflow-y-auto overflow-x-hidden px-8 pb-4">
            <div className="sticky top-0 z-40 pb-4 bg-teal-700">
              <CategoryPills
                categories={categories}
                selectedCategory={selectedCategory}
                onSelect={setSelectedCategory}
              />
            </div>
            {/* Nested route content */}
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}