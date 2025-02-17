import initApp from "./app/index.js";
import { Server } from "socket.io";

const app = initApp();

const server = app.listen( 8080 , ()=>{
    console.info("Server on")
})

const io = new Server(server)

io.on("connection", (socket)=>{
    console.log("Conectado");   
    //console.log({socket});
    socket.on("product", (prod)=>{
        console.log("product", prod);
        
    })
    
})

