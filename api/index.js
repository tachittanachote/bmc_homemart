const express = require("express");
const path = require('path');
const session = require('express-session')
const cors = require('cors')

const db = require('./db_connection');
const dataController = require('./controllers/dataController')
const authRoute = require("./routes/auth");
const adminRoute = require("./routes/admin");
const { isLoggedIn } = require("./middleware/auth");
//const middleware = require("./middleware");

require('dotenv').config();

const PORT = 8000
const app = express()
const router = express.Router();

app.use(
  session({
    secret: 'BMCSYSTEMSECRETS',
    resave: false,
    saveUninitialized: false
  })
)

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(router)
app.set('view engine', 'ejs')
app.use(cors())

router.use('/system', authRoute)
router.use('/admin', isLoggedIn, adminRoute)

app.get("/", isLoggedIn, (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
  //res.redirect('/login')
});

app.get("/login", (req, res) => {
  res.render('login')
  //res.sendFile(__dirname + '/views/login.html');
});

app.get("/nav", (req, res) => {
  res.sendFile(__dirname + '/views/components/nav.html');
});

app.get("/sidenav", (req, res) => {
  res.sendFile(__dirname + '/views/components/sidenav.html');
});

app.get("/page/catagories", (req, res) => {
  res.sendFile(__dirname + '/views/pages/categories.html');
});

app.get("/categories", async (req, res) => {
    let data = await dataController.getCategories();
    res.json(data);
});

app.get("/categories/:id", async (req, res) => {
    let id = req.params.id
    let data = await dataController.getCategoryById(id)
    res.json(data);
});

app.get("/categories/:id/types", async (req, res) => {
  let id = req.params.id
  let data = await dataController.getTypeByCategoryId(id)
  res.json(data);
});

app.get("/categories/:id/types/:tid/products", async (req, res) => {
  let id = req.params.id
  let tid = req.params.tid
  let types = await dataController.getTypeByCategoryId(id)
  let products = await dataController.getProductsWithDeatilByTypeId(tid)
  let images = await dataController.getImages()
  let data = {
    types: types,
    products: products,
    images: images
  }
  res.json(data);
});

app.get("/categories/:id/types/:tid/products/:pid", async (req, res) => {
  let id = req.params.id
  let tid = req.params.tid
  let pid = req.params.pid
  let types = await dataController.getTypeByCategoryId(id)
  let products = await dataController.getProductsWithDeatilByTypeId(tid)
  let product = await dataController.getProductWithDetailById(pid)
  let images = await dataController.getImageNameByProductId(pid)
  let data = {
    types: types,
    products: products,
    product: product,
    images: images
  }
  res.json(data);
});

app.get("/categories/products/:pid", async (req, res) => {
  let pid = req.params.pid
  let product = await dataController.getProductWithDetailById(pid)
  let images = await dataController.getImageNameByProductId(pid)
  let data = {
    product: product,
    images: images
  }
  res.json(data);
});

app.get("/categories/products/:pid/detail", async (req, res) => {
  let pid = req.params.pid
  let product = await dataController.getProductWithDetailById(pid)
  let images = await dataController.getImageNameByProductId(pid)
  let data = {
    product: product,
    images: images
  }
  res.json(data);
});

app.get("/categories/types/:tid/products", async (req, res) => {
  let tid = req.params.tid
  let data = await dataController.getProductsWithDeatilByTypeId(tid)
  res.json(data)

});

app.get("/promotions", async (req, res) => {
  let data = await dataController.getPromotionsWithProductsDetails()
  res.json(data)
});

app.get("/recommends", async (req, res) => {
  let data = await dataController.getRecommendsWithProductsDetails()
  res.json(data)
});

app.get("/recommends/:tid", async (req, res) => {
  let tid = req.params.tid
  let data = await dataController.getRecommendsWithProductsDetailsWithTypeId(tid)
  res.json(data)
});

app.get("/slides", async (req, res) => {
  let data = await dataController.getSlides()
  res.json(data)
});

app.listen(PORT, ()=> console.log(`server running on port ${PORT}`))
