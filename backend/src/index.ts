import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

import {
  foodsRouter,
  foodCategoryRouter,
  authRouter,
  foodOrderRouter,
} from "./routes/index.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI as any);

const server = express();
const port = process.env.PORT;

server.use(cors());
server.use(express.json());

server.use("/food", foodsRouter);
server.use("/food-category", foodCategoryRouter);
server.use("/auth", authRouter);
server.use("/food-order", foodOrderRouter);

server.listen(port, () => {
  console.log("server asla");
});

// // package.json
// {
//   "name": "food-ordering-backend",
//   "version": "1.0.0",
//   "description": "Food ordering system backend with REST API",
//   "main": "server.js",
//   "scripts": {
//     "start": "node server.js",
//     "dev": "nodemon server.js"
//   },
//   "dependencies": {
//     "express": "^4.18.2",
//     "mongoose": "^7.5.0",
//     "bcryptjs": "^2.4.3",
//     "jsonwebtoken": "^9.0.2",
//     "cors": "^2.8.5",
//     "dotenv": "^16.3.1",
//     "multer": "^1.4.5-lts.1",
//     "express-validator": "^7.0.1"
//   },
//   "devDependencies": {
//     "nodemon": "^3.0.1"
//   }
// }

// // server.js
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Routes
// app.use('/api/auth', require('./routes/authRoutes'));
// app.use('/api/users', require('./routes/userRoutes'));
// app.use('/api/food-categories', require('./routes/foodCategoryRoutes'));
// app.use('/api/foods', require('./routes/foodRoutes'));
// app.use('/api/orders', require('./routes/orderRoutes'));

// // MongoDB connection
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/foodordering', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// // models/User.js
// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// const userSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   password: {
//     type: String,
//     required: true
//   },
//   phoneNumber: {
//     type: String,
//     required: true
//   },
//   address: {
//     type: String,
//     required: true
//   },
//   role: {
//     type: String,
//     enum: ['USER', 'ADMIN'],
//     default: 'USER'
//   },
//   isVerified: {
//     type: Boolean,
//     default: false
//   }
// }, {
//   timestamps: true
// });

// userSchema.pre('save', async function(next) {
//   if (!this.isModified('password')) return next();
//   this.password = await bcrypt.hash(this.password, 12);
//   next();
// });

// userSchema.methods.comparePassword = async function(password) {
//   return await bcrypt.compare(password, this.password);
// };

// module.exports = mongoose.model('User', userSchema);

// // models/FoodCategory.js
// const mongoose = require('mongoose');

// const foodCategorySchema = new mongoose.Schema({
//   categoryName: {
//     type: String,
//     required: true,
//     unique: true
//   }
// }, {
//   timestamps: true
// });

// module.exports = mongoose.model('FoodCategory', foodCategorySchema);

// // models/Food.js
// const mongoose = require('mongoose');

// const foodSchema = new mongoose.Schema({
//   foodName: {
//     type: String,
//     required: true
//   },
//   price: {
//     type: Number,
//     required: true
//   },
//   image: {
//     type: String,
//     required: true
//   },
//   ingredients: {
//     type: String,
//     required: true
//   },
//   category: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'FoodCategory',
//     required: true
//   }
// }, {
//   timestamps: true
// });

// module.exports = mongoose.model('Food', foodSchema);

// // models/FoodOrder.js
// const mongoose = require('mongoose');

// const foodOrderItemSchema = new mongoose.Schema({
//   food: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Food',
//     required: true
//   },
//   quantity: {
//     type: Number,
//     required: true,
//     min: 1
//   }
// });

// const foodOrderSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   foodOrderItems: [foodOrderItemSchema],
//   totalPrice: {
//     type: Number,
//     required: true
//   },
//   status: {
//     type: String,
//     enum: ['PENDING', 'CANCELED', 'DELIVERED'],
//     default: 'PENDING'
//   }
// }, {
//   timestamps: true
// });

// module.exports = mongoose.model('FoodOrder', foodOrderSchema);

// // controllers/authController.js
// const User = require('../models/User');
// const jwt = require('jsonwebtoken');
// const { validationResult } = require('express-validator');

// const generateToken = (userId) => {
//   return jwt.sign({ userId }, process.env.JWT_SECRET || 'secret', {
//     expiresIn: '7d'
//   });
// };

