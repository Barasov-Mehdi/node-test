const express = require('express');
const router = express.Router();
const path = require('path');
const Products = require('../models/products');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads') // Define the destination folder for the uploaded files
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname); // Get the extension of the file
        const randomName = Date.now() + '-' + Math.round(Math.random() * 1000) + ext; // Generate a random name for the file
        cb(null, randomName); // Set the filename for the uploaded file
    }
});
const upload = multer({ storage: storage });

// Route for rendering the add product form
router.get('/add', (req, res) => {
    res.render('admin/add');
});

// Route for handling the addition of a product
router.post('/add', upload.single('img'), async (req, res) => {
    try {
        const { name, price, content } = req.body;
        const result = await cloudinary.uploader.upload(req.file.path); // Upload image to Cloudinary
        const newProduct = new Products({
            img: result.secure_url, // Use secure URL provided by Cloudinary
            name,
            price,
            content
        });
        await newProduct.save();
        res.redirect('/admin/add');
    } catch (err) {
        console.error('Error adding product', err);
        res.status(500).send('Internal Server Error');
    }
});

// Route for rendering the remove product form
router.get('/remove', async (req, res) => {
    try {
        const products = await Products.find();
        res.render('admin/remove', { products });
    } catch (err) {
        console.error('Error fetching products', err);
        res.status(500).send('Internal Server Error');
    }
});

// Route for handling the removal of a product
router.post('/remove', async (req, res) => {
    try {
        const { productId } = req.body;
        await Products.findByIdAndDelete(productId);
        res.redirect('/admin/remove');
    } catch (err) {
        console.error('Error removing product', err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
