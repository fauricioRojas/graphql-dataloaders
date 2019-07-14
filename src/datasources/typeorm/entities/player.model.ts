import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Person } from './person.model';
import { ClubPlayer } from './club-player.model';
import { PlayerPosition } from './player-position.model';

@Entity('player', { schema: 'soccer' })
@Index('person_id_idx', ['person'])
export class Player {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id'
  })
  public id: number;

  @Column({
    type: 'int',
    name: 'person_id'
  })
  public personId: number;

  @OneToOne(() => Person)
  @JoinColumn({ name: 'person_id' })
  public person: Promise<Person>;

  @Column('varchar', {
    nullable: false,
    length: 5,
    name: 'foot'
  })
  public foot: string;

  @Column('tinyint', {
    nullable: false,
    name: 'active'
  })
  public active: number;

  @OneToMany(
    () => ClubPlayer,
    clubPlayer => clubPlayer.player
  )
  public clubs: Promise<ClubPlayer[]>;

  @OneToMany(
    () => PlayerPosition,
    playerPosition => playerPosition.player
  )
  public playerPositions: Promise<PlayerPosition[]>;

  public static keyFields: Array<keyof Player> = ['id', 'personId'];
}
