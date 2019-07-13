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
    () => Club,
    club => club.country
  )
  public clubs: Promise<Club[]>;

  @OneToMany(
    () => Person,
    person => person.country
  )
  public people: Promise<Person[]>;
}
