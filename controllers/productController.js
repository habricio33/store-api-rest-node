 import productService from "../services/productService.js";

 async function createProduct(req, res, next) {     
     try {
       let product = req.body;
        if (!product.name || !product.description || !product.value || !product.stock || !product.supplierId ) {
            throw new Error("Name, description, value, stock e supplier_id são obrigatórios");
        }
         // Mapear supplierId para supplier_id, se necessário
         product.supplier_id = product.supplierId;
        product = await productService.createProduct(product);
        res.send(product);
        logger.info(`POST /product ${JSON.stringify(product)}`);

     } catch (err) {
        next(err);
     }         
}

async function getProducts(req, res, next) {
    try {
        res.send(await productService.getProducts());
        logger.info(`GET /product`);
    } catch (err) {
        next(err);
    }    
}

async function getProduct(req, res, next) {
    try {
        res.send(await productService.getProduct(req.params.id));
        logger.info(`GET /product/:id - ${JSON.stringify(req.params.id)}`);
    } catch (err) {
        next(err);
    }    
}

async function deleteProduct(req, res, next) {
    try {
        await productService.deleteProduct(req.params.id);
        res.end();
        logger.info(`DELETE /product/:id - ${JSON.stringify(req.params.id)}`);
    } catch (err) {
        next(err);
    }    
}


async function updateProduct(req, res, next) {     
    try {
       let product = req.body;
       if (!product.name || !product.description || !product.value || !product.stock || !product.supplierId ) {
            throw new Error("Name, description, value, stock e supplier_id são obrigatórios");
       }

       // Mapear supplierId para supplier_id, se necessário
       product.supplier_id = product.supplierId;
       
       product = await productService.updateProduct(product);
       res.send(product);
       logger.info(`PUT /product ${JSON.stringify(product)}`);

    } catch (err) {
       next(err);
    }         
}

//MONGODB

async function createProductInfo(req, res, next) {
    try {
        let productInfo = req.body;
        if(!productInfo.productId) {
            throw new Error("ID obrigatório")
        } else {
              await productService.createProductInfo(productInfo);
              res.end();
              logger.info(`POST /product/info mongoDB ${JSON.stringify(productInfo)}`);
        }

    } catch (err) {
        next(err);
     }   
}

async function updateProductInfo(req, res, next) {
    try {
        let productInfo = req.body;
        if(!productInfo.productId) {
            throw new Error("ID obrigatório")
        } else {
              await productService.updateProductInfo(productInfo);
              res.end();
              logger.info(`PUT /product/info mongoDB ${JSON.stringify(productInfo)}`);
        }

    } catch (err) {
        next(err);
     }   
}

async function deleteProductInfo(req, res, next) {
    try {
        // const productId = req.params.id; // Captura o ID dos parâmetros
        const productId = Number(req.params.id);

        if (!productId) {
            throw new Error("ID obrigatório");
        }

        const result = await productService.deleteProductInfo(productId); // Chama o serviço

        if (!result) {
            throw new Error("Erro interno ao deletar o produto");
        }

        // Verifica o resultado e envia a resposta
        if (result.success) {
            res.status(200).json({ message: result.message });
        } else {
            res.status(404).json({ message: result.message });
        }

        logger.info(`DELETE /product/info mongoDB ${JSON.stringify({ productId })}`);
    } catch (err) {
        next(err);
    }
}

async function createReview(req, res, next) {

    try {
        let params = req.body;
        if(!params.review || !params.productId) {
            throw new Error("Id e review sao obrigatórios");
        }

         // Verificar se o productId é válido
         if (!Number.isInteger(params.productId)) {
            throw new Error("ID do produto inválido");
        }
        await productService.createReview(params.review, params.productId);
        res.end();
        logger.info(`DELETE /product/${req.params.review}/review/${req.params.prodcutId}  MONGO DB`);
    } catch (err) {
        next(err);
    }    
}


async function deleteReview(req, res, next) {
    try {
        const { id, index } = req.params;
        await productService.deleteReview(parseInt(id), parseInt(index));
        res.status(204).end(); // Retorna código 204 (No Content) após exclusão
        logger.info(`DELETE /product/${req.params.id}/review/${req.params.index}  MONGO DB`);
    } catch (err) {
        next(err);
    }
}

async function getAllProductInfo(req, res, next) {
    try {
        res.send(await productService.getAllProductInfo());
        logger.info(`GET /product/info MongoDB`);
    } catch (err) {
        next(err);
    }    
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