// exports.register = async (req, res) => {
//   try {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const { email, password, phoneNumber, address } = req.body;

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     const user = new User({
//       email,
//       password,
//       phoneNumber,
//       address
//     });

//     await user.save();

//     const token = generateToken(user._id);

//     res.status(201).json({
//       message: 'User registered successfully',
//       token,
//       user: {
//         id: user._id,
//         email: user.email,
//         role: user.role,
//         isVerified: user.isVerified
//       }
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// exports.login = async (req, res) => {
//   try {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     const isMatch = await user.comparePassword(password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     const token = generateToken(user._id);

//     res.json({
//       message: 'Login successful',
//       token,
//       user: {
//         id: user._id,
//         email: user.email,
//         role: user.role,
//         isVerified: user.isVerified
//       }
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// // controllers/foodCategoryController.js
// const FoodCategory = require('../models/FoodCategory');

// exports.getAllCategories = async (req, res) => {
//   try {
//     const categories = await FoodCategory.find().sort({ createdAt: -1 });
//     res.json(categories);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// exports.createCategory = async (req, res) => {
//   try {
//     const { categoryName } = req.body;

//     const existingCategory = await FoodCategory.findOne({ categoryName });
//     if (existingCategory) {
//       return res.status(400).json({ message: 'Category already exists' });
//     }

//     const category = new FoodCategory({ categoryName });
//     await category.save();

//     res.status(201).json({
//       message: 'Category created successfully',
//       category
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// exports.updateCategory = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { categoryName } = req.body;

//     const category = await FoodCategory.findByIdAndUpdate(
//       id,
//       { categoryName },
//       { new: true }
//     );

//     if (!category) {
//       return res.status(404).json({ message: 'Category not found' });
//     }

//     res.json({
//       message: 'Category updated successfully',
//       category
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// exports.deleteCategory = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const category = await FoodCategory.findByIdAndDelete(id);
//     if (!category) {
//       return res.status(404).json({ message: 'Category not found' });
//     }

//     res.json({ message: 'Category deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// // controllers/foodController.js
// const Food = require('../models/Food');

// exports.getAllFoods = async (req, res) => {
//   try {
//     const { category, page = 1, limit = 10 } = req.query;

//     let query = {};
//     if (category) {
//       query.category = category;
//     }

//     const foods = await Food.find(query)
//       .populate('category', 'categoryName')
//       .limit(limit * 1)
//       .skip((page - 1) * limit)
//       .sort({ createdAt: -1 });

//     const total = await Food.countDocuments(query);

//     res.json({
//       foods,
//       totalPages: Math.ceil(total / limit),
//       currentPage: page,
//       total
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// exports.getFoodById = async (req, res) => {
//   try {
//     const food = await Food.findById(req.params.id).populate('category', 'categoryName');

//     if (!food) {
//       return res.status(404).json({ message: 'Food not found' });
//     }

//     res.json(food);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// exports.createFood = async (req, res) => {
//   try {
//     const { foodName, price, image, ingredients, category } = req.body;

//     const food = new Food({
//       foodName,
//       price,
//       image,
//       ingredients,
//       category
//     });

//     await food.save();
//     await food.populate('category', 'categoryName');

//     res.status(201).json({
//       message: 'Food created successfully',
//       food
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// exports.updateFood = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updateData = req.body;

//     const food = await Food.findByIdAndUpdate(id, updateData, { new: true })
//       .populate('category', 'categoryName');

//     if (!food) {
//       return res.status(404).json({ message: 'Food not found' });
//     }

//     res.json({
//       message: 'Food updated successfully',
//       food
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// exports.deleteFood = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const food = await Food.findByIdAndDelete(id);
//     if (!food) {
//       return res.status(404).json({ message: 'Food not found' });
//     }

//     res.json({ message: 'Food deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// // controllers/orderController.js
// const FoodOrder = require('../models/FoodOrder');
// const Food = require('../models/Food');

// exports.createOrder = async (req, res) => {
//   try {
//     const { foodOrderItems } = req.body;
//     const userId = req.user.id;

//     let totalPrice = 0;
//     const orderItems = [];

//     // Calculate total price and validate items
//     for (const item of foodOrderItems) {
//       const food = await Food.findById(item.food);
//       if (!food) {
//         return res.status(400).json({ message: `Food with id ${item.food} not found` });
//       }

//       totalPrice += food.price * item.quantity;
//       orderItems.push({
//         food: item.food,
//         quantity: item.quantity
//       });
//     }

//     const order = new FoodOrder({
//       user: userId,
//       foodOrderItems: orderItems,
//       totalPrice
//     });

//     await order.save();
//     await order.populate([
//       { path: 'user', select: 'email phoneNumber address' },
//       { path: 'foodOrderItems.food', select: 'foodName price image' }
//     ]);

//     res.status(201).json({
//       message: 'Order created successfully',
//       order
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// exports.getUserOrders = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { page = 1, limit = 10 } = req.query;

//     const orders = await FoodOrder.find({ user: userId })
//       .populate('foodOrderItems.food', 'foodName price image')
//       .limit(limit * 1)
//       .skip((page - 1) * limit)
//       .sort({ createdAt: -1 });

//     const total = await FoodOrder.countDocuments({ user: userId });

//     res.json({
//       orders,
//       totalPages: Math.ceil(total / limit),
//       currentPage: page,
//       total
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// exports.getAllOrders = async (req, res) => {
//   try {
//     const { status, page = 1, limit = 10 } = req.query;

//     let query = {};
//     if (status) {
//       query.status = status;
//     }

//     const orders = await FoodOrder.find(query)
//       .populate('user', 'email phoneNumber address')
//       .populate('foodOrderItems.food', 'foodName price image')
//       .limit(limit * 1)
//       .skip((page - 1) * limit)
//       .sort({ createdAt: -1 });

//     const total = await FoodOrder.countDocuments(query);

//     res.json({
//       orders,
//       totalPages: Math.ceil(total / limit),
//       currentPage: page,
//       total
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// exports.updateOrderStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status } = req.body;

//     if (!['PENDING', 'CANCELED', 'DELIVERED'].includes(status)) {
//       return res.status(400).json({ message: 'Invalid status' });
//     }

//     const order = await FoodOrder.findByIdAndUpdate(
//       id,
//       { status },
//       { new: true }
//     ).populate([
//       { path: 'user', select: 'email phoneNumber address' },
//       { path: 'foodOrderItems.food', select: 'foodName price image' }
//     ]);

//     if (!order) {
//       return res.status(404).json({ message: 'Order not found' });
//     }

//     res.json({
//       message: 'Order status updated successfully',
//       order
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// // middleware/auth.js
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// exports.authenticate = async (req, res, next) => {
//   try {
//     const token = req.header('Authorization')?.replace('Bearer ', '');

//     if (!token) {
//       return res.status(401).json({ message: 'No token provided' });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
//     const user = await User.findById(decoded.userId).select('-password');

//     if (!user) {
//       return res.status(401).json({ message: 'Invalid token' });
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     res.status(401).json({ message: 'Invalid token' });
//   }
// };

// exports.authorize = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return res.status(403).json({ message: 'Access denied' });
//     }
//     next();
//   };
// };

// // routes/authRoutes.js
// const express = require('express');
// const { body } = require('express-validator');
// const authController = require('../controllers/authController');

// const router = express.Router();

// router.post('/register', [
//   body('email').isEmail().normalizeEmail(),
//   body('password').isLength({ min: 6 }),
//   body('phoneNumber').notEmpty(),
//   body('address').notEmpty()
// ], authController.register);

// router.post('/login', [
//   body('email').isEmail().normalizeEmail(),
//   body('password').notEmpty()
// ], authController.login);

// module.exports = router;

// // routes/foodCategoryRoutes.js
// const express = require('express');
// const foodCategoryController = require('../controllers/foodCategoryController');
// const { authenticate, authorize } = require('../middleware/auth');

// const router = express.Router();

// router.get('/', foodCategoryController.getAllCategories);
// router.post('/', authenticate, authorize('ADMIN'), foodCategoryController.createCategory);
// router.patch('/:id', authenticate, authorize('ADMIN'), foodCategoryController.updateCategory);
// router.delete('/:id', authenticate, authorize('ADMIN'), foodCategoryController.deleteCategory);

// module.exports = router;

// // routes/foodRoutes.js
// const express = require('express');
// const foodController = require('../controllers/foodController');
// const { authenticate, authorize } = require('../middleware/auth');

// const router = express.Router();

// router.get('/', foodController.getAllFoods);
// router.get('/:id', foodController.getFoodById);
// router.post('/', authenticate, authorize('ADMIN'), foodController.createFood);
// router.patch('/:id', authenticate, authorize('ADMIN'), foodController.updateFood);
// router.delete('/:id', authenticate, authorize('ADMIN'), foodController.deleteFood);

// module.exports = router;

// // routes/orderRoutes.js
// const express = require('express');
// const orderController = require('../controllers/orderController');
// const { authenticate, authorize } = require('../middleware/auth');

// const router = express.Router();

// router.post('/', authenticate, orderController.createOrder);
// router.get('/my-orders', authenticate, orderController.getUserOrders);
// router.get('/', authenticate, authorize('ADMIN'), orderController.getAllOrders);
// router.patch('/:id/status', authenticate, authorize('ADMIN'), orderController.updateOrderStatus);

// module.exports = router;

// // .env example
// NODE_ENV=development
// PORT=5000
// MONGODB_URI=mongodb://localhost:27017/foodordering
// JWT_SECRET=your_jwt_secret_key_here
