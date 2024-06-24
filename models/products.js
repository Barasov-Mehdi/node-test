const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
    img: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: mongoose.Types.Decimal128, required: true },
    content: { type: String, required: true },
    date: {
        type: Date,
        default: Date.now
    }
});

const Products = mongoose.model('Products', productsSchema);
module.exports = Products;
