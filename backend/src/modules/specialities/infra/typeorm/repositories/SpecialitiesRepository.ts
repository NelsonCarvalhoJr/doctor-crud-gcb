import { getRepository, Repository, In } from 'typeorm';

import ISpeciatlitiesRepository from '@modules/specialities/repositories/ISpecialitiesRepository';
import ICreateSpecialityDTO from '@modules/specialities/dtos/ICreateSpecialityDTO';

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

  public async findByIds(ids: number[]): Promise<Speciality[]> {
    const specialities = await this.ormRepository.find({
      where: {
        id: In(ids),
      },
    });

    return specialities;
  }

  public async create(
    specialityData: ICreateSpecialityDTO,
  ): Promise<Speciality> {
    const speciality = this.ormRepository.create(specialityData);

    await this.ormRepository.save(speciality);

    return speciality;
  }
}

export default SpecialitiesRepository;
