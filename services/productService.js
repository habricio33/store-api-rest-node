import productRepository from "../repositories/productRepository.js";
import supplierRepository from "../repositories/supplierRepository.js";
import saleRepository from "../repositories/saleRepository.js";
import productInfoRepository from "../repositories/productInfo.repository.js";

async function createProduct(product) {
    if(await supplierRepository.getSupplier(product.supplierId)) {
        return await productRepository.insertProduct(product);
    }

    throw new Error("O supplier_id informado não existe na tabela de Suppliers");
    
}

async function getProducts() {
    return await productRepository.getProducts();
}

 

async function getProduct(id) {
    // Busca no banco relacional
    const product = await productRepository.getProduct(id); // PostgreSQL

    if (!product) {
        throw new Error(`Produto com ID ${id} não encontrado no banco relacional`);
    }

    // Busca informações adicionais no MongoDB
    product.info = await productInfoRepository.getProductInfo(Number(id)); // MongoDB

    return product;
}

async function deleteProduct(id) {
     const sales = await saleRepository.getSalesByProductId(id);
     if(sales.length > 0) {
        throw new Error("Não é possível excluir um produto que possui uma venda realizada");
     }
     await productRepository.deleteProduct(id);
}

async function updateProduct(product) {
    if (!(await supplierRepository.getSupplier(product.supplier_id))) {
        throw new Error("O supplier_id informado não existe na tabela de Suppliers");
    }
    return await productRepository.updateProduct(product); // Sai da função se o supplier_id for válido
}

// MONGODB

async function createProductInfo(productInfo) {
    await productInfoRepository.createProductInfo(productInfo);
}

async function updateProductInfo(productInfo) {
    await productInfoRepository.updateProductInfo(productInfo);
}

async function deleteProductInfo(productId) {
    // Repassa o retorno diretamente do repositório
    return await productInfoRepository.deleteProductInfo(productId);
}

async function createReview(review, productId) {
    await productInfoRepository.createReview(review, productId);
}

async function deleteReview(productId, index) {
    if (isNaN(productId) || isNaN(index)) {
        throw new Error("Product ID e Index devem ser números.");
    }
    await productInfoRepository.deleteReview(productId, index);
}

async function getAllProductInfo( ) {
   return await productInfoRepository.getAllProductInfo();
}


export default {
    createProduct,
    getProducts,
    getProduct,
    deleteProduct,
    updateProduct,
    createProductInfo,
    updateProductInfo,
    deleteProductInfo,
    createReview,
    deleteReview,
    getAllProductInfo
}