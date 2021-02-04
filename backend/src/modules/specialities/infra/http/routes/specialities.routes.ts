import { Router } from 'express';

import SpecialitiesController from '../controllers/SpecialitiesController';

const specialitiesRouter = Router();

const specialitiesController = new SpecialitiesController();

specialitiesRouter.get('/', specialitiesController.all);

export default specialitiesRouter;
