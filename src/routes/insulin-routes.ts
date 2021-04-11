/**
 * Handles routing, mapping paths, http methods to controllers for insulins
*/

import { Router } from 'express';
import { check } from 'express-validator';

import * as insulinController from '../controllers/insulin-controller';

const route = Router();

route.get('/:uId', insulinController.getInsulinsByUserId);

route.post('/', [], insulinController.addInsulin);

export default route;