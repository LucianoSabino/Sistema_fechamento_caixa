import { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export async function up(knex: Knex) {
  return knex.schema
    .createTable(ETableNames.CAIXA, (table) => {
      table.bigIncrements("id").primary().index(); // Usando bigIncrements para o id
      table.string("dinheiro").notNullable();
      table.string("cartao").notNullable(); // Removendo o acento do nome da coluna
      table.string("ifoodOnline").notNullable();
      table.string("ifood").notNullable();
      table.string("despersa").notNullable();
      table.timestamp("data").defaultTo(knex.fn.now()).notNullable(); // Usando timestamp para a data
      table.timestamp("hora").defaultTo(knex.fn.now()).notNullable(); // Usando timestamp para hora
      table.comment("Tabela usada para armazenar caixa no sistema");
    })
    .then(() => {
      console.log(`# Create table ${ETableNames.CAIXA}`);
    });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(ETableNames.CAIXA).then(() => {
    console.log(`# Drop table ${ETableNames.CAIXA}`);
  });
}
