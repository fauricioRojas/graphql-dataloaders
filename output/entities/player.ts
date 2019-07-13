import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {person} from "./person";
import {club_player} from "./club_player";
import {player_position} from "./player_position";


@Entity("player",{schema:"soccer" } )
@Index("person_id_idx",["person",])
export class player {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"id"
        })
    id:number;
        

   
    @ManyToOne(type=>person, person=>person.players,{  nullable:false,onDelete: 'NO ACTION',onUpdate: 'NO ACTION' })
    @JoinColumn({ name:'person_id'})
    person:person | null;


    @Column("varchar",{ 
        nullable:false,
        length:5,
        name:"foot"
        })
    foot:string;
        

    @Column("tinyint",{ 
        nullable:false,
        name:"active"
        })
    active:number;
        

   
    @OneToMany(type=>club_player, club_player=>club_player.player,{ onDelete: 'NO ACTION' ,onUpdate: 'NO ACTION' })
    clubPlayers:club_player[];
    

   
    @OneToMany(type=>player_position, player_position=>player_position.player,{ onDelete: 'NO ACTION' ,onUpdate: 'NO ACTION' })
    playerPositions:player_position[];
    
}
