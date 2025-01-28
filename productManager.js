class ProductManager {
    #id
    constructor() {
        this.#id = 1;
        this.products = []
    }


    addProduct(title, description, price, thumbnail, code, stock) {

        //Verificamos si el code ya existe
        const codeExists = this.products.some(cod => cod.code === code)
        if (codeExists) {
            console.log(`No se debe repetir el codigo`);
            return;
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
                id: this.#id
            });
            this.#id++;
        } else {
            console.log("Error todos los campos son obligatorios")
        }

    }

    getProducts() {
        return this.products;
    }

    getProductsbyId(id) {
        console.log("getById");


        const productId = this.products.find((element) => element.id === id);
        if (productId) {
            return productId;
        } else {
            return "Not found";
        }
    }
}

const produc = new ProductManager();

console.log(produc.getProducts());
produc.addProduct("Samsung", "A10", 15666, "www.imagen.com", "156", 10);
produc.addProduct("Samsung", "A50", 15666, "www.imagen.com", "158", 10);
produc.addProduct("Samsung", "A50", 15666, "www.imagen.com", "157", 10);
console.log(produc.getProducts());
console.log(produc.getProductsbyId(3));
console.log(produc.getProductsbyId(4));