import { getRepository, Repository, Raw, In } from 'typeorm';

import IDoctorsRepository from '@modules/doctors/repositories/IDoctorsRepository';

import IFindAllDoctorsDTO from '@modules/doctors/dtos/IFindAllDoctorsDTO';
import ICreateDoctorDTO from '@modules/doctors/dtos/ICreateDoctorDTO';

import Doctor from '../entities/Doctor';
import DoctorsSpecialities from '../entities/DoctorsSpecialities';

class DoctorsRepository implements IDoctorsRepository {
  private ormRepository: Repository<Doctor>;

  constructor() {
    this.ormRepository = getRepository(Doctor);
  }

  public async all({
    name = '',
    crm,
    telephone = '',
    cell_phone = '',
    postcode = '',
  }: IFindAllDoctorsDTO): Promise<Doctor[]> {
    const findOptions = {
      where: {
        name: Raw(alias => `LOWER(${alias}) Like '%${name.toLowerCase()}%'`),
        crm,
        telephone: Raw(
          alias => `LOWER(${alias}) Like '%${telephone.toLowerCase()}%'`,
        ),
        cell_phone: Raw(
          alias => `LOWER(${alias}) Like '%${cell_phone.toLowerCase()}%'`,
        ),
        postcode: Raw(
          alias => `LOWER(${alias}) Like '%${postcode.toLowerCase()}%'`,
        ),
      },
    };

    if (!crm) {
      delete findOptions.where.crm;
    }

    const doctors = await this.ormRepository.find(findOptions);

    return doctors;
  }

  public async findById(id: number): Promise<Doctor | undefined> {
    const doctor = await this.ormRepository.findOne(id);

    return doctor;
  }

  public async create(doctorData: ICreateDoctorDTO): Promise<Doctor> {
    const doctor = this.ormRepository.create(doctorData);

    await this.ormRepository.save(doctor);

    return doctor;
  }

  public async update(doctor: Doctor): Promise<Doctor> {
    await this.ormRepository.save(doctor);

    return doctor;
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async addDoctorsSpecialities(
    doctor: Doctor,
    speciality_ids: number[],
  ): Promise<Doctor> {
    speciality_ids.forEach(speciality_id => {
      const doctorsSpecialities = new DoctorsSpecialities();

      doctorsSpecialities.doctor_id = doctor.id;
      doctorsSpecialities.speciality_id = speciality_id;

      doctor.doctors_specialities.push(doctorsSpecialities);
    });

    await this.ormRepository.save(doctor);

    return doctor;
  }

  public async removeDoctorsSpecialities(
    doctor: Doctor,
    speciality_ids: number[],
  ): Promise<Doctor> {
    const doctorsSpecialitiesRepository = getRepository(DoctorsSpecialities);

    const doctorsSpecialitiesForDelete = await doctorsSpecialitiesRepository.find(
      {
        where: {
          doctor_id: doctor.id,
          speciality_id: In(speciality_ids),
        },
      },
    );

    await doctorsSpecialitiesRepository
      .createQueryBuilder()
      .delete()
      .andWhereInIds(
        doctorsSpecialitiesForDelete.map(
          doctorsSpecialities => doctorsSpecialities.id,
        ),
      )
      .execute();

    const savedDoctor = await this.ormRepository.findOne(doctor.id);

    return savedDoctor as Doctor;
  }
}

export default DoctorsRepository;
