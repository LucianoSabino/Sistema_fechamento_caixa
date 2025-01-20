// Passando as conxão

import knex from "knex";
import "dotenv/config";
import pg from "pg";
import { development, production, test } from "./knexfile";

// Verificando se estamos no ambiente de produção
if (process.env.NODE_ENV === "production") {
  pg.types.setTypeParser(20, "text", parseInt);
}

const getEnviroment = () => {
  const env = process.env.NODE_ENV || "development";
  console.log(`Using environment: ${env}`); // Debug: verifica o ambiente atual
  switch (env) {
    case "production":
      return production;
    case "test":
      return test;
    default:
      return development;
  }
};
export const Knex = knex(getEnviroment());
