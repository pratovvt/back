import {Column, Entity, OneToOne, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {UserEntity} from "./user-entity";

@Entity({name: 'token'})
export class TokenEntity {
    @PrimaryGeneratedColumn()
    @OneToOne(() => UserEntity, (user) => user.id)
    user: string;
    @Column()
    refreshToken: string
}
