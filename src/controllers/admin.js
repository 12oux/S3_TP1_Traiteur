const Product = require("../models/Product");

exports.getAdmin = (req, res) => {
    res.render('admin', {title: "Admin"})
};

exports.postAdmin = (req, res) => {
    const {name, description, prix, image} = req.body;
    const newProduct = new Product(name, description, prix, image);
    newProduct.save(() => {
        res.redirect('/menu');
    });
};