/**
 * Schema interfaces utilized for Mongoose in the models directory
*/

import { Document } from 'mongoose';

export interface IUserSchema extends Document {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    meals: Array<IMealSchema['id']>;
    img: string;
}

export interface IMealSchema extends Document {
    name: string;                               // Name given to this meal by the creator
    totCarbs: number;                           // Total carbs for this meal
    foodItems: Array<IFoodItemSchema['id']>;    // List of food items attached to this meal
    creator: IUserSchema['id'];                 // ID of the user who created the meal
}

export interface IFoodItemSchema extends Document {
    name: string;           // Name of this food
    totServings: number;    // Total servings for this food
    servingCarbs: number;   // Carbs per servings
}