import express from 'express';
import path from 'path';
import chickenRoutes from './routes/chicken-routes.js';
import {databaseConnection} from "./configs/database-connection.js";
const app = express();

databaseConnection();

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
	next();
});

app.use(express.json());
app.use("/chicken", chickenRoutes);
export default app;

