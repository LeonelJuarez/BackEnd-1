export const validateProducts = (req,res, next)=>{
    
    const {title,description,price,code,stock,status,category} = req.body;
    //const product = JSON.parse(productArc);
    if(!title || !description || !price  || !code || !stock || !status || !category){
        res.send({
            message:"Todos los campos son obligatorios"
        })
        return
    }  
    next();
}