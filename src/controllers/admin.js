const Product = require("../models/Product");
const Confirmed = require("../models/Confirmed");
const Cart = require("../models/Cart");

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

exports.postConfirmed = (req, res) => {
    const newConfirmed = new Confirmed(req.body.cartId, req.body.prixTotal, req.body.products.id, req.body.products.qté);
    newConfirmed.save(() => {
        res.redirect('/confirmed');
    });
    // Cart.findById(req.body.cartId, cart=> {
    //     Confirmed.add(req.body,cartId, cart.prixTotal, () =>{
    //         res.redirect('confirmed');
    //     });
    // });

}

// exports.getConfirmed = (req, res) => {
//     Confirmed.getConfirmed(confirm => {
//         Cart.findAll(carts => {
//             let confirmedCarts = [];

//             carts.forEach(cart => {
//                 const cartData = confirm.carts.find(panier => panier.cartId === panier.cartId);
//                 if(cartData) {
//                     confirmedCarts.push({cart: cart})
//                 }
//             });

//             res.render("confirmed", {
//                 title:"Confirmed",
//                 confirmedCarts: confirmedCarts,
//             });
//         });
//     });
// }


// exports.getCart = (req, res, next) => {
//     Cart.getCart(cart => {
//       if (cart.products.length > 0) {
//         Product.findAll(products => {
//           let cartProducts = [];
    
//           products.forEach(product => {
//             const productData = cart.products.find(prod => prod.id === product.id);
//             if(productData) {
//               cartProducts.push({product: product, qté: productData.qté})
//             }
//           });
    
//           res.render("panier", {
//             title: "Panier",
//             cartProducts: cartProducts,
//             prixTotal: cart.prixTotal,
//             hasProducts: true
//           });
//         });
//       }
//       else {
//         res.render("panier", {
//           title: "Panier",
//           hasProducts: false
//         });
//       }
//     });
//     };
// exports.postCart = (req, res, next) => {
//     Product.findById(req.body.productId, product => {
//       Cart.add(req.body.productId, product.prix, () => {
//         res.redirect('panier');
//       });
//     });