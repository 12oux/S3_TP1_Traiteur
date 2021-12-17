
const fs = require('fs');
const path = require('path');

const uuid = require('uuid');
const Cart = require('./Cart');
const Product = require('./Product');

const appDir= path.dirname(require.main.filename);

const p = path.join(appDir, 'src', 'data', 'confirmed.json');

const getConfirmedFromFile = (callback) => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            callback([]);
        } 
        else {
            callback(JSON.parse(fileContent));
        }
    });
}

class Confirmed extends Cart {
    constructor(cartId, prixTotal, cartProducts){
        super(prixTotal, cartProducts);
        this.cartId = cartId;
    }

    save(callback){
        this.cartId = uuid.v1();
            fs.readFile(p, (err, fileContent) => {
                let confirmed = [];
                if (!err) {
                    confirmed = JSON.parse(fileContent);
                }
                confirmed.push({cartId:this.cartId, prixTotal:this.prixTotal, products:[this.products]});

                fs.writeFile(p, JSON.stringify(confirmed), err => {
                    if (err) console.log(err);
                    callback();
            });

        });
    }
    static getConfirmed(callback){
        fs.readFile(p, (err, fileContent) => {
            let confirmed= {cartId:this.cartId , prixTotal: 0};
            if (!err) {
                confirmed = JSON.parse(fileContent);
            }
            callback(confirmed);
        })
    }
    static findById(cartId, callback){
            getConfirmedFromFile(confirmed => {
                const cart = confirmed.find(panier => panier.cartId === cartId);
                callback(cart);
            });
        }
}

module.exports = Confirmed;