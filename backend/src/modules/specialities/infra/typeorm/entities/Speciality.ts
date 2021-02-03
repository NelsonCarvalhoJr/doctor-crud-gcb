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
  id: string;

  @OneToMany(
    () => DoctorsSpecialities,
    doctorsSpecialities => doctorsSpecialities.speciality,
    {
      eager: true,
    },
  )
  game_methods: DoctorsSpecialities[];

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Speciality;
