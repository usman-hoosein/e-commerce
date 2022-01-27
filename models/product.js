const mongodb = require('mongodb')
const getDb = require("../util/database").getDb

class Product {
  constructor(title, price, imageUrl, description) {
    this.title = title
    this.price = price
    this.imageUrl = imageUrl
    this.description = description
  }
  
  save() {
    //Access the database
    let db = getDb()
    // Accesses/Creates a collection (in this case, collection is called "products")
    //  Also creates a document onto the collection
    return db.collection('products')
      .insertOne(this)
      .then(result => {
        console.log(result)
      })
      .catch(err => console.log(err))
    }

    static fetchAll() {
      let db = getDb()
      return db.collection('products')
        //find() function returns a cursor which allows access to
        //  each document by incrementing through the data
        .find()
        .toArray()
        .then(result => {
          return result
        })
        .catch(err => console.log(err))
    }

    static findById(prodId) {
      const db = getDb()

      return db.collection('products')
      .find({_id: new mongodb.ObjectID(prodId)})
      .next()
      .then(product => {
        return product
      })
      .catch(err => console.log(err))
    }

    static deleteById(prodId) {
      const db = getDb()

      this.findById(prodId)
      .then(product => {
        return db.collection("products")
        .deleteOne(product)
        .then(res => {
          console.log(res)
          return res
        })
      })
      .catch(err => console.log(err))
        
    }
}

module.exports = Product

// OLD SCRIPT
// const db = require('../util/database')
// const Cart = require('./cart')

// module.exports = class Product {
//   constructor(id, title, imageUrl, description, price) {
//     this.id = id
//     this.title = title;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this.price = price;
//   }

//   save() {
//     return db.execute('INSERT INTO products (title, price, description, imageUrl) VALUES (?, ?, ?, ?)',
//     [this.title, this.price, this.description, this.imageUrl])
//   }

//   static deleteByID(id, price) {
    
//   }

//   //Function is going to return a "promise" of all the products and their information;
//   static fetchAll() {
//     //"execute()" function allows admin to run a query (to the database server
//     //  through one of the multiple connections established on the "pool") in 
//     //  a javascript file.
//     return db.execute('SELECT * FROM products')
//   }

//   static findByID(id) {
//     return db.execute('SELECT * FROM products WHERE products.id = ?', [id])
//   }
// };
