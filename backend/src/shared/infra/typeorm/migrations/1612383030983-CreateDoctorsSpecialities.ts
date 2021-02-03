import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateDoctorsSpecialities1612383030983
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'doctors_specialities',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'doctor_id',
            type: 'integer',
          },
          {
            name: 'speciality_id',
            type: 'integer',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'DoctorsSpecialityDoctor',
            referencedTableName: 'doctors',
            referencedColumnNames: ['id'],
            columnNames: ['doctor_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'DoctorsSpecialitySpeciality',
            referencedTableName: 'specialities',
            referencedColumnNames: ['id'],
            columnNames: ['speciality_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('doctors_specialities');
  }
}
