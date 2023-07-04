import fs from 'fs';
import __dirname from '../utils.js';

export default class CartManager {

    constructor(path) {
        this.carts = [];
        this.path = path;
    };

    async writeInProductFiles(carts) {
        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"), "utf-8");
    };

    async newCart () {
        const cart = await this.getCart();

        const cartExist = await this.carts.some(c => c.id === cart.id);

        if (cartExist) {
            console.log(`The cart with ID: ${cart.id} already exists`);
            return;
        }

        if (cart === 0) {
            cart.id = 1
        } else {
            cart.id = cart.length + 1;
        }

        const newCartAdd = {...cart, id: cart.id};

        this.carts.push(newCartAdd);

        try {
            await this.writeInProductFiles(this.carts);
          } 
        catch(error) {
            console.error(error);
          }
      
          return newCartAdd;
    };

    async getCart () {
        let cartsFromFile = [];

        try {
            const readCarts = await fs.promises.readFile(this.path, "utf-8");
               
            cartsFromFile = JSON.parse(readCarts);
        }
        catch(error) {
            console.error(error);
            return [];
        }

        return cartsFromFile;    
    };

    async getCartById (idCart) {
        try {
            const carts = await this.getCart();
            const cart = carts.find(cart => cart.id === idCart);
    
            if (!cart) {
                console.log("Cart not found");
                return null;
            } else {
                return cart;
            }
        } catch (error) {
            console.error(error);
            return null;
        }    
    };

    async addProductToCart(cid, pid) {
        try {
          const data = await fs.promises.readFile(this.path, 'utf-8');
          const carts = JSON.parse(data);
          const cartIndex = carts.findIndex(c => c.id === cid);
      
          if (cartIndex === -1) {
            return null;
          }
      
          const cart = carts[cartIndex].products;
      
          let sameProduct = cart.find(p => p.product === pid);
      
          if (!sameProduct) {
            cart.push({ product: pid, quantity: 1 });
      
            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));
      
            return cart;
          } else {
            const cartIndex = cart.findIndex(p => p.product === pid);
            cart[cartIndex].quantity = cart[cartIndex].quantity + 1;
      
            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));
      
            return cart;
          }
        } catch (error) {
          console.log(error);
        }
      };
};