const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Products = require('./models/products');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static file directories
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'sasFile')));
app.use(express.static(path.join(__dirname, 'node_modules')));

// Body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
const homeRouter = require('./routes/home');
const aboutRouter = require('./routes/about');
const adminRouter = require('./routes/admin');
app.use('/home', homeRouter);
app.use('/about', aboutRouter);
app.use('/admin', adminRouter);

// Home page route
app.get('/', async (req, res) => {
  try {
    const products = await Products.find();
    res.render('home', { products });
  } catch (err) {
    console.error('Error fetching products', err);
    res.status(500).send('Internal Server Error');
  }
});

// API endpoint to fetch products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Products.find();
    res.json(products);
  } catch (err) {
    console.error('Error fetching products', err);
    res.status(500).send('Internal Server Error');
  }
});

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
connectDB();

// About page route
app.get('/about', (req, res) => {
  res.render('about');
});

// Admin page route
app.get('/admin', (req, res) => {
  res.render('admin');
});

// Default route for handling undefined routes
app.get('*', (req, res) => {
  res.send('Salam');
});

// Server start
app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
