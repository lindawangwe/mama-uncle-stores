import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

type Product = {
	_id: string;
	name: string;
	price: number;
	selectedSize?: string;
	quantity?: number;
}

type CartItem = Product & {
	quantity: number;
	selectedSize: string;
}

type CartState = {
	cart: CartItem[];
	total: number;
	subtotal: number;

	getCartItems: () => Promise<void>;
	clearCart: () => Promise<void>;

	addToCart: (product: Product) => Promise<void>;
	removeFromCart: (productId: string, selectedSize: string) => Promise<void>;
	updateQuantity: (productId: string, quantity: number, selectedSize: string) => Promise<void>;
	calculateTotals: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
	cart: [],
	total: 0,
	subtotal: 0,
	getCartItems: async () => {
		try {
			const res = await axios.get<CartItem[]>("/cart");
			set({ cart: res.data });
			get().calculateTotals();
		} catch (error: any) {
			set({ cart: [] });
			toast.error(error.response.data.message || "An error occurred");
		}
	},
	clearCart: async () => {
		try {
			await axios.delete("/cart/clear"); // this should delete all items in user's cart on the backend
			set({ cart: [], total: 0, subtotal: 0 });
		} catch (error) {
			console.error("Error clearing cart:", error);
			toast.error("Failed to clear cart");
		}
	},
	
  addToCart: async (product: Product) => {
	try {
	  const { _id, selectedSize = "Standard", quantity = 1 } = product;

	  await axios.post("/cart", { 
		productId: _id,
		size: selectedSize,
		quantity: quantity
	  });
	  //toast.success("Product added to cart");

	  set((prevState) => {
		const cartItemIndex = prevState.cart.findIndex(
		  (item) => item._id === _id && item.selectedSize === selectedSize
		);

		let newCart;

		if (cartItemIndex >= 0) {
		  newCart = [...prevState.cart];
		  newCart[cartItemIndex] = {
			...newCart[cartItemIndex],
			quantity: newCart[cartItemIndex].quantity + quantity,
		  };
		} else {
		  newCart = [...prevState.cart, { ...product, quantity, selectedSize } as CartItem];
		}
		return { cart: newCart };
	  });

	  toast.success(`${quantity} × ${product.name} added to cart`);
	  get().calculateTotals();
	} catch (error: any) {
	  toast.error(error.response?.data?.message || "An error occurred");
	}
	  
  },
	removeFromCart: async (productId: string, selectedSize: string) => {
		try {
			await axios.delete(`/cart`, {
				data: {
					productId,
					size: selectedSize,
				},
			});

			set((prevState) => ({
				cart: prevState.cart.filter(
					(item) => !(item._id === productId && item.selectedSize === selectedSize)
				),
			}));
			get().calculateTotals();
		} catch (error:any) {
			toast.error(error.response?.data?.message || "An error occurred");
		}
	},
	updateQuantity: async (productId: string, quantity: number, selectedSize: string) => {
		if (quantity === 0) {
			get().removeFromCart(productId, selectedSize);
			return;
		}

		try {
			await axios.put(`/cart/${productId}`, {
				quantity,
				size: selectedSize,
			});

			set((prevState) => ({
				cart: prevState.cart.map((item) =>
					(item._id === productId && item.selectedSize === selectedSize)
						? { ...item, quantity }
						: item
				),
			}));
			get().calculateTotals();
		} catch (error: any) {
			toast.error(error.response?.data?.message || "An error occurred");
		}

		await axios.put(`/cart/${productId}`, { quantity });
		set((prevState) => ({
			cart: prevState.cart.map((item) => (item._id === productId ? { ...item, quantity } : item)),
		}));
		get().calculateTotals();
	},
	calculateTotals: () => {
		const { cart } = get();
		const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
		const total = subtotal;


		set({ subtotal, total });
	},
}));
