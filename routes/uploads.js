const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const Product = require('../models/Product'); // Product modelinizi burada kullanılacak şekilde include edin

// Cloudinary yapılandırması (env dosyasından alınabilir)
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

// Ana sayfa route'u
router.get('/', async (req, res) => {
    try {
        const products = await Product.find(); // Tüm ürünleri veritabanından çekin

        // Her ürün için Cloudinary'den resim URL'sini alın ve ürüne ekleyin
        for (let product of products) {
            const result = await cloudinary.uploader.resource(product.cloudinaryPublicId); // Cloudinary'den resmi alın
            product.imageUrl = result.url; // Ürün objesine imageUrl alanı olarak ekleyin
        }

        // EJS şablonunu render ederken ürünleri ve Cloudinary resim URL'lerini gönderin
        res.render('home', { products });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
