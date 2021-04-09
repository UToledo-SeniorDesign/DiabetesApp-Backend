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
import mongoose from 'mongoose';

import HttpError from '../models/http-error';
import MealModel from '../models/schema/meal-schema';
import UserModel from '../models/schema/user-schema';
import type { 
    IMealSchema, 
    IUserSchema
} from '../types/schema-types';


export interface IFoodItem{
    name: string;
    serving_carb: number;
    total_servings: number;
}

const internalError = new HttpError(        // We'll throw/return this for internal errors
    "It's not you, it's us... please try again later.",
    500
);

async function addMeal (req: Request, res: Response, next: Next){
    const errors = validationResult(req);
    if (!errors.isEmpty){
        return next(
            new HttpError('Invalid inputs passed, please check your data.', 422)
        );
    }

    const {
        creator_id,
        meal_name,
        total_carbs,
        food_items
    }  = req.body;

    const createdMeal:IMealSchema = new MealModel({
        name: meal_name,
        totCarbs: total_carbs,
        creator: creator_id,
        foodItems: food_items
    });

    // Now lets get the user from the DB
    let user: IUserSchema | null;
    try {
        user = await UserModel.findById(creator_id);
    } catch (err){
        return next(internalError);
    }

    if (!user){
        // This should never occur if the user is logged in / signed up
        console.log('Could not find the user for the given id')
        return next(new HttpError('Could not find user for the provided id', 404));
    }

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await createdMeal.save({session: session});
        user.meals.push(createdMeal.id);
        await user.save({session: session});
        await session.commitTransaction();
    } catch(err){
        return next(internalError);
    }

    res.status(201).json({meal: createdMeal});    
}

async function getMealsByUserId(req: Request, res: Response, next: Next) {
    const userId = req.params.uId;
    let userWithMeals: IUserSchema | null;
    try {
        userWithMeals = await UserModel.findById(userId).populate('meals');
    } catch(err){
        return next(internalError);
    }

    if (!userWithMeals){        // If we couldn't find a user with the provided ID
        return next(new HttpError("Could not find a user with the given ID", 404));
    }

    const meals = userWithMeals.meals.map(meal => meal.toObject({getters: true}));

    res.status(200).json({ meals: meals });   
}

export {
    addMeal,
    getMealsByUserId
};