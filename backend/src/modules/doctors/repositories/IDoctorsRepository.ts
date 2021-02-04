import Doctor from '../infra/typeorm/entities/Doctor';

import IFindAllDoctorsDTO from '../dtos/IFindAllDoctorsDTO';
import ICreateDoctorDTO from '../dtos/ICreateDoctorDTO';

interface IDoctorsRepository {
  all(data: IFindAllDoctorsDTO): Promise<Doctor[]>;
  findById(id: number): Promise<Doctor | undefined>;
  create(data: ICreateDoctorDTO): Promise<Doctor>;
  update(doctor: Doctor): Promise<Doctor>;
  delete(id: number): Promise<void>;
  addDoctorsSpecialities(
    doctor: Doctor,
    speciality_ids: number[],
  ): Promise<Doctor>;
  removeDoctorsSpecialities(
    doctor: Doctor,
    speciality_ids: number[],
  ): Promise<Doctor>;
}

export default IDoctorsRepository;
