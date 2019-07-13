import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Club } from './club.model';
import { Player } from './player.model';

@Entity('club_player', { schema: 'soccer' })
@Index('club_id_idx', ['club'])
@Index('player_id_idx', ['player'])
export class ClubPlayer {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id'
  })
  public id: number;

  @Column({
    type: 'int',
    name: 'club_id'
  })
  public clubId: number;

  @ManyToOne(
    () => Club,
    club => club.players,
    { nullable: false, onDelete: 'NO ACTION', onUpdate: 'NO ACTION' }
  )
  @JoinColumn({ name: 'club_id' })
  public club: Promise<Club | null>;

  @Column({
    type: 'int',
    name: 'player_id'
  })
  public playerId: number;

  @ManyToOne(
    () => Player,
    player => player.clubs,
    { nullable: false, onDelete: 'NO ACTION', onUpdate: 'NO ACTION' }
  )
  @JoinColumn({ name: 'player_id' })
  public player: Promise<Player | null>;

  @Column('timestamp', {
    nullable: true,
    name: 'started_at'
  })
  public startedAt: Date | null;

  @Column('timestamp', {
    nullable: true,
    name: 'finished_at'
  })
  public finishedAt: Date | null;
}
