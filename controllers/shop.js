const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(products => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products'
      })
    })
    .catch(err => {
      console.log(err)
    })
};

exports.getProduct = (req, res, next) => {
  const prodID = req.params.productID
  Product.findById(prodID)
    .then(product => {
      res.render("shop/product-detail", {
        pageTitle: product.title,
        product: product,
        path: "/products"
      })
    })
}


exports.getIndex = (req, res, next) => {
  Product.fetchAll()
  .then(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    })
  })
  .catch(err => {
    console.log(err)
  })
}

// exports.postCart = (req, res, next) => {
//   const prodID = req.body.productID
//   let fetchedCart
//   let newQuantity = 1
//   req.user 
//     .getCart()
//       .then(cart => {
//         fetchedCart = cart
//         //Returns a promise array
//         return cart.getProducts({where: {id: prodID}})
//       })
//         .then(products => {
//           let product
//           //Checking if the product is already in the cart
//           if (products.length > 0)
//           {
//             product = products[0]
//           }
//           //Incrementing the quantity of a product if it already
//           //  exists in the cart
//           if (product)
//           {
//             let oldQuantity = product.cartItem.quantity
//             newQuantity = oldQuantity + 1
//           }
//           //Adding the product to the cart if it isn't already in the cart
//           return Product.findByPk(prodID)
//         })
//           .then(product => {
//             fetchedCart.addProduct(product, {through: {quantity: newQuantity}})
//           })
//             .then(product => {
//               res.redirect("/cart")
//             })
//             .catch(err => console.log(err))
//           .catch(err => console.log(err))  
//         .catch(err => console.log(err))
//       .catch(err => console.log(err))
// }

// exports.getCart = (req, res, next) => {
//   req.user
//     //fetching the cart
//     .getCart()
//       .then(cart => {
//         //Accessing the products that belong to that cart
//         return cart.getProducts()
//       })
//         .then(products => {
//           res.render("shop/cart", {
//             pageTitle: "Cart",
//             path: "/cart",
//             product: products
//           })
//         })
//         .catch(err => {
//           console.log(err)
//         })
//       .catch(err => {
//         console.log(err)
//       })

// exports.getOrders = (req, res, next) => {
//   req.user
//     .getOrders({ include: ["products"] })
//     .then(orders => {
//       res.render('shop/orders', {
//         path: '/orders',
//         pageTitle: 'Your Orders',
//         orders: orders
//       });
//     })
//     .catch(err => console.log(err))
  
// };

// exports.postCartDeleteItem = (req, res, next) => {
//   const prodId = req.body.productId;
//   req.user
//     .getCart()
//     .then(cart => {
//       return cart.getProducts({ where: { id: prodId } });
//     })
//     .then(products => {
//       const product = products[0];
//       return product.cartItem.destroy();
//     })
//     .then(result => {
//       res.redirect('/cart');
//     })
//     .catch(err => console.log(err));
//   // const prodPrice = req.body.productPrice
//   // Cart.deleteFromCart(prodID, prodPrice)
// }

// exports.postOrders = (req, res, next) => {
//   let fetchedCart
//   req.user
//     .getCart()
//       .then(cart => {
//         fetchedCart = cart
//         return cart.getProducts()
//       })
//       .then(products => {
//         req.user.createOrder()
//         .then(order => {
//           return order.addProducts(products.map(product => {
//             product.orderItem = {quantity: product.cartItem.quantity}
//             return product
//         }))
//       })
//     })
//       .then(result => {
//         return fetchedCart.setProducts(null)
//       })
//       .then(result => {
//         res.redirect('/orders')
//       })
//       .catch(err => console.log(err))
// }
