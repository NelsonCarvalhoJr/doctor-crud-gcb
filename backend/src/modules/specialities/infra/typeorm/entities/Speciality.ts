import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import DoctorsSpecialities from '@modules/doctors/infra/typeorm/entities/DoctorsSpecialities';

@Entity('specialities')
class Speciality {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @OneToMany(
    () => DoctorsSpecialities,
    doctorsSpecialities => doctorsSpecialities.speciality,
    {
      eager: true,
    },
  )
  doctors_specialities: DoctorsSpecialities[];

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Speciality;
