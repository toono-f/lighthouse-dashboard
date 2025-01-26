import { config } from "dotenv";

config({ path: [".env.local", ".env"] });

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined");
}

if (!process.env.GOOGLE_API_KEY) {
  throw new Error("GOOGLE_API_KEY is not defined");
}

export const DATABASE_URL = process.env.DATABASE_URL;
export const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
