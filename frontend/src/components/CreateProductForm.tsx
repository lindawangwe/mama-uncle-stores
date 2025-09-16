import { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Upload, Loader } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";

const categories = ["bar soap", "toothpaste", "sugar", "milk", "tea leaves", "coffee", "bread", 
    "rice", "cooking oil", "salt", "maize flour", "wheat flour", "food additives", "matchbox",
     "detergents", "sanitary pads", "tissue"];

export default function CreateProductForm (){
	const [newProduct, setNewProduct] = useState({
		name: "",
		description: "",
		price: "",
		category: "",
		image: "",
	});

	const { createProduct, loading } = useProductStore();

	const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			await createProduct(newProduct);
			setNewProduct({ name: "", description: "", price: "", category: "", image: "" });
		} catch {
			console.log("error creating a product");
		}
	};

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files || e.target.files.length === 0) return; // Prevents errors if no file is selected
	
		const file = e.target.files[0];
		const reader = new FileReader();
	
		reader.onloadend = () => {
			setNewProduct({ ...newProduct, image: reader.result as string });
		};
	
		reader.readAsDataURL(file);
	};
	

	return (
		<motion.div
			className='bg-gray-800 shadow-lg rounded-lg p-8 mb-8 max-w-xl mx-auto'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8 }}
		>
			<h2 className='text-2xl font-semibold mb-6 text-amber-500'>Create New Product</h2>

			<form onSubmit={handleSubmit} className='space-y-4'>
				<div>
					<label htmlFor='name' className='block text-sm font-medium text-amber-300'>
						Product Name
					</label>
					<input
						type='text'
						id='name'
						name='name'
						value={newProduct.name}
						onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
						className='mt-1 block w-full bg-teal-700 border border-teal-600 rounded-md shadow-sm py-2
						 px-3 text-amber-200 focus:outline-none focus:ring-2
						focus:ring-amber-600 focus:border-amber-600'
						required
					/>
				</div>

				<div>
					<label htmlFor='description' className='block text-sm font-medium text-amber-300'>
						Description
					</label>
					<textarea
						id='description'
						name='description'
						value={newProduct.description}
						onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
						rows={3}
						className='mt-1 block w-full bg-teal-700 border border-teal-600 rounded-md shadow-sm
						 py-2 px-3 text-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-600 
						 focus:border-amber-600'
						required
					/>
				</div>

				<div>
					<label htmlFor='price' className='block text-sm font-medium text-amber-300'>
						Price
					</label>
					<input
						type='number'
						id='price'
						name='price'
						value={newProduct.price}
						onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
						step='0.01'
						className='mt-1 block w-full bg-teal-700 border border-teal-600 rounded-md shadow-sm 
						py-2 px-3 text-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-600
						 focus:border-amber-600'
						required
					/>
				</div>

				<div>
					<label htmlFor='category' className='block text-sm font-medium text-amber-300'>
						Category
					</label>
					<select
						id='category'
						name='category'
						value={newProduct.category}
						onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
						className='mt-1 block w-full bg-teal-700 border border-teal-600 rounded-md
						 shadow-sm py-2 px-3 text-amber-200 focus:outline-none 
						 focus:ring-2 focus:ring-amber-600 focus:border-amber-600'
						required
					>
						<option value=''>Select a category</option>
						{categories.map((category) => (
							<option key={category} value={category}>
								{category}
							</option>
						))}
					</select>
				</div>

				<div className='mt-1 flex items-center'>
					<input type='file' id='image' className='sr-only' accept='image/*' onChange={handleImageChange} />
					<label
						htmlFor='image'
						className='cursor-pointer bg-teal-700 py-2 px-3 border border-teal-600 rounded-md shadow-sm text-sm leading-4 font-medium
						text-amber-200 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500'
					>
						<Upload className='h-5 w-5 inline-block mr-2' />
						Upload Image
					</label>
					{newProduct.image && <span className='ml-3 text-sm text-amber-300'>Image uploaded </span>}
				</div>

				<button
					type='submit'
					className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md 
					shadow-sm text-sm font-medium text-teal-300 bg-amber-700 hover:bg-amber-800 
					focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-600 disabled:opacity-50'
					disabled={loading}
				>
					{loading ? (
						<>
							<Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' />
							Loading...
						</>
					) : (
						<>
							<PlusCircle className='mr-2 h-5 w-5' />
							Create Product
						</>
					)}
				</button>
			</form>
		</motion.div>
	);
};
