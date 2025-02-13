//importamos el modulo de express
import express from "express";
import {ProductsRouter} from "../routes/productsRouter.js";
import  {CartsRouter}  from "../routes/cartsRouter.js";
import { engine } from "express-handlebars";
import fs from "fs"
//import path from "path";


const initApp = () =>{
    
    //Creamos app 
    const app = express();
    
    
    app.use(express.json());
    //app.use(express.urlencoded({extended:true}));

    //Motor de plantillas
    app.engine("handlebars", engine());
    app.set("views" , "./src/views");
    app.set("view engine", "handlebars");

    app.get("/home", async (req,res)=>{
        try {
            const productString = await fs.promises.readFile("./src/data/products.json", "utf-8");
            const productObj = JSON.parse(productString);
            res.render("home", {products :productObj});
        } catch (error) {
         res.status(500).send({message: error})   
        }
    })
    
    app.use("/api/products" , ProductsRouter) //Ruta a product

    app.use("/api/carts" , CartsRouter) //Ruta a carts
    

    return app;
}

export default initApp;

