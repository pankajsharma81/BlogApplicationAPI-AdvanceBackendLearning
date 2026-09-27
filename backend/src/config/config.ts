import dotenv from "dotenv";
import { z } from "zod";

dotenv.config({
  path: "./.env",
});

const envSchema = z.object({
    NODE_ENV: z.enum(["development","test","production"]).default("development"),
    PORT: z.coerce.number().int().positive().default(4001),
    DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
    FRONTEND_URL: z.url("FRONTEND_URL must be a valid URL"),

    JWT_ACCESS_SECRET: z.string().min(32, "JWT_ACCESS_SECRET must be at least 32 characters"),
    JWT_REFRESH_SECRET: z.string().min(32, "JWT_REFRESH_SECRET must be at least 32 characters"),

    JWT_ACCESS_EXPIRES_IN: z.string().min(1),
    JWT_REFRESH_EXPIRES_IN: z.string().min(1)

})

const parseEnv = envSchema.safeParse(process.env);

if(!parseEnv.success){
    console.error("❌ Invalid environment configuration:");
    console.error(z.treeifyError(parseEnv.error));

    process.exit(1)
}

export const env = parseEnv.data;