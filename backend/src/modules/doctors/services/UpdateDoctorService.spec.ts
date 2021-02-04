import AppError from '@shared/errors/AppError';

import FakeDoctorsRepository from '../repositories/fakes/FakeDoctorsRepository';

import UpdateDoctorService from './UpdateDoctorService';

describe('UpdateDoctor', () => {
  it('should be able to update a doctor', async () => {
    const fakeDoctorsRepository = new FakeDoctorsRepository();

    const updateDoctor = new UpdateDoctorService(fakeDoctorsRepository);

    const doctor = await fakeDoctorsRepository.create({
      name: 'John Doe',
      crm: 123,
      telephone: '(12) 3123-1231',
      cell_phone: '(12) 31231-2312',
      postcode: '12312-312',
      doctors_specialities: [{ speciality_id: 1 }, { speciality_id: 2 }],
    });

    const updatedDoctor = await updateDoctor.execute({
      id: doctor.id,
      name: 'Updated Name',
      crm: 456,
      telephone: '(45) 6456-4564',
      cell_phone: '(45) 64564-5645',
      postcode: '45645-645',
    });

    expect(updatedDoctor.name).toBe('Updated Name');
    expect(updatedDoctor.crm).toBe(456);
    expect(updatedDoctor.postcode).toBe('45645-645');
  });

  it('should not be able to update a non-existing doctor', async () => {
    const fakeDoctorsRepository = new FakeDoctorsRepository();

    const updateDoctor = new UpdateDoctorService(fakeDoctorsRepository);

    expect(
      updateDoctor.execute({
        id: 0,
        name: 'Updated Name',
        postcode: '45678-123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
