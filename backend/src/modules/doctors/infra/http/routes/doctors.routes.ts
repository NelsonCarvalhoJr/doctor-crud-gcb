import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import DoctorsController from '../controllers/DoctorsController';
import DoctorsSpecialitiesController from '../controllers/DoctorsSpecialitiesController';

const doctorsRouter = Router();

const doctorsController = new DoctorsController();
const doctorsSpecialitiesController = new DoctorsSpecialitiesController();

doctorsRouter.get('/', doctorsController.all);
doctorsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().max(120).required(),
      crm: Joi.number().min(1000000).max(9999999).required(),
      telephone: Joi.string().required(),
      cell_phone: Joi.string().required(),
      postcode: Joi.string().length(9).required(),
      specialities: Joi.array().items(Joi.number()).min(2).required(),
    },
  }),
  doctorsController.create,
);
doctorsRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().max(120).required(),
      crm: Joi.number().min(1000000).max(9999999).required(),
      telephone: Joi.string().required(),
      cell_phone: Joi.string().required(),
      postcode: Joi.string().length(9).required(),
    },
  }),
  doctorsController.update,
);
doctorsRouter.delete('/:id', doctorsController.delete);

doctorsRouter.post(
  '/:id/add',
  celebrate({
    [Segments.BODY]: {
      speciality_ids: Joi.array().items(Joi.number()).min(1).required(),
    },
  }),
  doctorsSpecialitiesController.create,
);
doctorsRouter.delete(
  '/:id/remove',
  celebrate({
    [Segments.BODY]: {
      speciality_ids: Joi.array().items(Joi.number()).min(1).required(),
    },
  }),
  doctorsSpecialitiesController.delete,
);

export default doctorsRouter;
