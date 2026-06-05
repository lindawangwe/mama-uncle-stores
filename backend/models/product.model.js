import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			min: 0,
			required: true,
		},
		image: {
			type: String,
			required: [true, "Image is required"],
		},
		category: {
			type: String,
			required: true,
		},
		originalPrice: { 
			type: Number, 
			default: null 
		},
    	discount: { 
			type: Number, 
			default: 0 
		},
    	isOnSale: { 
			type: Boolean, 
			default: false 
		},
		isNewArrival: { 
			type: Boolean,
			 default: false 
		},
	},
	{ timestamps: true }
);

productSchema.index({ name: 'text', category: 'text' });

const Product = mongoose.model('Product', productSchema);


export default Product;
