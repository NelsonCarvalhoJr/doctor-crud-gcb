import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ISpecialitiesRepository from '@modules/specialities/repositories/ISpecialitiesRepository';
import IDoctorsRepository from '../repositories/IDoctorsRepository';
import Doctor from '../infra/typeorm/entities/Doctor';

interface IRequest {
  doctor_id: number;
  speciality_ids: number[];
}

@injectable()
class AddSpecialitiesService {
  constructor(
    @inject('DoctorsRepository')
    private doctorsRepository: IDoctorsRepository,
    @inject('SpecialitiesRepository')
    private specialitiesRepository: ISpecialitiesRepository,
  ) {}

  public async execute({
    doctor_id,
    speciality_ids,
  }: IRequest): Promise<Doctor> {
    const doctor = await this.doctorsRepository.findById(doctor_id);

    if (!doctor) {
      throw new AppError("This doctor doesn't exists", 404);
    }

    const specialities = await this.specialitiesRepository.findByIds(
      speciality_ids,
    );

    if (specialities.length < speciality_ids.length) {
      throw new AppError('Invalid specialities');
    }

    const specialitiesInDoctor = doctor.doctors_specialities;

    const specialityIdsFound = specialitiesInDoctor.map(
      speciality => speciality.speciality_id,
    );

    const invalidSpecialities = speciality_ids.filter(speciality => {
      return (
        specialityIdsFound.findIndex(
          specialityFound => specialityFound === speciality,
        ) >= 0
      );
    });

    if (invalidSpecialities.length) {
      throw new AppError(
        `Specialities ${JSON.stringify(invalidSpecialities)
          .split('"')
          .join('')} already exists in this doctor`,
      );
    }

    const savedDoctor = await this.doctorsRepository.addDoctorsSpecialities(
      doctor,
      speciality_ids,
    );

    return savedDoctor;
  }
}

export default AddSpecialitiesService;
