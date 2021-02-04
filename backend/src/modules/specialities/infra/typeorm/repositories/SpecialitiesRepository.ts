import { getRepository, Repository } from 'typeorm';

import ISpeciatlitiesRepository from '@modules/specialities/repositories/ISpecialitiesRepository';

import Speciality from '../entities/Speciality';

class SpecialitiesRepository implements ISpeciatlitiesRepository {
  private ormRepository: Repository<Speciality>;

  constructor() {
    this.ormRepository = getRepository(Speciality);
  }

  public async all(): Promise<Speciality[]> {
    const specialities = await this.ormRepository.find();

    return specialities;
  }
}

export default SpecialitiesRepository;
