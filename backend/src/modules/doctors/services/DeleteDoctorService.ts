import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IDoctorsRepository from '../repositories/IDoctorsRepository';

interface IRequest {
  id: number;
}

@injectable()
class DeleteDoctorService {
  constructor(
    @inject('DoctorsRepository')
    private doctorsRepository: IDoctorsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    const doctor = await this.doctorsRepository.findById(id);

    if (!doctor) {
      throw new AppError("This doctor doesn't exists", 404);
    }

    await this.doctorsRepository.delete(id);
  }
}

export default DeleteDoctorService;
