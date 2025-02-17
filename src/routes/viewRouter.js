import { Router } from "express";
import fs from "fs";


export const ViewRouter = Router();

ViewRouter.get("/", async (req,res)=>{
        try {
            const productString = await fs.promises.readFile("./src/data/products.json", "utf-8");
            const productObj = JSON.parse(productString);
            res.render("home", {products :productObj});
        } catch (error) {
         res.status(500).send({message: error})   
        }
})



//Vista con Websockets
ViewRouter.get("/realtimeproducts", async (req,res)=>{
    try {
        res.render("realtimeProducts", {})
    } catch (error) {
        
    }
})



export default ViewRouter