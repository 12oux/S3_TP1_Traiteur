const fs = require('fs');
const path = require('path');

const uuid = require('uuid');

const appDir= path.dirname(require.main.filename);

const p = path.join(appDir, 'src', 'data', 'products.json');

const getProductsFromFile = (callback) => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            callback([]);
        }
        else {
            callback(JSON.parse(fileContent));
        }
    });
}

class Product {
    constructor(name, description, prix, image) {
        this.name = name;
        this.description = description;
        this.prix = prix;
        this.image = image;
    }
    save(callback){
        this.id = uuid.v1();
        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), err => {
                if (err) console.log(err);
                callback();
            });
        });
    }
    

    static findAll(callback) {
        getProductsFromFile(products => {
            callback(products)
        });
    }
    static findById(id, callback){
        getProductsFromFile(products => {
            const product = products.find(prod => prod.id === id);
            callback(product);
        });
    }
}

module.exports = Product;