import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {club} from "./club";
import {person} from "./person";


@Entity("country",{schema:"soccer" } )
export class country {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"id"
        })
    id:number;
        

    @Column("varchar",{ 
        nullable:false,
        length:45,
        name:"name"
        })
    name:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:3,
        name:"code"
        })
    code:string;
        

   
    @OneToMany(type=>club, club=>club.country,{ onDelete: 'NO ACTION' ,onUpdate: 'NO ACTION' })
    clubs:club[];
    

   
    @OneToMany(type=>person, person=>person.country,{ onDelete: 'NO ACTION' ,onUpdate: 'NO ACTION' })
    persons:person[];
    
}
