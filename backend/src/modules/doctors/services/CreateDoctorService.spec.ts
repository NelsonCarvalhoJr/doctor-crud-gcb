import AppError from '@shared/errors/AppError';

import FakeSpecialitiesRepository from '@modules/specialities/repositories/fakes/FakeSpecialitiesRepository';
import FakeDoctorsRepository from '../repositories/fakes/FakeDoctorsRepository';

import CreateDoctorService from './CreateDoctorService';

describe('CreateDoctor', () => {
  it('should be able to create a doctor', async () => {
    const fakeDoctorsRepository = new FakeDoctorsRepository();
    const fakeSpecialitiesRepository = new FakeSpecialitiesRepository();

    const speciality1 = await fakeSpecialitiesRepository.create({
      name: 'speciality 1',
    });
    const speciality2 = await fakeSpecialitiesRepository.create({
      name: 'speciality 2',
    });

    const createDoctor = new CreateDoctorService(
      fakeDoctorsRepository,
      fakeSpecialitiesRepository,
    );

    const doctor = await createDoctor.execute({
      name: 'John Doe',
      crm: 123,
      telephone: '(12) 3456-7890',
      cell_phone: '(12) 34567-8901',
      postcode: '12345-678',
      specialities: [speciality1.id, speciality2.id],
    });

    expect(doctor).toHaveProperty('id');
    expect(doctor.name).toBe('John Doe');
    expect(doctor.postcode).toBe('12345-678');
    expect(doctor.doctors_specialities.length).toBe(2);
  });

  it('should not be able to create a doctor with only one speciality', async () => {
    const fakeDoctorsRepository = new FakeDoctorsRepository();
    const fakeSpecialitiesRepository = new FakeSpecialitiesRepository();

    const speciality1 = await fakeSpecialitiesRepository.create({
      name: 'speciality 1',
    });

    const createDoctor = new CreateDoctorService(
      fakeDoctorsRepository,
      fakeSpecialitiesRepository,
    );

    expect(
      createDoctor.execute({
        name: 'John Doe',
        crm: 123,
        telephone: '(12) 3456-7890',
        cell_phone: '(12) 34567-8901',
        postcode: '12345-678',
        specialities: [speciality1.id],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a doctor with a non-existent speciality', async () => {
    const fakeDoctorsRepository = new FakeDoctorsRepository();
    const fakeSpecialitiesRepository = new FakeSpecialitiesRepository();

    const speciality1 = await fakeSpecialitiesRepository.create({
      name: 'speciality 1',
    });

    const createDoctor = new CreateDoctorService(
      fakeDoctorsRepository,
      fakeSpecialitiesRepository,
    );

    expect(
      createDoctor.execute({
        name: 'John Doe',
        crm: 123,
        telephone: '(12) 3456-7890',
        cell_phone: '(12) 34567-8901',
        postcode: '12345-678',
        specialities: [speciality1.id, 0],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
