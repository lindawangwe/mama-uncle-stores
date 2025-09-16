import Product from "../models/product.model.js";
import User from "../models/user.model.js";

export const getCartProducts = async (req, res) => {
  try {
    if (!req.user.cartItems?.length) return res.json([]);

    const productIds = req.user.cartItems.map(item => item.productId);
    const products = await Product.find({ _id: { $in: productIds } });
    
    const cartItems = products.map(product => {
      const cartItem = req.user.cartItems.find(
        item => item.productId.toString() === product._id.toString()
      );
      
      return {
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        stock: product.stock,
        selectedSize: cartItem.size || "Standard",
        quantity: cartItem.quantity || 1,
        inStock: product.stock >= (cartItem.quantity || 1)
      };
    });

    res.json(cartItems);
  } catch (error) {
    console.log("Error in getCartProducts controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { productId, size = "Standard", quantity = 1 } = req.body;
    
    if (!productId) return res.status(400).json({ message: "Product ID is required" });
    
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });
    if (product.stock < quantity) return res.status(400).json({ message: "Not enough stock available" });
    
    const user = req.user;
    const existingItemIndex = user.cartItems.findIndex(
      item => item.productId.toString() === productId && item.size === size
    );
    
    if (existingItemIndex > -1) {
      const newQuantity = user.cartItems[existingItemIndex].quantity + quantity;
      if (product.stock < newQuantity) {
        return res.status(400).json({ message: "Adding this quantity exceeds available stock" });
      }
      user.cartItems[existingItemIndex].quantity = newQuantity;
    } else {
      user.cartItems.push({ productId, size, quantity });
    }
    
    await user.save();
    return res.status(201).json({ message: "Item added to cart" });
  } catch (error) {
    console.log("Error in addToCart controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { productId, size = "Standard" } = req.body;
    
    if (!productId) return res.status(400).json({ message: "Product ID is required" });
    
    const user = req.user;
    user.cartItems = user.cartItems.filter(
      item => !(item.productId.toString() === productId && item.size === size)
    );
    
    await user.save();
    res.json({ message: "Item removed from cart" });
  } catch (error) {
    console.log("Error in removeFromCart controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const clearCart = async (req, res) => {
  try {
    req.user.cartItems = [];
    await req.user.save();
    res.json({ message: "Cart cleared successfully" });
  } catch (error) {
    console.log("Error in clearCart controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateQuantity = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const { quantity, size = "Standard" } = req.body;
    
    if (!quantity) return res.status(400).json({ message: "Quantity is required" });
    
    const user = req.user;
    const existingItemIndex = user.cartItems.findIndex(
      item => item.productId.toString() === productId && item.size === size
    );
    
    if (existingItemIndex === -1) return res.status(404).json({ message: "Product not found in cart" });
    
    if (quantity <= 0) {
      user.cartItems.splice(existingItemIndex, 1);
    } else {
      const product = await Product.findById(productId);
      if (!product) return res.status(404).json({ message: "Product not found" });
      if (product.stock < quantity) return res.status(400).json({ message: "Not enough stock available" });
      
      user.cartItems[existingItemIndex].quantity = quantity;
    }
    
    await user.save();
    res.json({ message: "Cart updated successfully" });
  } catch (error) {
    console.log("Error in updateQuantity controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const validateCartStock = async (req, res) => {
  try {
    if (!req.user.cartItems?.length) return res.json({ valid: true });
    
    const productIds = req.user.cartItems.map(item => item.productId);
    const products = await Product.find({ _id: { $in: productIds } });
    
    const invalidItems = [];
    
    req.user.cartItems.forEach(cartItem => {
      const product = products.find(p => p._id.toString() === cartItem.productId.toString());
      if (!product || product.stock < cartItem.quantity) {
        invalidItems.push({
          productId: cartItem.productId,
          name: product?.name || "Unknown Product",
          requested: cartItem.quantity,
          available: product?.stock || 0,
          size: cartItem.size
        });
      }
    });
    
    if (invalidItems.length > 0) {
      return res.json({ valid: false, invalidItems });
    }
    
    res.json({ valid: true });
  } catch (error) {
    console.log("Error in validateCartStock controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// export const getMyCoupon = async (req, res) => {
//   try {
//     const currentDate = new Date();
    
//     const coupon = await Coupon.findOne({
//       isActive: true,
//       expiryDate: { $gt: currentDate },
//       $or: [
//         { userId: req.user._id },
//         { userId: null }
//       ]
//     }).sort({ createdAt: -1 });
    
//     if (!coupon) return res.json(null);
    
//     res.json({
//       _id: coupon._id,
//       code: coupon.code,
//       discountPercentage: coupon.discountPercentage,
//       expiryDate: coupon.expiryDate
//     });
//   } catch (error) {
//     console.log("Error in getMyCoupon controller", error.message);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// export const validateCoupon = async (req, res) => {
//   try {
//     const { code } = req.body;
    
//     if (!code) return res.status(400).json({ message: "Coupon code is required" });
    
//     const coupon = await Coupon.findOne({
//       code: code.toUpperCase(),
//       isActive: true,
//       expiryDate: { $gt: new Date() }
//     });
    
//     if (!coupon) return res.status(404).json({ message: "Invalid or expired coupon" });
//     if (coupon.userId && coupon.userId.toString() !== req.user._id.toString()) {
//       return res.status(403).json({ message: "This coupon cannot be used with your account" });
//     }
//     if (coupon.usageLimit && coupon.usageCount >= coupon.usageLimit) {
//       return res.status(400).json({ message: "This coupon has reached its usage limit" });
//     }
    
//     coupon.usageCount = (coupon.usageCount || 0) + 1;
//     await coupon.save();
    
//     res.json({
//       _id: coupon._id,
//       code: coupon.code,
//       discountPercentage: coupon.discountPercentage,
//       expiryDate: coupon.expiryDate
//     });
//   } catch (error) {
//     console.log("Error in validateCoupon controller", error.message);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
//};