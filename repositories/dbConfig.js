import   Sequelize   from "sequelize"; 

const sequelize = new Sequelize(
    "postgres://postgres:postgres@localhost:5432/store",    
    {
        dialect: "postgres",
        define: {
            timestamps: false
        }
    }
);

export default sequelize;