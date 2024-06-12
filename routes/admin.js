const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Products = require('../models/products');


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

router.post('/add', upload.single('img'), async (req, res) => {
    try {
        const { name, price } = req.body;
        const img = req.file.filename; // Get the filename of the uploaded image
        const newProduct = new Products({ img, name, price }); // Use img variable to store the filename
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
