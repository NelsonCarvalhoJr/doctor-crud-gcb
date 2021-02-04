import AppError from '@shared/errors/AppError';

import FakeDoctorsRepository from '../repositories/fakes/FakeDoctorsRepository';

import ShowDoctorService from './ShowDoctorService';

describe('ShowDoctor', () => {
  it('should be able to show a doctor', async () => {
    const fakeDoctorsRepository = new FakeDoctorsRepository();

    const updateDoctor = new ShowDoctorService(fakeDoctorsRepository);

    const doctor = await fakeDoctorsRepository.create({
      name: 'John Doe',
      crm: 123,
      telephone: '(12) 3123-1231',
      cell_phone: '(12) 31231-2312',
      postcode: '12312-312',
      doctors_specialities: [{ speciality_id: 1 }, { speciality_id: 2 }],
    });

    const doctorFound = await updateDoctor.execute({
      id: doctor.id,
    });

    expect(doctorFound.name).toBe('John Doe');
    expect(doctorFound.crm).toBe(123);
    expect(doctorFound.postcode).toBe('12312-312');
  });

  it('should not be able to show a non-existing doctor', async () => {
    const fakeDoctorsRepository = new FakeDoctorsRepository();

    const updateDoctor = new ShowDoctorService(fakeDoctorsRepository);

    expect(
      updateDoctor.execute({
        id: 0,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
