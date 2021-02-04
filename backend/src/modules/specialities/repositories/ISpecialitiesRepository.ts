import Speciality from '../infra/typeorm/entities/Speciality';

import ICreateSpecialityDTO from '../dtos/ICreateSpecialityDTO';

interface ISpecialitiesRepository {
  all(): Promise<Speciality[]>;
  findByIds(ids: number[]): Promise<Speciality[]>;
  create(specialityData: ICreateSpecialityDTO): Promise<Speciality>;
}

export default ISpecialitiesRepository;
