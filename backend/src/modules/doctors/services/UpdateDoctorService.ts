import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IDoctorsRepository from '../repositories/IDoctorsRepository';
import Doctor from '../infra/typeorm/entities/Doctor';

interface IRequest {
  id: number;
  name?: string;
  crm?: number;
  telephone?: string;
  cell_phone?: string;
  postcode?: string;
  specialities?: number[];
}

@injectable()
class UpdateDoctorService {
  constructor(
    @inject('DoctorsRepository')
    private doctorsRepository: IDoctorsRepository,
  ) {}

  public async execute({
    id,
    name,
    crm,
    telephone,
    cell_phone,
    postcode,
  }: IRequest): Promise<Doctor> {
    const doctor = await this.doctorsRepository.findById(id);

    if (!doctor) {
      throw new AppError("This doctor doesn't exists", 404);
    }

    if (name) {
      doctor.name = name;
    }

    if (crm) {
      doctor.crm = crm;
    }

    if (telephone) {
      doctor.telephone = telephone;
    }

    if (cell_phone) {
      doctor.cell_phone = cell_phone;
    }

    if (postcode) {
      doctor.postcode = postcode;
    }

    await this.doctorsRepository.update(doctor);

    return doctor;
  }
}

export default UpdateDoctorService;
