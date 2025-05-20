import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import { dbConnection } from "./mongo.js"

import coursesRoutes from "../src/courses/coursesRoutes.js"
import publicationsRoutes from "../src/publications/publicationsRoutes.js"
import commentsRoutes from "../src/comments/commentsRoutes.js"

import path from 'path';
import { fileURLToPath } from 'url';

// Obtener __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const middlewares = (app) => {
    app.use(express.urlencoded({ extended: false }));
    app.use(cors());
    app.use(express.json());
    app.use(helmet());
    app.use(morgan("dev"));
    app.use('/uploads/media_Publications', express.static(path.join(__dirname, '../src/public/uploads/media_Publications')));
};

const routes = (app) => {
    app.use('/uploads/media_Publications', express.static(path.join(__dirname, '../src/public/uploads/media_Publications')));
    app.use("/Blog_Personal/Courses", coursesRoutes);
    app.use("/Blog_Personal/Publications", publicationsRoutes);
    app.use("/Blog_Personal/Comments", commentsRoutes);
};

const conectDB = async() =>{
    try {
        await dbConnection()
        console.log("La conexión con la base de datos ha sido exitosa!!!")
    } catch (e) {
        console.error("Error al intentar conectar con la base de datos")
        process.exit(1)
    }
}

export const initServer = async() =>{
    const app = express()
    const Port = process.env.PORT || 3000
    try {
        middlewares(app)
        conectDB()
        routes(app)
        app.listen(Port)
        console.log(`SERVER INIT IN PORT ${Port}`)
    } catch (e) {
        console.log(`SERVER FALIED INIT IN PORT ${Port}`)
    }
}