import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PlayerPosition } from './player-position.model';

@Entity('position', { schema: 'soccer' })
export class Position {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id'
  })
  public id: number;

  @Column('varchar', {
    nullable: false,
    length: 30,
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
    () => PlayerPosition,
    playerPosition => playerPosition.position
  )
  public playerPositions: Promise<PlayerPosition[]>;
}
