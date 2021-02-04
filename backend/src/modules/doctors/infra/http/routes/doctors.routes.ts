import { Router } from 'express';

import DoctorsController from '../controllers/DoctorsController';
import DoctorsSpecialitiesController from '../controllers/DoctorsSpecialitiesController';

const doctorsRouter = Router();

const doctorsController = new DoctorsController();
const doctorsSpecialitiesController = new DoctorsSpecialitiesController();

doctorsRouter.get('/', doctorsController.all);
doctorsRouter.post('/', doctorsController.create);
doctorsRouter.put('/:id', doctorsController.update);
doctorsRouter.delete('/:id', doctorsController.delete);

doctorsRouter.post('/:id/add', doctorsSpecialitiesController.create);
doctorsRouter.delete('/:id/remove', doctorsSpecialitiesController.delete);

export default doctorsRouter;
