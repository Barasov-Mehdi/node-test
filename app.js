const bodyParser = require('body-parser');
require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Products = require('./models/products');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

// Cloudinary yapılandırması
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

var PORT = process.env.PORT || 3000;
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'sasFile')));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const homeRouter = require('./routes/home');
const aboutRouter = require('./routes/about');
const adminRouter = require('./routes/admin');
const errRouter = require('./routes/err');
app.use('/home', homeRouter);
app.use('/about', aboutRouter);
app.use('/admin', adminRouter);
app.use('/err', errRouter);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
    
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
connectDB();

app.get('/', async (req, res) => {
  try {
    const products = await Products.find();
    res.render('home', { products });
  } catch (err) {
    console.error('Error fetching products', err);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/api/products', async (req, res) => {
  try {
    const products = await Products.find();
    res.json(products);
  } catch (err) {
    console.error('Error fetching products', err);
    res.status(500).send('Internal Server Error');
  }
});

app.use('*', (req, res) => {
  res.status(404).redirect('/err');
});
app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
