import { container } from 'tsyringe';

import IDoctorsRepository from '@modules/doctors/repositories/IDoctorsRepository';
import DoctorsRepository from '@modules/doctors/infra/typeorm/repositories/DoctorsRepository';

import ISpecialitiesRepository from '@modules/specialities/repositories/ISpecialitiesRepository';
import SpecialitiesRepository from '@modules/specialities/infra/typeorm/repositories/SpecialitiesRepository';

container.registerSingleton<IDoctorsRepository>(
  'DoctorsRepository',
  DoctorsRepository,
);

container.registerSingleton<ISpecialitiesRepository>(
  'SpecialitiesRepository',
  SpecialitiesRepository,
);
