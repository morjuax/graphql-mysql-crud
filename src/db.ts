import  { createConnection } from 'typeorm'

export const connectDB = async () => {
  await createConnection({
    type: 'mysql',
    username: 'root2',
    password: 'root2',
    host: 'localhost',
    port: 3306,
    database: 'usersdb',
    entities: [],
    synchronize: true,
    ssl: false
  })
}