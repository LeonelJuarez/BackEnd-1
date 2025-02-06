import fs from "fs";

class ProductManager {
    #id;
    constructor(path) {
        this.#id = 1;
        this.products = []
        this.path = path;
    }


    async addProduct(title, description, price, thumbnail, code, stock) {

        try {
            //Verificamos si el code ya existe
            const codeExists = this.products.some(cod => cod.code === code)
            if (codeExists) {
                console.log(`No se debe repetir el codigo`);
                return;
            }

            //** Se lee el archivo antes para ver si esta vacio
            // Se convierte en Objeto 
            // Si el archivo tiene productos lo comiamos al array */
            if(fs.existsSync("./products.txt")){
                const readProduc = await fs.promises.readFile("./products.txt", "utf-8");
                const productObjet = JSON.parse(readProduc);
                this.products = [...productObjet, ...this.products]
                console.log(this.products.id)
            }
            //Verificamos que todos los campos esten completos
            if (title && description && price && thumbnail && code && stock) {
                this.products.push({
                    title,
                    description,
                    price,
                    thumbnail,
                    code,
                    stock,
                    id: this.#id,
                });
                this.#id++;
            } else {
                console.log("Error todos los campos son obligatorios")
            }
            await fs.promises.writeFile("./products.txt", JSON.stringify(this.products, null, 2))

            console.log("Producto agregado");

        } catch (error) {
            console.log(error)
        }
    }

    async getProducts() {
        //return this.products;
        try {
            console.log("Estamos en le get");
            let readArc = await fs.promises.readFile("./products.txt", "utf-8")
            console.log(readArc, this.products.id);
        } catch (error) {
            console.log("Error al leer el archivo" , error.message)
        }
    }

    async getProductsbyId(id) {

        try {
            const productId = this.products.find((element) => element.id === id);
            if (productId) return productId;
            
        } catch (error) {
            return "Not found";
            
        }

    }
}

const produc = new ProductManager();

//console.log(produc.getProducts());
//produc.addProduct("Samsung", "A10", 15666, "www.imagen.com", "200", 10);
//produc.addProduct("Samsung", "A30", 15666, "www.imagen.com", "159", 10);
/*produc.addProduct("Samsung", "A50", 15666, "www.imagen.com", "158", 10);
produc.addProduct("Samsung", "A50", 15666, "www.imagen.com", "157", 10);*/
console.log(produc.getProducts());
//console.log(produc.getProductsbyId(1));
//console.log(produc.getProductsbyId(4));