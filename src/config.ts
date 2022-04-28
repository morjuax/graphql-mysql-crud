import {config} from 'dotenv'

config()
const {env} = process;

export const DB_USERNAME = env.DB_USERNAME;
export const DB_PASSWORD = env.DB_PASSWORD;
export const DB_HOST = env.DB_HOST;
export const DB_PORT = env.DB_PORT;
export const DB_NAME = env.DB_NAME;
export const PORT = env.PORT;
