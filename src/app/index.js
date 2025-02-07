//importamos el modulo de express
import express from "express";
import {ProductsRouter} from "../routes/productsRouter.js";
import  {CartsRouter}  from "../routes/cartsRouter.js";


const initApp = () =>{
    
    //Creamos app 
    const app = express();
    
    //import path from "path";
    
    app.use(express.json());
    //app.use(express.urlencoded({extended:true}));
    
    
    app.use("/api/products" , ProductsRouter) //Ruta a product

    app.use("/api/carts" , CartsRouter) //Ruta a carts
    

    return app;
}

export default initApp;

