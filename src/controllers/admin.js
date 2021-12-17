const Product = require("../models/Product");
const Confirmed = require("../models/Confirmed");
const Cart = require("../models/Cart");
var adminPassport = require('passport');
const { createPoolCluster } = require("mariadb");



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

exports.getLoginAdmin = ( req, res , next) => {
    res.render("adminLogin", {});
}

exports.postLoginAdmin =  (req, res, next) => {
    adminPassport.authenticate('local', function(err, user, info) {
      if (err) { return next(err); }
      if (!user) {
        return res.json({status: 'error', message: info.message});
      }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.render("admin", {status: 'ok'});
      });
    })(req, res, next);
}

exports.postConfirmed = (req, res) => {
    const newConfirmed = new Confirmed(req.body.cartId, req.body.prixTotal, req.body.products);
    newConfirmed.save(() => {
        res.redirect('/confirmed');
    });
}

exports.getCartDetails = (req, res) => {
    Confirmed.findById(req.params.cartId, confirmed => {
        let produits = JSON.parse(confirmed.products);
        res.render('cart-details', {
            confirmed: confirmed,
            title: confirmed.cartId,
            products: produits,
        });
      });
}


exports.getConfirmed = (req, res, next) => {
    Confirmed.getConfirmed(carts => {
        Cart.findAll(confirmed => {
            let confirmedCarts = [];
            carts.forEach(cart => {
                const cartData = carts.find(panier => panier.cartId === cart.cartId);
                if(cartData) {
                    confirmedCarts.push({cart: cart})

                }
            });

            res.render("confirmed", {
                title:"Confirmed",
                confirmedCarts: confirmedCarts,
                prixTotal: carts.prixTotal,
                hasCarts: true
            });
        });
        }
    );
}
