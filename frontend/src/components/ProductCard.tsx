import toast from "react-hot-toast";
import { ShoppingCart, Eye } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
import { Link } from "react-router-dom";

export default function ProductCard({ product }){
	const { user } = useUserStore();
	const { addToCart } = useCartStore();
	
	const handleAddToCart = (e: React.MouseEvent) => {
		e.preventDefault(); // Prevent navigation to product details
		
		if (!user) {
			toast.error("Please login to add products to cart", { id: "login" });
			return;
		} else {
			// Add to cart with default size
			addToCart({
				...product,
				selectedSize: "Standard",
				quantity: 1
			});
		}
	};

	return (
		<div className='flex w-full relative flex-col overflow-hidden rounded-lg border border-teal-700 bg-teal-800 shadow-lg hover:border-emerald-500 transition-all duration-300'>
			<Link to={`/products/${product._id}`} className="block">
				{/* Product Image */}
				<div className='relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl'>
					<img className='object-cover w-full' src={product.image} alt={product.name} />
					<div className='absolute inset-0 bg-teal-900 bg-opacity-20' />
					
					{/* View Details Overlay */}
					<div className="absolute inset-0 bg-teal-900 bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
						<div className="bg-emerald-600 text-amber-300 px-4 py-2 rounded-lg flex items-center">
							<Eye size={18} className="mr-2" />
							View Details
						</div>
					</div>
				</div>

				{/* Product Info */}
				<div className='mt-4 px-5'>
					<h5 className='text-xl font-semibold tracking-tight text-amber-300'>{product.name}</h5>
					<div className='mt-2 mb-2 flex items-center justify-between'>
						<p>
							<span className='text-2xl font-bold text-amber-300'>Kshs. {product.price}</span>
						</p>
					</div>
					<p className="text-amber-300 text-sm mb-3 line-clamp-2">{product.description}</p>
				</div>
			</Link>
			
			{/* Quick Add Button - Outside the Link to prevent navigation */}
			<div className="px-5 pb-5">
				<button
					className='w-full flex items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-center text-sm 
					font-medium text-amber-300 hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300'
					onClick={handleAddToCart}
				>
					<ShoppingCart size={18} className='mr-2' />
					Quick Add to cart
				</button>
			</div>
		</div>
	);
};