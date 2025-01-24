 import saleService from "../services/saleService.js";

 async function createSale(req, res, next) {     
     try {
       let sale = req.body;
        if (!sale.value|| !sale.date || !sale.clientId || !sale.productId ) {
            throw new Error("Value, date, client_id e prodcut_id são obrigatórios");
        }
        sale = await saleService.createSale(sale);
        res.send(sale);
        logger.info(`POST /sale ${JSON.stringify(sale)}`);

     } catch (err) {
        if (Array.isArray(err)) {  // Verifica se 'err' é um array de erros
            res.status(400).json({ error: err });
        } else {
            next(err);  // Encaminha outros erros para o middleware de erro
        }
     }         
}

async function getSales(req, res, next) {
    try {
        res.send(await saleService.getSales(req.query.productId, req.query.supplierId));
        logger.info(`GET /sale`);
    } catch (err) {
        next(err);
    }    
}


async function getSale(req, res, next) {
    try {
        res.send(await saleService.getSale(req.params.id));
        logger.info(`GET /sale/:id - ${JSON.stringify(req.params.id)}`);
    } catch (err) {
        next(err);
    }    
}

async function deleteSale(req, res, next) {
    try {
        await saleService.deleteSale(req.params.id);
        res.end();
        logger.info(`DELETE /sale/:id - ${JSON.stringify(req.params.id)}`);
    } catch (err) {
        next(err);
    }    
}


async function updateSale(req, res, next) {     
    try {
       let sale = req.body;

       // Verifica campos obrigatórios
       if (!sale.value || !sale.date || !sale.clientId ) {
             return res.status(400).json({ error: "Value, date, client_id  são obrigatórios" });
       }

       // Chama o serviço para atualizar a venda e captura possíveis erros de validação
       sale = await saleService.updateSale(sale);
       res.status(200).json(sale);
       
       logger.info(`PUT /sale ${JSON.stringify(sale)}`);

    } catch (err) {
       if (Array.isArray(err) && err.length > 0) { // Erros de validação do serviço
           res.status(400).json({ error: err });
       } else {
           next(err); // Erros inesperados são encaminhados para o middleware de erro
       }
    }         
}

export default {
    createSale,
    getSales, 
    getSale,
    deleteSale,
    updateSale
}