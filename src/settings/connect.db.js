import mongoose from "mongoose";
import { env } from "./environment.js";

export const connectMongoDb = async () => {
  try {
    // faz a conexao com o mongodb
    // para sumir com os 'DeprecationWarning' são acrescentados os 4 use junto com o uri de conexao
    await mongoose.connect(env.MONGODB_URI);
    console.info("MongoDB conectado");
  } catch (err) {
    console.error(`Erro ao conectar ao mongodb | ${err.message}`);
    process.exit(1);
  }
};
