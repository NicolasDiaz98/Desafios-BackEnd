import express from "express";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import __dirname from "./utils.js";


// Trabajando con express

    const app = express();

    app.use(express.json()); // Para leer los archivos o convertirlos a JSON
    app.use(express.urlencoded({extended: true})); // Objetos codificados desde la URL
    //app.use(express.static(`${__dirname}/public`)); // Para hacer estatica la carpeta 'public'

    app.use('/api/products', productsRouter); // Nos conectamos con los miniaplicativos en este caso con products
    app.use('/api/carts', cartsRouter); // Y en este con carts

    
    app.listen(8080, () => console.log("Listening on 8080"));

    




    

    
