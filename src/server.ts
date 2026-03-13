import express from "express";
import colors from "colors";
import swaggerUi from 'swagger-ui-express';
import swaggerSPec from "./config/swagger";
import router from "./router";
import db from "./config/db";

export async function connectDB() {
    try {
        await db.authenticate();
        db.sync();
        // console.log(colors.blue.bold("Database connected successfully"));
    } catch (error) {
        console.log(colors.red.bold("Error connecting to the database:"), error);
    }
}

connectDB();

//Instancia de express
const server = express();

//Leer datos de formularios
server.use(express.json());

server.use('/api/products', router);

//Docs
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSPec))

export default server;

