import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {country} from "./country";
import {player} from "./player";


@Entity("person",{schema:"soccer" } )
@Index("country_id_idx",["country",])
export class person {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"id"
        })
    id:number;
        

   
    @ManyToOne(type=>country, country=>country.persons,{  nullable:false,onDelete: 'NO ACTION',onUpdate: 'NO ACTION' })
    @JoinColumn({ name:'country_id'})
    country:country | null;


    @Column("varchar",{ 
        nullable:false,
        length:20,
        name:"first_name"
        })
    first_name:string;
        

    @Column("varchar",{ 
        nullable:true,
        length:20,
        name:"last_name"
        })
    last_name:string | null;
        

   
    @OneToMany(type=>player, player=>player.person,{ onDelete: 'NO ACTION' ,onUpdate: 'NO ACTION' })
    players:player[];
    
}
