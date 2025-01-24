import { getClients } from "./mongo.db.js";

//MONGO DB

async function createProductInfo(productInfo) {
    const client = getClients(); //O cliente se conecta ao MongoDB 
    try {
        await client.connect();
        await client.db("store").collection("productInfo").insertOne(productInfo);

    } catch (err) {
        throw err;
    } finally {
        await client.close();
    }    
}

async function updateProductInfo(productInfo) {
    const client = getClients();
    try {
        await client.connect();
        await client.db("store").collection("productInfo").updateOne(
            { productId: productInfo.productId },
            { $set: {...productInfo} }
        );
    } catch (err) {
        throw err;
    } finally {
        await client.close();
    }    
}

 
async function getProductInfo(productId) {
    const client = getClients();
    try {
        await client.connect();

        // Certifique-se de retornar o resultado da consulta
        return await client.db("store").collection("productInfo").findOne({ productId });
    } catch (err) {
        throw err;
    } finally {
        await client.close();
    }    
}

async function deleteProductInfo(productId) {
    const client = getClients();
    try {
        await client.connect();
        const result = await client
            .db("store")
            .collection("productInfo")
            .deleteOne({ productId });

        return result.deletedCount > 0
            ? { success: true, message: "Produto deletado com sucesso." }
            : { success: false, message: "Produto não encontrado." };
    } catch (err) {
        throw err;
    } finally {
        await client.close();
    }
}


async function createReview(review, productId) {
    try {
        const productInfo = await getProductInfo(productId);
        if (!productInfo) {
            throw new Error("Produto não encontrado");
        }
        if (!productInfo.reviews) {
            productInfo.reviews = [];  // Caso a propriedade 'reviews' não exista
        }
        productInfo.reviews.push(review);
        await updateProductInfo(productInfo);
    } catch (err) {
        throw err;
    }
}

async function deleteReview(productId, index) {
    try {
        const productInfo = await getProductInfo(productId);

        if (!productInfo || !productInfo.reviews || !Array.isArray(productInfo.reviews)) {
            throw new Error("Produto não encontrado ou reviews inválidos.");
        }

        if (index < 0 || index >= productInfo.reviews.length) {
            throw new Error("Index fora do intervalo.");
        }

        // Remove o review no índice especificado
        productInfo.reviews.splice(index, 1);

        // Atualiza o produto no banco de dados
        await updateProductInfo(productInfo);
    } catch (err) {
        throw err;
    }
}

async function getAllProductInfo() {
    const client = getClients();
    try {
        await client.connect();

        // Certifique-se de retornar o resultado da consulta
        return await client.db("store").collection("productInfo").find({}).toArray();
    } catch (err) {
        throw err;
    } finally {
        await client.close();
    }    
}

export default { 
    createProductInfo, 
    updateProductInfo, 
    getProductInfo,
    deleteProductInfo,
    createReview,
    deleteReview,
    getAllProductInfo
}