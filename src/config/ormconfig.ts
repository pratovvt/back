import {DataSource} from "typeorm"
import {config} from 'dotenv'
import {UserEntity} from "../entities/user-entity";

config()
export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.PG_HOST,
    port: 5432,
    username: process.env.PG_USERNAME,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    entities: [UserEntity],
    synchronize: true,
})
AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })
