import ProductManager from "./managers/ProductManager.js";

const manager = new ProductManager ("./files/products.json");

const env = async() =>{

    const product = {
        title: "Guante Nike",
        description: "Guante de golero adulto Nike",
        price: 3000,
        thumbnail: "https://golero.com.mx/wp-content/uploads/2019/11/guantes-nike-mercurial-touch-victory-golerosport-0.jpg",
        code: "Nike01",
        stock: 20,
    };

    const prod = await manager.addProduct(product);

    await manager.addProduct(product);
    console.log("Producto agregado correctamente", JSON.stringify(await manager.getProducts()));

    await manager.updateProduct({...prod, price: 3500});
    console.log("Producto actualizado correctamente", JSON.stringify(await manager.getProducts()));

    await manager.deleteProduct(prod.id); 
    console.log("Producto eliminado correctamente", JSON.stringify(await manager.getProducts()));

    const productResult = await manager.getProducts();
    console.log(productResult);

};

env();

    

    
