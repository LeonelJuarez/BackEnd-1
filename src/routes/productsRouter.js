import { Router } from "express";
import fs from "fs";
import { v4 as uuidv4 } from 'uuid';

export const ProductsRouter = Router();

const pathProducts = "./src/data/products.json"
const products = [];

ProductsRouter.get("/" , async (req,res)=>{
    try {
        //Leo el archivo
        const readArc = await fs.promises.readFile(pathProducts, "utf-8");
        const products = JSON.parse(readArc)
        res.send({ products:products, message: "Get Todos"})
        
    } catch (error) {
        
        res.status(400).send({message: "No hay archivo que leer" , data:error})
    }
})

ProductsRouter.get("/:id" , async(req,res)=>{
    try {
        const {id} = req.params // Se accede al ID por el parametro
        //Se lee el archivo y se parsea a JSON
        const readArch = await fs.promises.readFile(pathProducts, "utf-8");
        const products = JSON.parse(readArch);

        const productId = products.find((product) => product.id == id)
        res.send({product: productId, message: `${id}`  ||  "No se encontro el producto"})
    } catch (error) {
        res.status(400).send({
            message: error.message
        })
    }
})

ProductsRouter.post("/", async (req,res)=>{
    //Leo el archivo antes y lo parseamos a Json
    let readProdu = await fs.promises.readFile(pathProducts, "utf-8");
    const products = JSON.parse(readProdu);

    //ID Autoincremental
    const id = uuidv4();
    //Sacamos todos los productos de  req body
    const {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        status,
        category } = req.body;

    const product = { 
        id,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        category, 
        status  }
    //Pusheamos el producto a productoS
    products.push(product);

    //Trasformamos a string
    const productsString = JSON.stringify(products, null, "\t");
    //Creamos el archivo y lo escibimos
    await fs.promises.writeFile(pathProducts , productsString);

    res.send({message:"Producto creado" , data: product});

    
})

ProductsRouter.put("/:pid" , async (req,res)=>{
try {
    const {pid} = req.params; //Id para identificar el producto a modificar
    //Leo el archivo antes y lo parseamos a Json
    let readProdu = await fs.promises.readFile(pathProducts, "utf-8");
    const products = JSON.parse(readProdu);

    //Recibimos todos los datos nuevos
    const {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        status,
        category } = req.body;

        const productPut = products.find((product)=> product.id === pid)


        products = products.map((product)=>{})
        res.send({
            message:"Producto actualizado"
        })


} catch (error) {
    res.status(400).send({
        message: error.message
    })
}
})

ProductsRouter.delete("/:pid" , async(req,res)=>{
    try {
        const {pid} = req.params;
        const readArc = await fs.promises.readFile(pathProducts, "utf-8");
        let products = JSON.parse(readArc);

        products = products.filter(product=>product.id != pid)
        
        //Trasformamos a string
        const productsString = JSON.stringify(products, null, "\t");
        //Creamos el archivo y lo escibimos
        await fs.promises.writeFile(pathProducts , productsString);
        res.send({status:"sucess", message:"Product deleted"})
    } catch (error) {
        res.status(400).send({
            message: error.message
        })
    }
})