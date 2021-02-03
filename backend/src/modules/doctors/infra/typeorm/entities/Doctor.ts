import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import DoctorsSpecialities from './DoctorsSpecialities';

@Entity('doctors')
class Game {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @OneToMany(
    () => DoctorsSpecialities,
    doctorsSpecialities => doctorsSpecialities.doctor,
    {
      eager: true,
      cascade: ['insert'],
    },
  )
  doctors_specialities: DoctorsSpecialities[];

  @Column()
  name: string;

  @Column()
  crm: number;

  @Column()
  telephone: string;

  @Column()
  cell_phone: string;

  @Column()
  postcode: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Game;
