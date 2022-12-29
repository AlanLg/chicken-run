import * as mongoose from 'mongoose';
import logger from '../utils/logger.js';

import dotenv from 'dotenv';
dotenv.config();

export function databaseConnection() {
	const uri = process.env.DATABASE_URI;

	const options = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		dbName: 'replic',
	};

	mongoose.connect(uri, options)
		.then(() => logger.info('Database connection established'))
		.catch((error) => {
			logger.error('Database connection error');
			logger.error(error);
		}
		);
}
