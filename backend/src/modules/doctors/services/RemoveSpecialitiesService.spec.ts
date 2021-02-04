import AppError from '@shared/errors/AppError';

import FakeSpecialitiesRepository from '@modules/specialities/repositories/fakes/FakeSpecialitiesRepository';
import FakeDoctorsRepository from '../repositories/fakes/FakeDoctorsRepository';

import RemoveSpecialitiesService from './RemoveSpecialitiesService';

describe('RemoveSpecialities', () => {
  it('should be able to remove specialities to a doctor', async () => {
    const fakeDoctorsRepository = new FakeDoctorsRepository();
    const fakeSpecialitiesRepository = new FakeSpecialitiesRepository();

    const removeSpecialities = new RemoveSpecialitiesService(
      fakeDoctorsRepository,
      fakeSpecialitiesRepository,
    );

    const speciality1 = await fakeSpecialitiesRepository.create({
      name: 'Speciality 1',
    });
    const speciality2 = await fakeSpecialitiesRepository.create({
      name: 'Speciality 2',
    });
    const speciality3 = await fakeSpecialitiesRepository.create({
      name: 'Speciality 3',
    });
    const speciality4 = await fakeSpecialitiesRepository.create({
      name: 'Speciality 4',
    });

    const doctor = await fakeDoctorsRepository.create({
      name: 'John Doe',
      crm: 123,
      telephone: '(12) 3123-1231',
      cell_phone: '(12) 31231-2312',
      postcode: '12312-312',
      doctors_specialities: [
        { speciality_id: speciality1.id },
        { speciality_id: speciality2.id },
        { speciality_id: speciality3.id },
        { speciality_id: speciality4.id },
      ],
    });

    const updatedDoctor = await removeSpecialities.execute({
      doctor_id: doctor.id,
      speciality_ids: [speciality3.id, speciality4.id],
    });

    expect(updatedDoctor.doctors_specialities.length).toBe(2);
  });

  it('should not be able to remove a speciality to a non-existing doctor', async () => {
    const fakeDoctorsRepository = new FakeDoctorsRepository();
    const fakeSpecialitiesRepository = new FakeSpecialitiesRepository();

    const removeSpecialities = new RemoveSpecialitiesService(
      fakeDoctorsRepository,
      fakeSpecialitiesRepository,
    );

    const speciality1 = await fakeSpecialitiesRepository.create({
      name: 'Speciality 1',
    });

    expect(
      removeSpecialities.execute({
        doctor_id: 0,
        speciality_ids: [speciality1.id],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to remove a non-existing speciality to a doctor', async () => {
    const fakeDoctorsRepository = new FakeDoctorsRepository();
    const fakeSpecialitiesRepository = new FakeSpecialitiesRepository();

    const removeSpecialities = new RemoveSpecialitiesService(
      fakeDoctorsRepository,
      fakeSpecialitiesRepository,
    );

    const speciality1 = await fakeSpecialitiesRepository.create({
      name: 'Speciality 1',
    });
    const speciality2 = await fakeSpecialitiesRepository.create({
      name: 'Speciality 2',
    });
    const speciality3 = await fakeSpecialitiesRepository.create({
      name: 'Speciality 3',
    });

    const doctor = await fakeDoctorsRepository.create({
      name: 'John Doe',
      crm: 123,
      telephone: '(12) 3123-1231',
      cell_phone: '(12) 31231-2312',
      postcode: '12312-312',
      doctors_specialities: [
        { speciality_id: speciality1.id },
        { speciality_id: speciality2.id },
        { speciality_id: speciality3.id },
      ],
    });

    expect(
      removeSpecialities.execute({
        doctor_id: doctor.id,
        speciality_ids: [0],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to remove a speciality that doesn't exists in a doctor", async () => {
    const fakeDoctorsRepository = new FakeDoctorsRepository();
    const fakeSpecialitiesRepository = new FakeSpecialitiesRepository();

    const removeSpecialities = new RemoveSpecialitiesService(
      fakeDoctorsRepository,
      fakeSpecialitiesRepository,
    );

    const speciality1 = await fakeSpecialitiesRepository.create({
      name: 'Speciality 1',
    });
    const speciality2 = await fakeSpecialitiesRepository.create({
      name: 'Speciality 2',
    });
    const speciality3 = await fakeSpecialitiesRepository.create({
      name: 'Speciality 3',
    });
    const speciality4 = await fakeSpecialitiesRepository.create({
      name: 'Speciality 4',
    });

    const doctor = await fakeDoctorsRepository.create({
      name: 'John Doe',
      crm: 123,
      telephone: '(12) 3123-1231',
      cell_phone: '(12) 31231-2312',
      postcode: '12312-312',
      doctors_specialities: [
        { speciality_id: speciality1.id },
        { speciality_id: speciality2.id },
        { speciality_id: speciality3.id },
      ],
    });

    expect(
      removeSpecialities.execute({
        doctor_id: doctor.id,
        speciality_ids: [speciality4.id],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not to let a doctor with less than 2 specialities', async () => {
    const fakeDoctorsRepository = new FakeDoctorsRepository();
    const fakeSpecialitiesRepository = new FakeSpecialitiesRepository();

    const removeSpecialities = new RemoveSpecialitiesService(
      fakeDoctorsRepository,
      fakeSpecialitiesRepository,
    );

    const speciality1 = await fakeSpecialitiesRepository.create({
      name: 'Speciality 1',
    });
    const speciality2 = await fakeSpecialitiesRepository.create({
      name: 'Speciality 2',
    });

    const doctor = await fakeDoctorsRepository.create({
      name: 'John Doe',
      crm: 123,
      telephone: '(12) 3123-1231',
      cell_phone: '(12) 31231-2312',
      postcode: '12312-312',
      doctors_specialities: [
        { speciality_id: speciality1.id },
        { speciality_id: speciality2.id },
      ],
    });

    expect(
      removeSpecialities.execute({
        doctor_id: doctor.id,
        speciality_ids: [speciality1.id],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
