const bodyParser = require('body-parser');
require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Products = require('./models/products');
var PORT = process.env.PORT || 3000;
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));


app.use(express.static(path.join(__dirname, 'sasFile')));
app.use(express.static(path.join(__dirname, 'node_modules')));

// Body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const homeRouter = require('./routes/home');
const aboutRouter = require('./routes/about');
const adminRouter = require('./routes/admin');
app.use('/home', homeRouter);
app.use('/about', aboutRouter);
app.use('/admin', adminRouter);

app.get('/', async (req, res) => {
  try {
    const products = await Products.find();
    res.render('home', { products });
  } catch (err) {
    console.error('Error fetching products', err);
    res.status(500).send('Internal Server Error');
  }
});

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

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/admin', (req, res) => {
  res.render('admin');
});

app.get('*', (req, res) => {
  res.send('Salam')
})

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
