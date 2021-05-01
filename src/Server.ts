import * as bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';

import express, {NextFunction, Request, Response} from 'express';
import StatusCodes from 'http-status-codes';
import 'express-async-errors';

import {rootRouter} from './routes';
import logger from '@shared/Logger';
import pgPromise from "pg-promise";
import cors from "cors";
const app = express();
const {BAD_REQUEST} = StatusCodes;


/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/

app.use(express.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Security
if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
}

// Add APIs
app.use('/api', rootRouter);

// Print API errors
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.err(err, true);
    return res.status(BAD_REQUEST).json({
        error: err.message,
    });
});

// Export express instance
export default app;

const dbConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT != undefined ? parseInt(process.env.DB_PORT) : process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
};

const initOptions = {
    connect(client: { connectionParameters: any; }) {
        const cp = client.connectionParameters;
        logger.info('Connected to database:', cp.database);
    }
};

const pgp = pgPromise(initOptions);
const dbConn = pgp(dbConfig);

export {dbConn};
