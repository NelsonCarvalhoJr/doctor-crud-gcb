import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IDoctorsRepository from '../repositories/IDoctorsRepository';
import Doctor from '../infra/typeorm/entities/Doctor';

interface IRequest {
  id: number;
}

@injectable()
class ListAllDoctorsService {
  constructor(
    @inject('DoctorsRepository')
    private doctorsRepository: IDoctorsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Doctor> {
    const doctor = await this.doctorsRepository.findById(id);

    if (!doctor) {
      throw new AppError('Doctor not found', 404);
    }

    return doctor;
  }
}

export default ListAllDoctorsService;
