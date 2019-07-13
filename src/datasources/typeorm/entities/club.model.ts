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
    type => Country,
    country => country.clubs,
    { nullable: false, onDelete: 'NO ACTION', onUpdate: 'NO ACTION' }
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
    type => ClubPlayer,
    clubPlayer => clubPlayer.club,
    { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' }
  )
  public clubPlayers: Promise<ClubPlayer[]>;

  public static keyFields: Array<keyof Club> = ['id', 'countryId'];
}
