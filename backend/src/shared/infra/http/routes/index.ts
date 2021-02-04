import { Router } from 'express';

import doctorsRouter from '@modules/doctors/infra/http/routes/doctors.routes';
import specialitiesRouter from '@modules/specialities/infra/http/routes/specialities.routes';

const routes = Router();

routes.use('/doctors', doctorsRouter);
routes.use('/specialities', specialitiesRouter);

export default routes;
