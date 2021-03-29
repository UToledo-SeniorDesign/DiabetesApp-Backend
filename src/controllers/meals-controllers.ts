/**
 * Controller to handle the middleware functions that are reached for
 * 'meals' routes.
*/

import {
    Request,
    Response,
    NextFunction as Next
} from 'express';
import { validationResult } from 'express-validator';

import HttpError from '../models/http-error';
import MealModel from '../models/schema/meal-schema';
import FoodItemModel from '../models/schema/foodItem-schema';
import type { 
    IMealSchema, 
    IFoodItemSchema 
} from '../types/schema-types';

const internalError = new HttpError(        // We'll throw/return this for internal errors
    "It's not you, it's us... please try again later.",
    500
);

async function addMeal (req: Request, res: Response, next: Next){

}

export {
    addMeal
};