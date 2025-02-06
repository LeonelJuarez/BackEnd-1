import initApp from "./app/index.js";

const app = initApp();

const server = app.listen( 8080 , ()=>{
    console.info("Server on")
})

