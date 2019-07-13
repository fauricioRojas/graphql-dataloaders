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
import { ClubPlayer } from './club-player.model';
import { Player } from './player.model';

@Entity('club', { schema: 'soccer' })
@Index('country_id_idx', ['country'])
export class Club {
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
    () => Country,
    country => country.clubs
  )
  @JoinColumn({ name: 'country_id' })
  public country: Promise<Country | null>;

  @Column('varchar', {
    nullable: false,
    length: 45,
    name: 'name'
  })
  public name: string;

  @OneToMany(
    () => ClubPlayer,
    clubPlayer => clubPlayer.club
  )
  public players: Promise<Player[]>;

  public static keyFields: Array<keyof Club> = ['id', 'countryId'];
}
