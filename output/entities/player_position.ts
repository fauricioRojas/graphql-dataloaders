import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {player} from "./player";
import {position} from "./position";


@Entity("player_position",{schema:"soccer" } )
@Index("player_id_idx",["player",])
@Index("position_id_idx",["position",])
export class player_position {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"id"
        })
    id:number;
        

   
    @ManyToOne(type=>player, player=>player.playerPositions,{  nullable:false,onDelete: 'NO ACTION',onUpdate: 'NO ACTION' })
    @JoinColumn({ name:'player_id'})
    player:player | null;


   
    @ManyToOne(type=>position, position=>position.playerPositions,{  nullable:false,onDelete: 'NO ACTION',onUpdate: 'NO ACTION' })
    @JoinColumn({ name:'position_id'})
    position:position | null;

}
