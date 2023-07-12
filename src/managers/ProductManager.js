import fs from 'fs';
import __dirname from '../utils.js';


// Creación de la clase

export default class ProductManager {
    constructor(path) {
        this.products = [];
        this.path = path;
    }

// Código para crear un archivo en formato JSON en la carpeta files

    async writeInProductFiles(products) {

            await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"), "utf-8");
    };

// Método para agregar un producto al archivo json "products"

    async addProduct(product) {

        const products = await this.getProducts();

        const productRequired = [product.title, product.description, product.price, product.thumbnail, product.code, product.stock];
        const allRequired = productRequired.every(items => items);

        if (!allRequired) {
            console.log("Todos los campos son obligatorios, por favor completar correctamente");
            return;
        }

        const productExist = await this.products.some(p => p.code === product.code);

        if (productExist) {
            console.log(`El código: ${product.code} del producto agregado ya existe`);
            return;
        }

        if (products === 0) {
            product.id = 1
        } else {
            product.id = products.length + 1;
        }

        if(!product.thumbnail) {
            product.thumbnail = [];
        } 

        if(!product.status) {
            product.status = true;
        } 
        
        const newProduct = {...product, id: product.id};

        this.products.push(newProduct);

        try {
            await this.writeInProductFiles(this.products);
          } 
        catch(error) {
            console.error(error);
          }
      
          return newProduct;
    };

// Método para obtener los productos actuales en el archivo products.json dentro de la carpeta files

    async getProducts() {
        let productsFromFile = [];

        try {
            const readProducts = await fs.promises.readFile(this.path, "utf-8");
               
            productsFromFile = JSON.parse(readProducts);
        }
        catch(error) {
            console.error(error);
            return [];
        }

        return productsFromFile;
    };

// Método para obtener productos según su id generado en el archivo products.json dentro de la carpeta files 

     getProductById = async (idProduct) => {

        try {
            const products = await this.getProducts();
            const product = products.find(product => product.id === idProduct);
    
            if (!product) {
                console.log("Product not found");
                return null;
            } else {
                return product;
            }
        } catch (error) {
            console.error(error);
            return null;
        }
    };

// Método para actualizar un producto según su ID

    async updateProduct(updateProduct) {
        const productUpdate = await this.getProducts();
        const productIndex = productUpdate.findIndex(product => product.id === updateProduct.id);

        if (productIndex === -1) {
            console.log(`El producto con código: ${updateProduct.id} que desea actualizar no se ha encontrado`);
            return;
        }

        productUpdate[productIndex] = updateProduct;

        try {
            await this.writeInProductFiles(productUpdate);
        }
        catch(error) {
            console.error(error);
        }

        return updateProduct;
    };
    
// Método para actualizar un producto según su ID

    async deleteProduct(id) {
        const productDelete = await this.getProducts();
        const productIndex = this.products.findIndex(product => product.id === id);

        if (productIndex === -1) {
            console.log(`El producto con código: ${id} que desea eliminar no se ha encontrado`);
            return;
        }

        productDelete.splice(productIndex, 1);

        await this.writeInProductFiles(productDelete);

        return this.products;
    };

};

const productManager = new ProductManager (`${__dirname}/files/products.json`);

//const env = async() =>{

    // Array de los 10 productos solicitados 
//     const product = [
//         {
//             "title": "Guante Nike",
//             "description": "Guante de golero adulto Nike",
//             "price": 3000,
//             "thumbnail": "https://golero.com.mx/wp-content/uploads/2019/11/guantes-nike-mercurial-touch-victory-golerosport-0.jpg",
//             "code": "Nike01",
//             "stock": 20,
//         },
//         {
//             "title": "Guante Nike Negro",
//             "description": "Guante de golero adulto Nike",
//             "price": 3100,
//             "thumbnail": "https://golero.com.mx/wp-content/uploads/2019/11/guantes-nike-mercurial-touch-victory-golerosport-0.jpg",
//             "code": "Nike02",
//             "stock": 25,
//         },
//         {
//             "title": "Guante Nike Azul",
//             "description": "Guante de golero adulto Nike",
//             "price": 3200,
//             "thumbnail": "https://golero.com.mx/wp-content/uploads/2019/11/guantes-nike-mercurial-touch-victory-golerosport-0.jpg",
//             "code": "Nike03",
//             "stock": 28,
//         },
//         {
//             "title": "Guante Nike Rojo",
//             "description": "Guante de golero adulto Nike",
//             "price": 3600,
//             "thumbnail": "https://golero.com.mx/wp-content/uploads/2019/11/guantes-nike-mercurial-touch-victory-golerosport-0.jpg",
//             "code": "Nike04",
//             "stock": 19,
//         },
//         {
//             "title": "Guante Nike Verde",
//             "description": "Guante de golero adulto Nike",
//             "price": 3000,
//             "thumbnail": "https://golero.com.mx/wp-content/uploads/2019/11/guantes-nike-mercurial-touch-victory-golerosport-0.jpg",
//             "code": "Nike05",
//             "stock": 21,
//         },
//         {
//             "title": "Guante Nike Naranja",
//             "description": "Guante de golero adulto Nike",
//             "price": 3050,
//             "thumbnail": "https://golero.com.mx/wp-content/uploads/2019/11/guantes-nike-mercurial-touch-victory-golerosport-0.jpg",
//             "code": "Nike06",
//             "stock": 22,
//         },
//         {
//             "title": "Guante Nike Violeta",
//             "description": "Guante de golero adulto Nike",
//             "price": 3800,
//             "thumbnail": "https://golero.com.mx/wp-content/uploads/2019/11/guantes-nike-mercurial-touch-victory-golerosport-0.jpg",
//             "code": "Nike07",
//             "stock": 24,
//         },
//         {
//             "title": "Guante Nike Amarillo",
//             "description": "Guante de golero adulto Nike",
//             "price": 3080,
//             "thumbnail": "https://golero.com.mx/wp-content/uploads/2019/11/guantes-nike-mercurial-touch-victory-golerosport-0.jpg",
//             "code": "Nike08",
//             "stock": 26,
//         },
//         {
//             "title": "Guante Nike Gris",
//             "description": "Guante de golero adulto Nike",
//             "price": 2800,
//             "thumbnail": "https://golero.com.mx/wp-content/uploads/2019/11/guantes-nike-mercurial-touch-victory-golerosport-0.jpg",
//             "code": "Nike09",
//             "stock": 18,
//         },
//         {
//             "title": "Guante Nike Blanco",
//             "description": "Guante de golero adulto Nike",
//             "price": 3500,
//             "thumbnail": "https://golero.com.mx/wp-content/uploads/2019/11/guantes-nike-mercurial-touch-victory-golerosport-0.jpg",
//             "code": "Nike10",
//             "stock": 29,
//         }
//     ];

//     for(let i=0; i < product.length; i+=1) {
//         await productManager.addProduct(product[i]);
//         console.log("Producto agregado correctamente", JSON.stringify(await productManager.getProducts()));
//     }
// };

// env();

