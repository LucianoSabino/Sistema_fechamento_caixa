import { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export async function up(knex: Knex) {
  return knex.schema
    .createTable(ETableNames.TAXAS, (table) => {
      table.bigIncrements("id").primary().index();
      table.string("taxaCartao").index().notNullable();
      table.string("taxaIfood").index().notNullable();
      table.string("taxaIfoodOnline").index().notNullable();
    })
    .then(() => {
      console.log(`# Create table ${ETableNames.TAXAS}`);

      // Inserir um único registro inicial na tabela após sua criação
      return knex(ETableNames.TAXAS).insert({
        taxaCartao: 0.05,
        taxaIfood: 0.12,
        taxaIfoodOnline: 0.08,
      });
    });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(ETableNames.TAXAS).then(() => {
    console.log(`# Drop table ${ETableNames.TAXAS}`);
  });
}
