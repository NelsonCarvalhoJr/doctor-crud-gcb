import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Speciality from '@modules/specialities/infra/typeorm/entities/Speciality';
import Doctor from './Doctor';

@Entity('doctors_specialities')
class DoctorsSpecialities {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Doctor)
  @JoinColumn({ name: 'doctor_id' })
  doctor: Doctor;

  @ManyToOne(() => Speciality, {
    eager: true,
  })
  @JoinColumn({ name: 'speciality_id' })
  speciality: Speciality;

  @Column()
  doctor_id: number;

  @Column()
  speciality_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default DoctorsSpecialities;
