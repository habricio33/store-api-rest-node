import Product from "../models/productModel.js";

async function insertProduct(product) {    
    try {
        return await Product.create(product);
    } catch (err) {
      throw  err;
    }  
}

async function getProducts() {
    try {
        return await Product.findAll();
    } catch (err) {
      throw  err;
    }  
}
async function getProduct(id) {
    try {
        return await Product.findOne({
            where: { productId: id },
            raw: true // Retorna o resultado como objeto puro
        });
    } catch (err) {
        throw err;
    }
}

async function updateProduct(product) {
    try {
          await Product.update(product, {
            where: {
                productId: product.productId
            }
        });

         // Depois, retorna o producte atualizado
         const updatedProduct = await Product.findOne({
            where: { productId: product.productId }
        });

        return updatedProduct;  // Retorna o producte atualizado
        // return await getProduct(product.productId);
    } catch (err) {
        throw new Error(`Erro ao atualizar o produto ${product.productId}: ${err.message}`);
    }  
}

async function deleteProduct(id) {
    try {
          await Product.destroy({
            where: {
                productId: id
            }
        });
    } catch (err) {
      throw  err;
    }    
}


export default {
    insertProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct
}