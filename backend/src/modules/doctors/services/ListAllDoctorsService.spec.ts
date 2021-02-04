import FakeDoctorsRepository from '../repositories/fakes/FakeDoctorsRepository';

import ListAllDoctorsService from './ListAllDoctorsService';

describe('ListAllDoctors', () => {
  it('should be able to list all doctors', async () => {
    const fakeDoctorsRepository = new FakeDoctorsRepository();

    const listAllDoctors = new ListAllDoctorsService(fakeDoctorsRepository);

    await fakeDoctorsRepository.create({
      name: 'John Doe 1',
      crm: 123,
      telephone: '(12) 3123-1231',
      cell_phone: '(12) 31231-2312',
      postcode: '12312-312',
      doctors_specialities: [{ speciality_id: 1 }, { speciality_id: 2 }],
    });

    await fakeDoctorsRepository.create({
      name: 'John Doe 2',
      crm: 456,
      telephone: '(45) 6456-4564',
      cell_phone: '(45) 64564-5645',
      postcode: '45645-645',
      doctors_specialities: [{ speciality_id: 3 }, { speciality_id: 4 }],
    });

    await fakeDoctorsRepository.create({
      name: 'John Doe 3',
      crm: 789,
      telephone: '(78) 9789-7897',
      cell_phone: '(78) 97897-8978',
      postcode: '78978-978',
      doctors_specialities: [{ speciality_id: 5 }, { speciality_id: 1 }],
    });

    const specialitiesFound = await listAllDoctors.execute({});

    expect(specialitiesFound.length).toBe(3);
  });
});
