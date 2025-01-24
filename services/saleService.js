import saleRepository from "../repositories/saleRepository.js";
import clientRepository from "../repositories/clientRepository.js";
import productRepository from "../repositories/productRepository.js";
import moment from "moment";
// import Sequelize from "sequelize";

async function createSale(sale) {
     // Converter a data para o formato correto
     sale.date = moment(sale.date, "DD/MM/YYYY").format("YYYY-MM-DD");
     
    const errors = [];
    //verifica se o cliente existe no banco
    if(!await clientRepository.getClient(sale.clientId)) {
       errors.push("O Client_id  informado não existe na tabela de clients");
    }
    //faz a consulta dos produtos no BD
    const product = await productRepository.getProduct(sale.productId);
    
    // se não existe o produto especificado no BD emite um erro
    if(!product) {     
        errors.push("O Product_id informado não existe na tabela de products")
    }
    //caso cliente e/ou produto não existam emite um erro (logica na index)
    if(errors.length > 0) {
        throw errors;
    }

    // se o estoque do produto for maior que 0
    if(product.stock > 0) {       
        sale = await saleRepository.insertSale(sale);  //faz o insert da venda
        product.stock--; //decrementa 1 no estoque
        await productRepository.updateProduct(product); //atualiza a tabela de produtos
        return sale; //retorna o resultado da função insertSale
    } else {
        throw new Error("O produto informado não tem estoque disponível");
    }    
}

 
async function getSales(productId, supplierId) {
    if(productId) {        
        return await saleRepository.getSalesByProductId(productId);
    } if(supplierId) {
        return await saleRepository.getSalesBySupplierId(supplierId);
    } else {
        return await saleRepository.getSales();
    }    
}

 

async function getSale(id) {
    return await saleRepository.getSale(id);
}

async function deleteSale(id) {
    const sale = await saleRepository.getSale(id);

    if(sale) {
        const product = await productRepository.getProduct(sale.productId);
        await saleRepository.deleteSale(id);
        product.stock++; //incrementa o estoque do produto na tabela ja que a venda foi cancelada
        await productRepository.updateProduct(product);
    } else {
        throw new Error("O sale_id informado não existe");
    }
     
}

async function updateSale(sale) {
    const errors = [];
    if(!await productRepository.getProduct(sale.productId)) {
      errors.push("O  Product_id informado não existe na tabela de products");
    }
    if(!await clientRepository.getClient(sale.clientId)) {
       errors.push("O Client_id informado não existe na tabela de clients");
    }

   // Verifique se há erros antes de lançar o erro
   if (errors.length > 0) {
    const error = new Error("Validation failed");
    error.status = 400;
    error.details = errors;  // inclua detalhes dos erros
    throw error;
}

   return await saleRepository.updateSale(sale);
}

export default {
    createSale,
    getSales,  
    getSale,
    deleteSale,
    updateSale
}