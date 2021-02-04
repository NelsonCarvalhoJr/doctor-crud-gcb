import ISpeciatlitiesRepository from '@modules/specialities/repositories/ISpecialitiesRepository';

import Speciality from '../../infra/typeorm/entities/Speciality';

class FakeSpecialitiesRepository implements ISpeciatlitiesRepository {
  private specialities: Speciality[] = [];

  public async all(): Promise<Speciality[]> {
    return this.specialities;
  }
}

export default FakeSpecialitiesRepository;
