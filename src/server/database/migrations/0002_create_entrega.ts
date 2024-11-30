import { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export async function up(knex: Knex) {
  return knex.schema
    .createTable(ETableNames.ENTREGA, (table) => {
      table.bigIncrements("id").primary().index();
      table.string("nomeEntregador").index().notNullable();
      table.decimal("dinheiro", 10, 2).notNullable();
      table.decimal("cartao", 10, 2).notNullable();
      table.decimal("quantidaEntrega", 10).notNullable();
      table.decimal("valorEntrega", 10, 2).notNullable();
      table.date("data").defaultTo(knex.raw("CURRENT_DATE")).notNullable(); // Apenas a data (YYYY-MM-DD)

      table.comment("Tabela usada para armazenar entrega no sistema");
    })
    .then(() => {
      console.log(`# Create table ${ETableNames.ENTREGA}`);
    });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(ETableNames.ENTREGA).then(() => {
    console.log(`# Drop table ${ETableNames.ENTREGA}`);
  });
}
