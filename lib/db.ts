import "server-only";
import { setServers } from "node:dns";
import mongoose from "mongoose";

const globalDB = globalThis as typeof globalThis & {
  mongoConnection?: Promise<typeof mongoose>;
};

export default async function connectDB() {
  if (!process.env.MONGODB_URI)
    throw new Error("MONGODB_URI is not configured");
  if (!globalDB.mongoConnection && process.env.MONGODB_DNS_SERVERS) {
    setServers(
      process.env.MONGODB_DNS_SERVERS.split(",")
        .map((server) => server.trim())
        .filter(Boolean),
    );
  }
  globalDB.mongoConnection ??= mongoose
    .connect(process.env.MONGODB_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
    })
    .then((connection) => {
      console.info("Database connected successfully");
      return connection;
    })
    .catch((error) => {
      console.log(error);
      console.error(
        "Database connection failed:",
        error instanceof Error ? error.name : "UnknownError",
      );
      globalDB.mongoConnection = undefined;
      throw error;
    });

  return globalDB.mongoConnection;
}
