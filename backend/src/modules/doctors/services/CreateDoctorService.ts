import AppError from '@shared/errors/AppError';

import { injectable, inject } from 'tsyringe';

import ISpecialitiesRepository from '@modules/specialities/repositories/ISpecialitiesRepository';

import IDoctorsRepository from '../repositories/IDoctorsRepository';
import Doctor from '../infra/typeorm/entities/Doctor';

interface IRequest {
  name: string;
  crm: number;
  telephone: string;
  cell_phone: string;
  postcode: string;
  specialities: number[];
}

@injectable()
class CreateDoctorService {
  constructor(
    @inject('DoctorsRepository')
    private doctorsRepository: IDoctorsRepository,

    @inject('SpecialitiesRepository')
    private specialitiesRepository: ISpecialitiesRepository,
  ) {}

  public async execute({
    name,
    crm,
    telephone,
    cell_phone,
    postcode,
    specialities,
  }: IRequest): Promise<Doctor> {
    if (specialities.length < 2) {
      throw new AppError('A doctor must have at least 2 specialities');
    }

    const specialitiesFound = await this.specialitiesRepository.findByIds(
      specialities,
    );

    if (specialitiesFound.length < specialities.length) {
      throw new AppError('Invalid specialities');
    }

    const doctors_specialities = specialities.map(speciality => ({
      speciality_id: speciality,
    }));

    const doctor = await this.doctorsRepository.create({
      name,
      crm,
      telephone,
      cell_phone,
      postcode,
      doctors_specialities,
    });

    return doctor;
  }
}

export default CreateDoctorService;
