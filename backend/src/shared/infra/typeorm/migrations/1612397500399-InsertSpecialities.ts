import { MigrationInterface, QueryRunner, getRepository, In } from 'typeorm';

import Speciality from '@modules/specialities/infra/typeorm/entities/Speciality';

export default class InsertSpecialities1612397500399
  implements MigrationInterface {
  public async up(_: QueryRunner): Promise<void> {
    const specialityRepository = getRepository(Speciality);

    const specialities = [
      'Alergologia',
      'Angiologia',
      'Buco Maxilo',
      'Cardiologia Clínica',
      'Cardiologia Infantil',
      'Cirurgia Cabeça e Pescoço',
      'Cirurgia Cardíaca',
      'Cirurgia de Tórax',
    ];

    const specialitiesToSave = specialities.map(speciality => {
      return specialityRepository.create({ name: speciality });
    });

    await specialityRepository.save(specialitiesToSave);
  }

  public async down(_: QueryRunner): Promise<void> {
    const specialityRepository = getRepository(Speciality);

    const specialities = await specialityRepository.find({
      where: {
        name: In([
          'Alergologia',
          'Angiologia',
          'Buco Maxilo',
          'Cardiologia Clínica',
          'Cardiologia Infantil',
          'Cirurgia Cabeça e Pescoço',
          'Cirurgia Cardíaca',
          'Cirurgia de Tórax',
        ]),
      },
    });

    const specialitesToDelete = specialities.map(speciality => speciality.id);

    await specialityRepository.delete(specialitesToDelete);
  }
}
