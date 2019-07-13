import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {player_position} from "./player_position";


@Entity("position",{schema:"soccer" } )
export class position {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"id"
        })
    id:number;
        

    @Column("varchar",{ 
        nullable:false,
        length:30,
        name:"name"
        })
    name:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:3,
        name:"code"
        })
    code:string;
        

   
    @OneToMany(type=>player_position, player_position=>player_position.position,{ onDelete: 'NO ACTION' ,onUpdate: 'NO ACTION' })
    playerPositions:player_position[];
    
}
