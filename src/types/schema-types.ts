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
    calories: number;
    name: string;
    creator: IUserSchema['id'];
}

