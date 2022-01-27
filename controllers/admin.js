const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  
  let product = new Product(title, price, imageUrl, description)
  
  product.save()
  .then(result => {
    console.log("Created product")
    res.redirect('admin/add-product')
  })
  .catch(err => console.log(err))
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit
  const prodID = req.params.productID
  Product.findById(prodID)
    .then(product => {
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/edit-product",
        editing: editMode,
        product: product
      })
  })
}

exports.postEditProduct = (req, res, next) => {
  const prodID = req.body.productID;
  const utitle = req.body.title;
  const uimageUrl = req.body.imageUrl;
  const uprice = req.body.price;
  const udescription = req.body.description;
  Product.findById(prodID)
    .then(product => {
      product.title = utitle
      product.imageUrl = uimageUrl
      product.price = uprice
      product.description = udescription
      product.save()
      console.log("UPDATED PRODUCT!")
      res.redirect('/admin/products')
    })
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then((result)=> {
      res.render('admin/products', {
        prods: result,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      });
    });
};

exports.postDeleteProduct = (req, res, next) => {
  const prodID = req.body.productID
  const price = req.body.productPrice
  Product.deleteById(prodID)
    .then(product => {
      console.log("PRODUCT DESTROYED")
      res.redirect("/admin/products")
    })
}
