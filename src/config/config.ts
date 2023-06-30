import dotenv from "dotenv";

dotenv.config();

export const config = {
  server: {
    port: process.env.PORT
  },
  db: {
    url: process.env.DATABASE_URL
  },
  api: {
    username: process.env.API_USERNAME,
    password: process.env.API_PASSWORD
  }
};
