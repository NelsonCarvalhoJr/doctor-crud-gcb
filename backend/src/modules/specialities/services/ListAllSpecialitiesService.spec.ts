import FakeSpecialitiesRepository from '../repositories/fakes/FakeSpecialitiesRepository';

import ListAllSpecialitiesService from './ListAllSpecialitiesService';

describe('ListAllSpecialities', () => {
  it('should be able to list all specialities', async () => {
    const fakeSpecialitiesRepository = new FakeSpecialitiesRepository();

    const listAllSpecialities = new ListAllSpecialitiesService(
      fakeSpecialitiesRepository,
    );

    await fakeSpecialitiesRepository.create({
      name: 'speciality 1',
    });

    await fakeSpecialitiesRepository.create({
      name: 'speciality 2',
    });

    await fakeSpecialitiesRepository.create({
      name: 'speciality 3',
    });

    const specialitiesFound = await listAllSpecialities.execute();

    expect(specialitiesFound.length).toBe(3);
  });
});
