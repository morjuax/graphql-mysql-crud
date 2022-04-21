import  { createConnection } from 'typeorm'
import { Users } from './entities/Users';


export const connectDB = async () => {
  await createConnection({
    type: 'mysql',
    username: 'root2',
    password: 'root2',
    host: 'localhost',
    port: 3306,
    database: 'usersdb',
    entities: [Users],
    synchronize: false,
    ssl: false
  })
}