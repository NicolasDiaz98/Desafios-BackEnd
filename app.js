import express from "express";
import ProductManager from "./managers/ProductManager.js";

const productManager = new ProductManager ("./files/products.json");



const env = async() =>{

    // Array de los 10 productos solicitados 
    const product = [
        {
            "title": "Guante Nike",
            "description": "Guante de golero adulto Nike",
            "price": 3000,
            "thumbnail": "https://golero.com.mx/wp-content/uploads/2019/11/guantes-nike-mercurial-touch-victory-golerosport-0.jpg",
            "code": "Nike01",
            "stock": 20,
        },
        {
            "title": "Guante Nike Negro",
            "description": "Guante de golero adulto Nike",
            "price": 3100,
            "thumbnail": "https://golero.com.mx/wp-content/uploads/2019/11/guantes-nike-mercurial-touch-victory-golerosport-0.jpg",
            "code": "Nike02",
            "stock": 25,
        },
        {
            "title": "Guante Nike Azul",
            "description": "Guante de golero adulto Nike",
            "price": 3200,
            "thumbnail": "https://golero.com.mx/wp-content/uploads/2019/11/guantes-nike-mercurial-touch-victory-golerosport-0.jpg",
            "code": "Nike03",
            "stock": 28,
        },
        {
            "title": "Guante Nike Rojo",
            "description": "Guante de golero adulto Nike",
            "price": 3600,
            "thumbnail": "https://golero.com.mx/wp-content/uploads/2019/11/guantes-nike-mercurial-touch-victory-golerosport-0.jpg",
            "code": "Nike04",
            "stock": 19,
        },
        {
            "title": "Guante Nike Verde",
            "description": "Guante de golero adulto Nike",
            "price": 3000,
            "thumbnail": "https://golero.com.mx/wp-content/uploads/2019/11/guantes-nike-mercurial-touch-victory-golerosport-0.jpg",
            "code": "Nike05",
            "stock": 21,
        },
        {
            "title": "Guante Nike Naranja",
            "description": "Guante de golero adulto Nike",
            "price": 3050,
            "thumbnail": "https://golero.com.mx/wp-content/uploads/2019/11/guantes-nike-mercurial-touch-victory-golerosport-0.jpg",
            "code": "Nike06",
            "stock": 22,
        },
        {
            "title": "Guante Nike Violeta",
            "description": "Guante de golero adulto Nike",
            "price": 3800,
            "thumbnail": "https://golero.com.mx/wp-content/uploads/2019/11/guantes-nike-mercurial-touch-victory-golerosport-0.jpg",
            "code": "Nike07",
            "stock": 24,
        },
        {
            "title": "Guante Nike Amarillo",
            "description": "Guante de golero adulto Nike",
            "price": 3080,
            "thumbnail": "https://golero.com.mx/wp-content/uploads/2019/11/guantes-nike-mercurial-touch-victory-golerosport-0.jpg",
            "code": "Nike08",
            "stock": 26,
        },
        {
            "title": "Guante Nike Gris",
            "description": "Guante de golero adulto Nike",
            "price": 2800,
            "thumbnail": "https://golero.com.mx/wp-content/uploads/2019/11/guantes-nike-mercurial-touch-victory-golerosport-0.jpg",
            "code": "Nike09",
            "stock": 18,
        },
        {
            "title": "Guante Nike Blanco",
            "description": "Guante de golero adulto Nike",
            "price": 3500,
            "thumbnail": "https://golero.com.mx/wp-content/uploads/2019/11/guantes-nike-mercurial-touch-victory-golerosport-0.jpg",
            "code": "Nike10",
            "stock": 29,
        }
    ];


    for(let i=0; i < product.length; i+=1) {
        await productManager.addProduct(product[i]);
        console.log("Producto agregado correctamente", JSON.stringify(await productManager.getProducts()));
    }

    // Trabajando con express

    const app = express();

    app.use(express.urlencoded({extended: true}));

    // Creamos la path /products que nos retorna todos los productos del json con el método getProducts o con un query 'limit' que retorne la cantidad indicada como limite

    app.get('/products', async (req, res) => {
        const { limit } = req.query;
        let products = await productManager.getProducts();

        if(limit) {
            products = products.slice(0, Number(limit));
        }
        res.send({products});
    });

    // Creamos la path /products/:pid que nos retorna el producto según el ID que le solicitemos, utilizando el método getProductById

    app.get('/products/:pid', async (req, res) => {
        const productsId = Number(req.params.pid);
        const products = await productManager.getProductById(productsId);

        if(!products) {
            res.status(404).send({ status:'error', error:'Product Not Found'});
        } else {
           res.send(products); 
        }
    });


    app.listen(8080, () => console.log("Listening on 8080"));

};

env();

    

    
