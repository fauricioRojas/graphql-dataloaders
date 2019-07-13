import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {country} from "./country";
import {club_player} from "./club_player";


@Entity("club",{schema:"soccer" } )
@Index("country_id_idx",["country",])
export class club {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"id"
        })
    id:number;
        

   
    @ManyToOne(type=>country, country=>country.clubs,{  nullable:false,onDelete: 'NO ACTION',onUpdate: 'NO ACTION' })
    @JoinColumn({ name:'country_id'})
    country:country | null;


    @Column("varchar",{ 
        nullable:false,
        length:45,
        name:"name"
        })
    name:string;
        

   
    @OneToMany(type=>club_player, club_player=>club_player.club,{ onDelete: 'NO ACTION' ,onUpdate: 'NO ACTION' })
    clubPlayers:club_player[];
    
}
