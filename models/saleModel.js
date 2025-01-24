import Sequelize from "sequelize";
import db from "../repositories/dbConfig.js";
import Client from "./clientModel.js"; 
import Product from "./productModel.js";

const Sale = db.define('sales', {
    saleId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    value: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false,
    }   
}, { underscored: true });

Sale.belongsTo(Client, { foreignKey: "clientId" });
Sale.belongsTo(Product, { foreignKey: "productId" });

export default Sale;