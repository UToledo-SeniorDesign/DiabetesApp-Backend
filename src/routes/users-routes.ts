/**
 * Handles routing, mapping paths, http methods to controllers for users
*/

import { Router } from 'express';
import { check } from 'express-validator';

import * as usersController from '../controllers/users-controllers';

const route = Router();

route.post('/signup', 
    [
        check('first_name')
            .notEmpty(),
        check('last_name')
            .notEmpty(),
        check('email')
            .normalizeEmail()
            .isEmail(),
        check('password')
            .isLength({min: 6}),
        check('image')
            .notEmpty()
    ],
    usersController.createUser
);

route.post('/login', 
    [
        check('email')
            .normalizeEmail()
            .isEmail(),
        check('password')
            .isLength({min: 6})
    ],
    usersController.loginUser
);

export default route;