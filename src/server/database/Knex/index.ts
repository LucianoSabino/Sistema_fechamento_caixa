// Passando as conxão

import knex from "knex";
import "dotenv/config";
import { development, production, test } from "./knexfile";

// Verificando se estamos no ambiente de produção

const getEnviroment = () => {
  switch (process.env.NODE_ENV) {
    case "production":
      return production;
    case "test":
      return test;
    default:
      return development;
  }
};

export const Knex = knex(getEnviroment());
