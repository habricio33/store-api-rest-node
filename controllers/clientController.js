 import clientService from "../services/clientService.js";

 async function createClient(req, res, next) {     
     try {
       let client = req.body;
        if (!client.name || !client.cpf || !client.phone || !client.email || !client.address ) {
            throw new Error("Name, cpf, phone, email e address são obrigatórios");
        }
        client = await clientService.createClient(client);
        res.send(client);
        logger.info(`POST /client ${JSON.stringify(client)}`);

     } catch (err) {
        next(err);
     }         
}

async function getClients(req, res, next) {
    try {
        res.send(await clientService.getClients());
        logger.info(`GET /client`);
    } catch (err) {
        next(err);
    }    
}

async function getClient(req, res, next) {
    try {
        res.send(await clientService.getClient(req.params.id));
        logger.info(`GET /clint/:id - ${JSON.stringify(req.params.id)}`);
    } catch (err) {
        next(err);
    }    
}

async function deleteClient(req, res, next) {
    try {
        await clientService.deleteClient(req.params.id);
        res.end();
        logger.info(`DELETE /clint/:id - ${JSON.stringify(req.params.id)}`);
    } catch (err) {
        next(err);
    }    
}


async function updateClient(req, res, next) {     
    try {
       let client = req.body;
       if (!client.clientId || !client.name || !client.cpf || !client.phone || !client.email || !client.address ) {
           throw new Error("ID, Name, cpf, phone, email e address são obrigatórios");
       }
       client = await clientService.updateClient(client);
       res.status(200).send(client);
       logger.info(`PUT /client ${JSON.stringify(client)}`);

    } catch (err) {
       next(err);
    }         
}

export default {
    createClient,
    getClients,
    getClient,
    deleteClient,
    updateClient
}