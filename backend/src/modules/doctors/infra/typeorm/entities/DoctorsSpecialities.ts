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
  id: string;

  @ManyToOne(() => Doctor)
  @JoinColumn({ name: 'doctor_id' })
  doctor: Doctor;

  @ManyToOne(() => Speciality)
  @JoinColumn({ name: 'speciality_id' })
  speciality: Speciality;

  @Column()
  doctor_id: string;

  @Column()
  speciality_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default DoctorsSpecialities;
