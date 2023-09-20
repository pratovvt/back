import {Column, Entity, JoinColumn, ManyToMany, OneToMany, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {UserEntity} from "../../users/entities/user-entity";
import {IsPhoneNumber} from "class-validator";

@Entity({name: "company"})
export class CompanyEntity {
    @PrimaryGeneratedColumn()
    id: string;
    @Column()
    name: string;
    @Column({unique: true})
    phone: string;
    @Column()
    address: string;
    @OneToMany(() => UserEntity, user => user.company)
    users: UserEntity
}
