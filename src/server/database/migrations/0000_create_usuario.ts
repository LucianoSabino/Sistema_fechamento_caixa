import { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export async function up(knex: Knex) {
  return knex.schema
    .createTable(ETableNames.USUARIO, (table) => {
      table.bigIncrements("id").primary().index();
      table.string("nome").notNullable(); // Valor padrão se não for fornecido
      table.string("email").unique().notNullable(); // Valor padrão se não for fornecido
      table.string("senha").index().unique().notNullable();
      table.string("role").notNullable(); // Define os valores permitidos para a coluna "role"
      table.comment("Tabela usada para armazenar usuario no sistema");
    })
    .then(() => {
      console.log(`# Create table ${ETableNames.USUARIO}`);
    });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(ETableNames.USUARIO).then(() => {
    console.log(`# Drop table ${ETableNames.USUARIO}`);
  });
}
