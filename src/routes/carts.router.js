import { Router } from "express";
import __dirname from "../utils.js";
import CartManager from "../managers/CartManager.js";
import ProductManager from "../managers/ProductManager.js";

const router = Router();
const cartManager = new CartManager(`${__dirname}/files/carts.json`);
const productManager = new ProductManager(`${__dirname}/files/products.json`);

router.post('/', async (req, res) => {
    const cart = await cartManager.newCart();
    res.send({ status:"success", payload: cart });
 });
 
 router.get('/:cid', async (req, res) => {
     const idCart = Number(req.params.cid);
     const cart = await cartManager.getCartById(idCart);

     if(!cart) {
         return res.status(400).send({ status:'error', error:`Incorrect cart, the cart ${idCart} not exist` });
     } 

     res.send({ status:"success", payload: cart });
 })
 
router.post('/:cid/product/:pid', async (req, res) => {
     const idCart = Number(req.params.cid);
     const idProduct = Number(req.params.pid);

     const product = productManager.getProductById(idProduct);

     if(!product) {
         return res.status(400).send({ error: `Product with id: ${idProduct} was not found` });
     } 
 
     const cart = cartManager.addProductToCart(idCart, idProduct);

     if(!cart) {
         return res.status(400).send({ error: `Incorrect cart, the cart ${idCart} not exist` });
     } 

     res.send({ status:"success", payload: cart });
 });

export default router;