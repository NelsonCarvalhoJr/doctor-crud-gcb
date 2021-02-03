import IDoctorsRepository from '@modules/doctors/repositories/IDoctorsRepository';

import IFindAllDoctorsDTO from '@modules/doctors/dtos/IFindAllDoctorsDTO';
import ICreateDoctorDTO from '@modules/doctors/dtos/ICreateDoctorDTO';

import Doctor from '../../infra/typeorm/entities/Doctor';
import DoctorsSpecialities from '../../infra/typeorm/entities/DoctorsSpecialities';

class DoctorsRepository implements IDoctorsRepository {
  private doctors: Doctor[] = [];

  public async all({
    name = '',
    crm,
    telephone = '',
    cell_phone = '',
    postcode = '',
  }: IFindAllDoctorsDTO): Promise<Doctor[]> {
    let filteredDoctors = this.doctors
      .filter(doctor => doctor.name.toLowerCase().includes(name.toLowerCase()))
      .filter(doctor =>
        doctor.telephone.toLowerCase().includes(telephone.toLowerCase()),
      )
      .filter(doctor =>
        doctor.cell_phone.toLowerCase().includes(cell_phone.toLowerCase()),
      )
      .filter(doctor =>
        doctor.postcode.toLowerCase().includes(postcode.toLowerCase()),
      );

    if (crm) {
      filteredDoctors = filteredDoctors.filter(doctor => doctor.crm === crm);
    }

    return filteredDoctors;
  }

  public async create(doctorData: ICreateDoctorDTO): Promise<Doctor> {
    const doctor = new Doctor();

    const count = this.doctors.length;

    const id = count ? this.doctors[count - 1].id + 1 : 1;

    Object.assign(doctor, doctorData, { id });

    doctor.doctors_specialities = [];

    this.doctors.push(doctor);

    return doctor;
  }

  public async update(doctor: Doctor): Promise<Doctor> {
    const doctorIndex = this.doctors.findIndex(
      iterableDoctor => iterableDoctor.id === doctor.id,
    );

    this.doctors[doctorIndex] = doctor;

    return doctor;
  }

  public async delete(id: number): Promise<void> {
    const doctorIndex = this.doctors.findIndex(doctor => doctor.id === id);

    this.doctors.splice(doctorIndex, 1);
  }

  public async addDoctorsSpecialities(
    doctor: Doctor,
    speciality_ids: number[],
  ): Promise<Doctor> {
    const doctorIndex = this.doctors.findIndex(
      iterabledoctor => iterabledoctor.id === doctor.id,
    );

    speciality_ids.forEach(speciality_id => {
      const doctorsSpecialities = new DoctorsSpecialities();

      Object.assign(doctorsSpecialities, {
        speciality_id,
        doctor_id: doctor.id,
      });

      this.doctors[doctorIndex].doctors_specialities.push(doctorsSpecialities);
    });

    return this.doctors[doctorIndex];
  }

  public async removeDoctorsSpecialities(
    doctor: Doctor,
    speciality_ids: number[],
  ): Promise<Doctor> {
    const doctorIndex = this.doctors.findIndex(
      iterabledoctor => iterabledoctor.id === doctor.id,
    );

    speciality_ids.forEach(speciality_id => {
      const specialityIndex = this.doctors[
        doctorIndex
      ].doctors_specialities.findIndex(
        doctors_specialities =>
          doctors_specialities.speciality_id === speciality_id,
      );

      if (specialityIndex >= 0) {
        this.doctors[doctorIndex].doctors_specialities.splice(
          specialityIndex,
          1,
        );
      }
    });

    return this.doctors[doctorIndex];
  }
}

export default DoctorsRepository;
