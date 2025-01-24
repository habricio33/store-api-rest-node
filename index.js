import express from "express";
import cors from "cors";
import winston from "winston";
import clientsRouter from "./routes/clientRoute.js";
import productsRouter from "./routes/productRoute.js"
import suppliersRouter from "./routes/supplierRoute.js"
import salesRouter from "./routes/saleRoute.js";

const  { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}]  ${level}: ${message}`;
});

global.logger = winston.createLogger({
    level: "silly",
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: "my-store-api.log"})
    ],
    format: combine (
        label({ label: "my-store-api"}),
        timestamp(),
        myFormat
    )
});

const app = express();
app.use(express.json());
app.use(cors()); 
app.use("/client", clientsRouter);
app.use("/product", productsRouter);
app.use("/supplier", suppliersRouter);
app.use("/sale", salesRouter);
app.use((err, req, res, next) => {
  
    if(err.message) {
         logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
        res.status(400).send({ error: err.message });       
    } else {
        logger.error(`${req.method} ${req.baseUrl} - ${err}`);
        res.status(400).send({ error: err });       
    }
    
});

app.listen(8083, () => {
    console.log("API Rodando");
})

