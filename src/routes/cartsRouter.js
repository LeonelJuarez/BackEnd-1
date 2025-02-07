import { Router } from "express";
import fs from "fs";
import { v4 as uuidv4 } from 'uuid';

export const CartsRouter = Router();

const pathCarts = "./src/data/carts.json"
const pathProducts = "./src/data/products.json";

CartsRouter.get("/:cid" , async(req,res)=>{
    try {
        //Parametro
        const {cid} = req.params;
        
        //Leemos el archivo
        const readArc = await fs.promises.readFile(pathCarts, "utf-8");
        const carts = JSON.parse(readArc);

        const cartId = carts.find((cart) => cart.id === cid);

        res.send({data: cartId || `No se encontro el carrito ${cid}`})
    } catch (error) {
        res.status(400).send({
            error : error.message,
            message : "Error"
        })
    }

})

CartsRouter.post("/", async (req,res)=>{
    try {
        //Leemos el archivo y lo parseamos a objeto
        const readCart = await fs.promises.readFile(pathCarts, "utf-8");
        const carts = JSON.parse(readCart);
        //Id unico
        const id = uuidv4();
        
        const {
            products,
        } = req.body;

        const cart = {
            id,
            products
        }

        carts.push(cart);

        //Trasformar a String
        const cartsString = JSON.stringify(carts, null, "\t");
        //Escribimos el archivo
        await fs.promises.writeFile(pathCarts, cartsString);

        res.send({message: "Carts creada", data:cart});
    } catch (error) {
        res.status(400).send({message: error.message})
    }
})

CartsRouter.post("/:cid/product/:pid" , async (req,res)=>{
    try {
        //Leemos y parciamos el CARTS
        const readCart = await fs.promises.readFile(pathCarts, "utf-8");
        const carts = JSON.parse(readCart);
        //Leemos y parciamos los PRODUCTS
        const readProduc = await fs.promises.readFile(pathProducts, "utf-8")
        const products = JSON.parse(readProduc);

        //Capturamos los params
        const {cid} = req.params;
        const {pid} = req.params;

        const cartId = carts.find((cart) => cart.id === cid);
        const productId = products.find((product) => product.id === pid)
        cartId.products.push( productId.id);
           
        //Trasformo a String 
        const updateCarts = JSON.stringify(carts,null ,"\t");
        await fs.promises.writeFile(pathCarts, updateCarts)
        res.send({
            message: "Producto agregado",
            data: cartId
        })

    } catch (error) {
        res.status(400).send({
            error: error.message
        })
    }
})

