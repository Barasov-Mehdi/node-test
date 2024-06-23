const express = require('express');
const mongoose = require('mongoose');
const productsSchema = new mongoose.Schema({
    img: String,
    name: String,
    price: Number,
    content: String,
    date: {
        type: Date,
        default: Date.now
    }
});

const Products = mongoose.model('Products', productsSchema);
module.exports = Products;