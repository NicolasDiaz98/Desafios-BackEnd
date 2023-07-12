import { Router } from "express";
import __dirname from "../utils.js";
import ProductManager from "../managers/ProductManager.js";

const router = Router();
const productManager = new ProductManager (`${__dirname}/files/products.json`);

// Ruta para mostrar todos los productos actuales

router.get('/', async (req, res) => {
    let products = await productManager.getProducts();

    res.render('home', {products});
});

// Ruta para mostrar todos los productos actuales pero trabajando con websockets

router.get('/realtimeproducts', async (req, res) => {
    let products = await productManager.getProducts();

    res.render('realTimeProducts', {products});
});

export default router;