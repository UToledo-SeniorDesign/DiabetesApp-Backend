/**
 * Handles routing, mapping paths, http methods to controllers for meals
*/

import { Router } from 'express';
import { check } from 'express-validator';

import * as mealsControllers from '../controllers/meals-controllers';

const route = Router();

route.post('/', 
    [
        check('creator_id')
            .notEmpty(),
        check('food_items')
            .notEmpty()
            .isArray(),
        check('meal_name')
            .notEmpty(),
        check('total_carbs')
            .notEmpty()
            .isNumeric()
            .toInt(),
        check('food_items.*.name')
            .notEmpty(),
        check('food_items.*.serving_carb')
            .notEmpty()
            .isNumeric()
            .toInt(),
        check('food_items.*.total_servings')
            .notEmpty()
            .isNumeric()
            .toInt(),        
    ], 
    mealsControllers.addMeal
);

export default route;