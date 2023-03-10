import * as dotenv from 'dotenv';
dotenv.config();

export const PORT: string = process.env.PORT;

export const MONGODB_URI: string =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;

export const SECRET: string = process.env.SECRET;

export default { PORT, MONGODB_URI, SECRET };
