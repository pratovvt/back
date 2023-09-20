import {Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {CompanyEntity} from "../../company/entities/company-entity";

@Entity({name: "users"})
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: string;
    @Column({unique: true})
    email: string
    @Column()
    password: string;
    @Column()
    first_name: string;
    @Column()
    patronymic: string;
    @Column()
    last_name: string;
    @ManyToOne(() => CompanyEntity, company => company.users)
    company: CompanyEntity[]
}
