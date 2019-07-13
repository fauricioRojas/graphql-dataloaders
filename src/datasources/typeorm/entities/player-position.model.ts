import {
  Entity,
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

  @ManyToOne(
    type => Player,
    player => player.playerPositions,
    { nullable: false, onDelete: 'NO ACTION', onUpdate: 'NO ACTION' }
  )
  @JoinColumn({ name: 'player_id' })
  public player: Promise<Player | null>;

  @ManyToOne(
    type => Position,
    position => position.playerPositions,
    { nullable: false, onDelete: 'NO ACTION', onUpdate: 'NO ACTION' }
  )
  @JoinColumn({ name: 'position_id' })
  public position: Promise<Position | null>;
}
