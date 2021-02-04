import { injectable, inject } from 'tsyringe';

import ISpecialitiesRepository from '../repositories/ISpecialitiesRepository';
import Speciality from '../infra/typeorm/entities/Speciality';

@injectable()
class ListAllSpecialitiesService {
  constructor(
    @inject('SpecialitiesRepository')
    private specialitiesRepository: ISpecialitiesRepository,
  ) {}

  public async execute(): Promise<Speciality[]> {
    const specialities = await this.specialitiesRepository.all();

    return specialities;
  }
}

export default ListAllSpecialitiesService;
