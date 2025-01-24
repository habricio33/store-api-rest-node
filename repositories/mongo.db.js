 import mongodb from "mongodb"; 

function getClients() {
   
    const uri = 'mongodb://localhost:27017/';
    return new mongodb.MongoClient(uri);
    // return new mongodb.MongoClient(uri, {
    //     tls: true, // Força a conexão segura
    // });
}

async function testConnection() {
    const client = getClients();
    try {
        await client.connect();
        console.log("Conexão bem-sucedida ao MongoDB !");
    } catch (err) {
        console.error("Erro ao conectar no MongoDB :", err);
    } finally {
        await client.close();
    }
}
testConnection();


export { getClients }