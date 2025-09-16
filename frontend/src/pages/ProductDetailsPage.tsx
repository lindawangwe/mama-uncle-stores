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

// Type-safe category keys
type ProductCategory = 
  | "bar soap"
  | "bread"
  | "coffee"
  | "tea leaves"
  | "cooking oil"
  | "milk"
  | "rice"
  | "sugar"
  | "maize flour"
  | "wheat flour"
  | "salt"
  | "detergents"
  | "sanitary pads"
  | "tissue"
  | "default";

// Type-safe available sizes mapping
const AVAILABLE_SIZES: Record<ProductCategory, string[]> = {
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

// Type-safe price multipliers
const SIZE_MULTIPLIERS: Record<ProductCategory, Record<string, number>> = {
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

export default function ProductDetailsPage(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedSize, setSelectedSize] = useState<string>("");
  
  const { user } = useUserStore();
  const { addToCart } = useCartStore();
  
  // Type-safe helper function to check if category exists in our mappings
  const isValidCategory = (category: string): category is ProductCategory => {
    return category in AVAILABLE_SIZES;
  };
  
  // Calculate current price based on selected size
  const getCurrentPrice = (): number => {
    if (!product || !selectedSize) return product?.price || 0;
    
    const category = isValidCategory(product.category) ? product.category : "default";
    const categoryMultipliers = SIZE_MULTIPLIERS[category];
    const multiplier = categoryMultipliers[selectedSize] || 1.0;
    
    return product.price * multiplier;
  };
  
  // Fetch product data when component mounts or ID changes
  useEffect(() => {
    const fetchProduct = async (): Promise<void> => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await axios.get<Product>(`/products/${id}`);
        setProduct(response.data);
        
        // Set default size based on product category
        const category = isValidCategory(response.data.category) 
          ? response.data.category 
          : "default";
        const availableSizes = AVAILABLE_SIZES[category];
        
        setSelectedSize(availableSizes[0] || "Standard");
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
  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>): void => {
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
  const getAvailableSizes = (): string[] => {
    if (!product || !product.category) return AVAILABLE_SIZES.default;
    
    const category = isValidCategory(product.category) ? product.category : "default";
    return AVAILABLE_SIZES[category];
  };
  
  // Handle quantity input change
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = parseInt(e.target.value) || 1;
    setQuantity(Math.max(1, value));
  };
  
  // Handle size selection
  const handleSizeSelect = (size: string, e?: React.MouseEvent<HTMLButtonElement>): void => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setSelectedSize(size);
  };
  
  // Handle quantity increment/decrement
  const handleQuantityIncrement = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setQuantity(prev => prev + 1);
  };
  
  const handleQuantityDecrement = (e: React.MouseEvent<HTMLButtonElement>): void => {
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
      <div className="p-6 max-w-3xl mx-auto text-center text-amber-200">
        <p>{error || "Product not found"}</p>
        <Link to="/" className="text-amber-400 hover:underline mt-4 inline-block">
          Back to products
        </Link>
      </div>
    );
  }
  
  return (
    <motion.div 
      className="py-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Back navigation */}
      <Link 
        to="/" 
        className="inline-flex items-center text-amber-400 hover:text-amber-500 mb-8 transition-colors duration-200 relative z-10"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to products
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="bg-teal-900 rounded-xl p-4 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto max-h-[500px] object-contain rounded-lg mx-auto"
          />
        </div>
        
        {/* Product Details */}
        <div className="bg-teal-900 p-6 rounded-xl relative z-0">
          {/* Product name and category */}
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-amber-400 mb-2">{product.name}</h1>
            <span className="inline-block bg-teal-900 text-amber-200 px-3 py-1 rounded-full text-sm">
              {product.category}
            </span>
          </div>
          
          {/* Dynamic Price */}
          <div className="mb-6">
            <p className="text-2xl font-bold text-amber-400">
              Kshs. {getCurrentPrice().toFixed(2)}
              {selectedSize && (
                <span className="text-sm text-amber-200 ml-2">
                  for {selectedSize}
                </span>
              )}
            </p>
            {getCurrentPrice() !== product.price && (
              <p className="text-sm text-amber-200 line-through">
                Original: Kshs. {product.price.toFixed(2)}
              </p>
            )}
          </div>
          
          {/* Description */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-amber-200 mb-2">Description</h2>
            <p className="text-amber-300">{product.description}</p>
          </div>
          
          {/* Size Selection */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-amber-200 mb-3">Select Size</h2>
            <div className="flex flex-wrap gap-3">
              {getAvailableSizes().map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={(e) => handleSizeSelect(size, e)}
                  className={`px-4 py-2 rounded-md border transition-all duration-200 relative z-10 cursor-pointer hover:scale-105 ${
                    selectedSize === size
                      ? "border-teal-500 bg-emerald-500 bg-opacity-20 text-amber-400 shadow-lg"
                      : "border-teal-600 text-amber-200 hover:border-amber-500 hover:bg-amber-600"
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
            <h2 className="text-xl font-semibold text-amber-200 mb-3">Quantity</h2>
            <div className="flex items-center">
              <button 
                type="button"
                className="bg-teal-900 text-amber-200 w-10 h-10 rounded-l-md flex items-center justify-center border border-teal-600 hover:bg-amber-500 transition-colors duration-200 relative z-10 cursor-pointer"
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
                className="h-10 w-16 text-center bg-teal-900 text-amber-200 border-t border-b border-teal-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 relative z-10"
                style={{ 
                  pointerEvents: 'auto'
                }}
              />
              <button 
                type="button"
                className="bg-teal-900 text-amber-200 w-10 h-10 rounded-r-md flex items-center justify-center border border-teal-600 hover:bg-amber-500 transition-colors duration-200 relative z-10 cursor-pointer"
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
            className="w-full bg-emerald-600 text-amber-200 px-6 py-3 rounded-lg hover:bg-emerald-700 transition-all duration-200 flex items-center justify-center relative z-10 cursor-pointer hover:scale-105 active:scale-95"
            style={{ 
              pointerEvents: 'auto',
              touchAction: 'manipulation'
            }}
          >
            <ShoppingCart size={22} className="mr-2" />
            Add to Cart - Kshs. {(getCurrentPrice() * quantity).toFixed(2)}
          </button>
        </div>
      </div>
    </motion.div>
  );
}