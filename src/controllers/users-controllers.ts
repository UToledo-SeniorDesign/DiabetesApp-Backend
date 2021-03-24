/**
 * Controller to handle the middleware functions that are reached for
 * 'users' routes.
 * 
 * To secure passwords we are using bycrypt to handle hashing/salting
 *  - https://auth0.com/blog/hashing-in-action-understanding-bcrypt/
*/

import {
    Request,
    Response,
    NextFunction as Next
} from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import HttpError from '../models/http-error';
import UserModel from '../models/users';
import type { IUserSchema } from '../types/schema-types';

interface IResponse {
    // This is the data we are going to send back the client
    first_name: string;
    last_name: string;
    email: string;
    token: string;
    img: string;
}


const internalError = new HttpError(        // We'll throw/return this for internal errors
    "It's not you, it's us... please try again later.",
    500
);
const saltRounds = 10;                      // Total rounds to salt the passwords
const tokenExpDate = '60d';                 // Tokens will work for two months

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
    } catch (err) {
        // Error when trying to fetch a user with the given email
        return next(internalError);
    }

    if (existingUser) {
        // If user exists already
        const message = "Email is already in use, try logging in instead.";
        const errorCode = 422;
        const error = new HttpError(message, errorCode);
        return next(error);
    }

    let securePassword:string;      // Password that will hash/salt to store in the DB
    try {
        // Hash and salt the password
        securePassword = await bcrypt.hash(password, saltRounds);
    } catch(err){
        // There was some error hashing/salting the password
        return next(internalError);
    }

    // Create the user with the secure password to be stored in the DB
    const createdUser = new UserModel({
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: securePassword,
        image: image,
        meals: []
    });

    try {
        await createdUser.save();               // Save the user into the DB
    } catch (err) {
        // Failed creating the user
        return next(internalError);
    }

    // Now we need to create a token
    let token:string;
    try {
        token = jwt.sign(
            {
                userId: createdUser.id,
                email: createdUser.email
            },
            'secret',
            { expiresIn: tokenExpDate }
        );   
    } catch(err){
        // If we fail creating a token
        return next(internalError);
    }

    // Create the response we are going to send the client
    const userResponse:IResponse = {
        first_name: createdUser.first_name,
        last_name:  createdUser.last_name,
        email:      createdUser.email,
        img:        createdUser.img,
        token:      token
    }
    
    res.status(201).json({user: userResponse });
}

const loginUser = async(req: Request, res: Response, next: Next) => {
    const errors = validationResult(req);   // Validate request
    if (!errors.isEmpty()){                 // If we got an error/missing data from request
        console.log(errors);
        const message = "Invalid inputs passed, check data";
        const errorCode = 422;
        const error = new HttpError(message, errorCode);
        return next(error);
    }

    const { email, password } = req.body;   // Grab fields needed to login
    const invalidUserErr = new HttpError(   // Error object if the email/password is wrong
        "Failed logging, email or password are incorrect.",
        401
    );

    let existingUser:IUserSchema | null;
    try {
        existingUser = await UserModel.findOne({email: email})
    } catch(err){
        // We got an error fetching the user from the DB
        return next(internalError);
    }
    if (!existingUser){
        // If the we didn't find a user with the given email
        return next(invalidUserErr);
    }

    // We get here if we found a user with the given emai, now we need to verify the password
    let isValidPassword:boolean;
    try {
        isValidPassword = await bcrypt.compare(password, existingUser.password);
    } catch(err){
        // If there was some error validating the password
        return next(internalError);
    }
    if (!isValidPassword){
        // The passwords didn't match
        return next(invalidUserErr);
    }

    // We get here if the user is valid, now lets create the token
    let token;
    try {
        token = jwt.sign(
            {
                userId: existingUser.id, 
                email: existingUser.email
            },
            'secret',
            {expiresIn: tokenExpDate}
        );
    } catch(err){
        // If there was an issue creating the token
        return next(internalError);
    }

    // Create the response we are going to send the client
    const userResponse:IResponse = {
        first_name: existingUser.first_name,
        last_name:  existingUser.last_name,
        email:      existingUser.email,
        img:        existingUser.img,
        token:      token
    }

    res.status(200).json({user: userResponse});
}


export {
    createUser,
    loginUser
}