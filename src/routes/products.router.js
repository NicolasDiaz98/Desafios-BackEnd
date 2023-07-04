import { Router } from "express";
import __dirname from "../utils.js";
import ProductManager from "../managers/ProductManager.js";

const router = Router();
const productManager = new ProductManager (`${__dirname}/files/products.json`);

// Path '/' global que devuelve todos los products o si se solicita un limite determinado de productos

router.get('/', async (req, res) => {
    const { limit } = req.query;
    let products = await productManager.getProducts();

    if (limit) {
        const limitedProducts = products.slice(0, Number(limit));
        return res.send({ status: "success", payload: limitedProducts });
    }

    res.send({ status: "success", payload: products });
});

// Creamos la path /:pid que nos retorna el producto según el ID que le solicitemos, utilizando el método getProductById

router.get('/:pid', async (req, res) => {
    const productId = Number(req.params.pid);
    const product = await productManager.getProductById(productId);

    if(!product) {
        res.status(404).send({ status:'error', error:'Product Not Found'});
    } else {
       res.send({status:"success", payload: product}); 
    }
});

router.post('/', async (req, res) => {
    const body = req.body;
    const products = await productManager.addProduct(body);
    if(!products) {
        return res.status(400).send({ status:'error', error:'It was not possible to add the product' });
    } 
    res.send({ status: "success", payload: products });
});

router.put('/:pid', async (req, res) => {
    const productId = Number(req.params.pid);
    const body = req.body;
    const product = await productManager.updateProduct({...body, id: productId});
    if(!product) {
        return res.status(400).send({ status:'error', error:'Product Not Found' });
    } 
    res.send({ status: "success", payload: product });
});

router.delete('/:pid', async (req, res) => {
    const productId = Number(req.params.pid);
    const product = await productManager.deleteProduct(productId);
    if(!product) {
        return res.status(400).send({ error: `Product with id: ${productId} was not found` });
    } 
    res.send({ status: "success", payload: product });
});


export default router;