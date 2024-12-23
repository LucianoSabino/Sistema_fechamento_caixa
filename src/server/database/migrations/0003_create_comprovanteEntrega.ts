import { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export async function up(knex: Knex) {
  return knex.schema
    .createTable(ETableNames.COMPROVANTEENTREGA, (table) => {
      table.bigIncrements("id").primary().index();
      table.string("src").index().notNullable();
      table
        .bigInteger("usuarioId")
        .index()
        .notNullable()
        .references("id")
        .inTable(ETableNames.USUARIO)
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");
      table
        .bigInteger("entregaId")
        .index()
        .notNullable()
        .references("id")
        .inTable(ETableNames.ENTREGA)
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");
      table.date("data").defaultTo(knex.raw("CURRENT_DATE")).notNullable(); // Apenas a data (YYYY-MM-DD)
    })
    .then(() => {
      console.log(`# Create table ${ETableNames.COMPROVANTEENTREGA}`);
    });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(ETableNames.COMPROVANTEENTREGA).then(() => {
    console.log(`# Drop table ${ETableNames.COMPROVANTEENTREGA}`);
  });
}
