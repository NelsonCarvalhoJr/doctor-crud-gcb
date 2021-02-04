import ISpeciatlitiesRepository from '@modules/specialities/repositories/ISpecialitiesRepository';
import ICreateSpecialityDTO from '@modules/specialities/dtos/ICreateSpecialityDTO';

import Speciality from '../../infra/typeorm/entities/Speciality';

class FakeSpecialitiesRepository implements ISpeciatlitiesRepository {
  private specialities: Speciality[] = [];

  public async all(): Promise<Speciality[]> {
    return this.specialities;
  }

  public async findByIds(ids: number[]): Promise<Speciality[]> {
    const filteredSpecialities = this.specialities.filter(speciality =>
      ids.includes(speciality.id),
    );

    return filteredSpecialities;
  }

  public async create(
    specialityData: ICreateSpecialityDTO,
  ): Promise<Speciality> {
    const speciality = new Speciality();

    const count = this.specialities.length;

    const id = count ? this.specialities[count - 1].id + 1 : 1;

    Object.assign(speciality, specialityData, { id });

    this.specialities.push(speciality);

    return speciality;
  }
}

export default FakeSpecialitiesRepository;
