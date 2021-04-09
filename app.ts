/**
 * Main file to initalize NodeJS server
*/

import express, {
    Request,
    Response,
    NextFunction as Next
} from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import usersRoute from './src/routes/users-routes';
import mealsRoute from './src/routes/meals-routes';
import HttpError from './src/models/http-error';

dotenv.config();

const app = express();

app.use(bodyParser.json());

app.use((req: Request, res: Response, next: Next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
});

app.use('/api/meals', mealsRoute);               // Request for users to add a meal
app.use('/api/users', usersRoute);              // Requests to login/signup user

app.use ((req:Request, res:Response, next:Next) => {
    const error = new HttpError('Could not find this route.', 404);
    throw error;
});

app.use((error:HttpError, req:Request, res:Response, next:Next) => {
    if (res.headersSent) {
        return next(error);
      }
      res.status(error.errorCode || 500)
      res.json({message: error.message || 'An unknown error occurred!'});
});

// Create connection to the DB
mongoose
    .connect(process.env.MONGO_DB_URI || "")
    .then(() => {
        app.listen(process.env.PORT || 5000);
    })
    .catch(err => {
        console.log(err);
    });