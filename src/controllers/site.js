const Product = require('../models/Product');
const Cart = require('../models/Cart');
var passport = require('passport');

exports.getHomepage = (req, res, next) => {
    res.render("main", { title: "Chez bRoux" })
  };

  
exports.getMenu = (req, res, next) => {
    Product.findAll(products => {
        res.render("menu", {
            title: "Menu",
            products: products
        });
    });
  }

exports.getLoginPage = ( req, res , next) => {
    res.render("userLogin", {});
}

exports.postLogin =  (req, res, next) => {
    passport.authenticate('local', function(err, user, info) {
      if (err) { return next(err); }
      if (!user) {
        return res.json({status: 'error', message: info.message});
      }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.render("main", {status: 'ok'});
      });
    })(req, res, next);
}

exports.getProductDetails= (req, res, next) => {
    Product.findById(req.params.id, product => {
      res.render('product-details', {
          product: product,
          title: product.name
      });
    });
}

exports.getCart = (req, res, next) => {
  Cart.getCart(cart => {
    if (cart.products.length > 0) {
      Product.findAll(products => {
        let cartProducts = [];
  
        products.forEach(product => {
          const productData = cart.products.find(prod => prod.id === product.id);
          if(productData) {
            cartProducts.push({product: product, qté: productData.qté, végé: productData.végé})
          }
        });
  
        res.render("panier", {
          title: "Panier",
          cartProducts: cartProducts,
          prixTotal: cart.prixTotal,
          hasProducts: true
        });
      });
    }
    else {
      res.render("panier", {
        title: "Panier",
        hasProducts: false
      });
    }
  });
  };

exports.postCart = (req, res, next) => {
    Product.findById(req.body.productId, product => {
      Cart.add(req.body.productId, product.prix, () => {
        res.redirect('panier');
      });
    });
}

exports.getCheckout = (req, res, next) => {
  Cart.getCart(cart => {
    if (cart.products.length > 0) {
      Product.findAll(products => {
        let cartProducts = [];
  
        products.forEach(product => {
          const productData = cart.products.find(prod => prod.id === product.id);
          if(productData) {
            cartProducts.push({product: product, qté: productData.qté})
          }
        });
  
        res.render("checkout", {
          title: "Checkout",
          cartProducts: cartProducts,
          prixTotal: cart.prixTotal,
          hasProducts: true
        });
      });
    }
    else {
      res.render("checkout", {
        title: "Checkout",
        hasProducts: false
      });
    }
    });
  };
