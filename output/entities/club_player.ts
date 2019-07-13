import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {club} from "./club";
import {player} from "./player";


@Entity("club_player",{schema:"soccer" } )
@Index("club_id_idx",["club",])
@Index("player_id_idx",["player",])
export class club_player {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"id"
        })
    id:number;
        

   
    @ManyToOne(type=>club, club=>club.clubPlayers,{  nullable:false,onDelete: 'NO ACTION',onUpdate: 'NO ACTION' })
    @JoinColumn({ name:'club_id'})
    club:club | null;


   
    @ManyToOne(type=>player, player=>player.clubPlayers,{  nullable:false,onDelete: 'NO ACTION',onUpdate: 'NO ACTION' })
    @JoinColumn({ name:'player_id'})
    player:player | null;


    @Column("timestamp",{ 
        nullable:true,
        name:"started_at"
        })
    started_at:Date | null;
        

    @Column("timestamp",{ 
        nullable:true,
        name:"finished_at"
        })
    finished_at:Date | null;
        
}
