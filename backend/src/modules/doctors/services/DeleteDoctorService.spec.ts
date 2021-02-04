import AppError from '@shared/errors/AppError';

import FakeDoctorsRepository from '../repositories/fakes/FakeDoctorsRepository';

import DeleteDoctorService from './DeleteDoctorService';

describe('DeleteDoctor', () => {
  it('should be able to update a doctor', async () => {
    const fakeDoctorsRepository = new FakeDoctorsRepository();

    const deleteDoctor = new DeleteDoctorService(fakeDoctorsRepository);

    const deleteFunction = jest.spyOn(fakeDoctorsRepository, 'delete');

    const doctor = await fakeDoctorsRepository.create({
      name: 'John Doe',
      crm: 123,
      telephone: '(12) 3123-1231',
      cell_phone: '(12) 31231-2312',
      postcode: '12312-312',
      doctors_specialities: [{ speciality_id: 1 }, { speciality_id: 2 }],
    });

    await deleteDoctor.execute({ id: doctor.id });

    expect(deleteFunction).toBeCalledWith(doctor.id);
  });

  it('should not be able to delete a non-existing doctor', async () => {
    const fakeDoctorsRepository = new FakeDoctorsRepository();

    const deleteDoctor = new DeleteDoctorService(fakeDoctorsRepository);

    expect(
      deleteDoctor.execute({
        id: 0,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
