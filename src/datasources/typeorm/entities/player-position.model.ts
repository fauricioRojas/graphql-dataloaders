import {
  Entity,
  Column,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Player } from './player.model';
import { Position } from './position.model';

@Entity('player_position', { schema: 'soccer' })
@Index('player_id_idx', ['player'])
@Index('position_id_idx', ['position'])
export class PlayerPosition {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id'
  })
  public id: number;

  @Column({
    type: 'int',
    name: 'player_id'
  })
  public playerId: number;

  @ManyToOne(
    () => Player,
    player => player.playerPositions
  )
  @JoinColumn({ name: 'player_id' })
  public player: Promise<Player | null>;

  @Column({
    type: 'int',
    name: 'position_id'
  })
  public positionId: number;

  @ManyToOne(
    () => Position,
    position => position.playerPositions
  )
  @JoinColumn({ name: 'position_id' })
  public position: Promise<Position | null>;
}
