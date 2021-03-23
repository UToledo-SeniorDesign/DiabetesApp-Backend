/**
 * Controller to handle the middleware functions that are reached for
 * 'users' routes.
*/

import {
    Request,
    Response,
    NextFunction as Next
} from 'express';
import { validationResult } from 'express-validator';

import HttpError from '../models/http-error';
import UserModel from '../models/users';
import type { IUserSchema } from '../types/schema-types';

const createUser = async(req: Request, res: Response, next: Next) => {
    const errors = validationResult(req);   // Validate request
    if (!errors.isEmpty()){                 // If we got an error/missing data from request
        console.log(errors);
        const message = "Invalid inputs passed, check data";
        const errorCode = 422;
        const error = new HttpError(message, errorCode);
        return next(error);
    }
    const {
        // Fields expexted/needed from the request
        first_name, 
        last_name, 
        image, 
        email, 
        password,
    } = req.body;
    
    let existingUser;               // Will use this to check if the user/email already exists in the DB
    try {
        existingUser = await UserModel.findOne({email: email});     // Lookup email in the DB
    } catch{
        const message = "It's not you, it's us... please try again later.";
        const errorCode = 500;
        const error = new HttpError(message, errorCode);
        return next(error);
    }

    if (existingUser) {
        // If user exists already
        const message = "Email is already in use, try logging in instead.";
        const errorCode = 422;
        const error = new HttpError(message, errorCode);
        return next(error);
    }

    // Create the new user object
    const createdUser:IUserSchema = new UserModel({
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password,
        image: image,
        meals: []
    });

    try {
        await createdUser.save();               // Save the user into the DB
    } catch (err) {
        // Failed creating the user
        const message = "It's not you, it's us... please try again later.";
        const errorCode = 500;
        const error = new HttpError(message, errorCode);
        return next(error);
    }
    
    res.status(201).json({user:createdUser.toObject({getters: true}) });
    
}

const loginUser = (req: Request, res: Response, next: Next) => {
    const errors = validationResult(req);   // Validate request
    if (!errors.isEmpty()){                 // If we got an error/missing data from request
        console.log(errors);
        const message = "Invalid inputs passed, check data";
        const errorCode = 422;
        const error = new HttpError(message, errorCode);
        return next(error);
    }

    const { email, password } = req.body;   // Grab fields needed to login

}


export {
    createUser,
    loginUser
}