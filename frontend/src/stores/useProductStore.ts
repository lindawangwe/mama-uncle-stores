import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../lib/axios";

interface Product {
  _id: string;
  name: string;
  price: number;
  isFeatured: boolean;
  
}


interface ProductStore {
  products: Product[];
  loading: boolean;
  error?: string;

  setProducts: (products: Product[]) => void;
  createProduct: (productData: Partial<Product>) => Promise<void>;
  fetchAllProducts: () => Promise<void>;
  fetchProductsByCategory: (category: string) => Promise<void>;
  deleteProduct: (productId: string) => Promise<void>;
  toggleFeaturedProduct: (productId: string) => Promise<void>;
  fetchFeaturedProducts: () => Promise<void>;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  loading: false,

  setProducts: (products: Product[]) => set({ products }),
  
  createProduct: async (productData: Partial<Product>) => {
    set({ loading: true });
    try {
      const res = await axios.post<Product>("/products", productData);
      set((prevState) => ({
        products: [...prevState.products, res.data],
        loading: false,
      }));
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to create product");
      set({ loading: false });
    }
  },
  
  fetchAllProducts: async () => {
    set({ loading: true });
    try {
      const response = await axios.get<{ products: Product[] }>("/products");
      set({ products: response.data.products, loading: false });
    } catch (error: any) {
      set({ error: "Failed to fetch products", loading: false });
      toast.error(error.response?.data?.error || "Failed to fetch products");
    }
  },
  
  fetchProductsByCategory: async (category: string) => {
    set({ loading: true });
    try {
      const response = await axios.get<{ products: Product[] }>(`/products/category/${category}`);
      set({ products: response.data.products, loading: false });
    } catch (error: any) {
      set({ error: "Failed to fetch products", loading: false });
      toast.error(error.response?.data?.error || "Failed to fetch products");
    }
  },
  
  deleteProduct: async (productId: string) => {
    set({ loading: true });
    try {
      await axios.delete(`/products/${productId}`);
      set((prevState) => ({
        products: prevState.products.filter((product) => product._id !== productId),
        loading: false,
      }));
    } catch (error: any) {
      set({ loading: false });
      toast.error(error.response?.data?.error || "Failed to delete product");
    }
  },
  
  toggleFeaturedProduct: async (productId: string) => {
    set({ loading: true });
    try {
      const response = await axios.patch<{ isFeatured: boolean }>(`/products/${productId}`);
      // this will update the isFeatured prop of the product
      set((prevState) => ({
        products: prevState.products.map((product) =>
          product._id === productId ? { ...product, isFeatured: response.data.isFeatured } : product
        ),
        loading: false,
      }));
    } catch (error: any) {
      set({ loading: false });
      toast.error(error.response?.data?.error || "Failed to update product");
    }
  },
  
  fetchFeaturedProducts: async () => {
    set({ loading: true });
    try {
      const response = await axios.get<Product[]>("/products/featured");
      set({ products: response.data, loading: false });
    } catch (error: any) {
      set({ error: "Failed to fetch products", loading: false });
      console.log("Error fetching featured products:", error);
    }
  },
}));