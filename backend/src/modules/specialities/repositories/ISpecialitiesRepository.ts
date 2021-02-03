import Speciality from '../infra/typeorm/entities/Speciality';

import ICreateSpecialityDTO from '../dtos/ICreateSpecialityDTO';

interface ISpecialitiesRepository {
  all(): Promise<Speciality[]>;
  create(data: ICreateSpecialityDTO): Promise<Speciality>;
  delete(id: number): Promise<void>;
}

export default ISpecialitiesRepository;
