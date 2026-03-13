import express from "express";
import router from "./router";
import db from "./config/db";
import colors from "colors";

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

const server = express();

//Leer datos de formularios
server.use(express.json());

server.use('/api/products', router);

server.get('/api', (req, res) => {
    res.json({ message: "Desde API" });
});

export default server;

