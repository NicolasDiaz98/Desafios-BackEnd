import fs from 'fs';


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
            const productIndex = await this.products.find(product => product.id == idProduct);

            if(productIndex === -1) {
                console.log("Not found");
                return;
            } else {
                return productIndex;
            }
        }
        catch(error) {
            console.error(error);
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

