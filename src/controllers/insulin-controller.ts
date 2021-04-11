/**
 * Controller to handle the middleware functions that are reached for
 * 'insulin' routes.
*/

import {
    Request,
    Response,
    NextFunction as Next
} from 'express';
import { validationResult } from 'express-validator';
import mongoose from 'mongoose';

async function getInsulinsByUserId(req: Request, res: Response, next: Next) {
    
}

async function addInsulin(req: Request, res: Response, next: Next) {
    
}

export {
    getInsulinsByUserId,
    addInsulin
}