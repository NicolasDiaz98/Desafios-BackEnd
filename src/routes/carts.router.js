import { Router } from 'express';
import ProductManager from '../managers/ProductManager.js';
import CartManager from '../managers/CartManager.js';
import __dirname from '../utils.js';

const router = Router();
const cartManager = new CartManager(`${__dirname}/files/carts.json`);
const productManager = new ProductManager(`${__dirname}/files/products.json`);

// Path para crear un nuevo carrito

router.post('/', async(req, res) => {
    const cart = await cartManager.newCart();
    res.send({ status: 'success', payload: cart});
});

// Path para obtener los productos de un carrito con su ID

router.get('/:cid', async(req, res) => {
    const cartId = Number(req.params.cid);
    const cart = await cartManager.getCart(cartId);

    if(!cart){
        return res.status(400).send({ error: `Cart with ID: ${cartId}, not exists`});
    }
    res.send({status: 'success', payload: cart});
});

// Path para agregar un producto a un carrito mediante el ID del carrito y el ID del producto

router.post('/:cid/product/:pid', async (req, res) => {
    const cartId = Number(req.params.cid);
    const productId = Number(req.params.pid);

    const product = await productManager.getProductById(productId)
    if(!product){
        return res.status(400).send({error: `Product with ID: ${productId}, not exists`});
    }

    const cart = await cartManager.addProduct(cartId, productId);
    if(!cart) {
        return res.status(400).send({ error: `Can't found cart with ID: ${cartId}`});
    };
    res.send({status: 'success', payload: cart});
})

export default router;