import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Country } from './country.model';
import { Player } from './player.model';

@Entity('person', { schema: 'soccer' })
@Index('country_id_idx', ['country'])
export class Person {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id'
  })
  public id: number;

  @Column({
    type: 'int',
    name: 'country_id'
  })
  public countryId: number;

  @ManyToOne(
    type => Country,
    country => country.people,
    { nullable: false, onDelete: 'NO ACTION', onUpdate: 'NO ACTION' }
  )
  @JoinColumn({ name: 'country_id' })
  public country: Promise<Country | null>;

  @Column('varchar', {
    nullable: false,
    length: 20,
    name: 'first_name'
  })
  public firstName: string;

  @Column('varchar', {
    nullable: true,
    length: 20,
    name: 'last_name'
  })
  public lastName: string | null;

  @OneToMany(
    type => Player,
    player => player.person,
    { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' }
  )
  public players: Promise<Player[]>;

  public static keyFields: Array<keyof Person> = ['id', 'countryId'];
}
