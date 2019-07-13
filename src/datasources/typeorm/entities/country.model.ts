import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Club } from './club.model';
import { Person } from './person.model';

@Entity('country', { schema: 'soccer' })
export class Country {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id'
  })
  public id: number;

  @Column('varchar', {
    nullable: false,
    length: 45,
    name: 'name'
  })
  public name: string;

  @Column('varchar', {
    nullable: false,
    length: 3,
    name: 'code'
  })
  public code: string;

  @OneToMany(
    type => Club,
    club => club.country,
    { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' }
  )
  public clubs: Promise<Club[]>;

  @OneToMany(
    type => Person,
    person => person.country,
    { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' }
  )
  public people: Promise<Person[]>;
}
