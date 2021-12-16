const fs = require('fs');
const path = require('path');

const uuid = require('uuid');

const appDir= path.dirname(require.main.filename);

const p = path.join(appDir, 'src', 'data', 'cart.json');

const getCartsFromFile = (callback) => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            callback([]);
        } 
        else {
            callback(JSON.parse(fileContent));
        }
    });
}

class Cart {
    constructor (prixTotal, products ) {
        this.prixTotal = prixTotal;
        this.products = products;

    }

    static add(id , prixPlat, végé, callback) {

        fs.readFile(p, (err, fileContent) => {
            let cart = { products: [], végé:végé, prixTotal: 0};
            if (!err) {
                cart = JSON.parse(fileContent);
            }
            
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products[existingProductIndex];
            if (existingProduct) {
                cart.products[existingProductIndex].qté = cart.products[existingProductIndex].qté + 1;
            }
            else {
                cart.products.push({id: id, qté: 1, végé:végé});
            }

            cart.prixTotal = cart.prixTotal + +prixPlat;


                fs.writeFile(p, JSON.stringify(cart), err => {
                    if (err) console.log(err);
                    callback();
                });
            });
        };
    
    
    
    static findAll(callback) {
        getCartsFromFile(confirmed => {
            callback(confirmed)
        });
    }
    static findById(cartId, callback){
        getCartsFromFile(confirmed => {
            const cart = confirmed.find(panier => panier.cartId === cartId);
            callback(cart);
        });
    }

    static getCart(callback){
        fs.readFile(p, (err, fileContent) => {
            let cart= {products:[], prixTotal: 0};
            if (!err) {
                cart = JSON.parse(fileContent);
            }
            callback(cart);
        })
    }

    

}

module.exports = Cart;