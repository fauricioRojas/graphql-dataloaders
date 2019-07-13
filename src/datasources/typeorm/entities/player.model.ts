import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
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

  @ManyToOne(
    type => Person,
    person => person.players,
    { nullable: false, onDelete: 'NO ACTION', onUpdate: 'NO ACTION' }
  )
  @JoinColumn({ name: 'person_id' })
  public person: Promise<Person | null>;

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
    type => ClubPlayer,
    clubPlayer => clubPlayer.player,
    { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' }
  )
  public clubPlayers: Promise<ClubPlayer[]>;

  @OneToMany(
    type => PlayerPosition,
    playerPosition => playerPosition.player,
    { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' }
  )
  public playerPositions: Promise<PlayerPosition[]>;
}
