import { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export async function up(knex: Knex) {
  return knex.schema
    .createTable(ETableNames.DESPERSA, (table) => {
      table.bigIncrements("id").primary().index();
      table.string("despersa").index().notNullable();
      table.string("src").index().notNullable();
      table.date("data").defaultTo(knex.raw("CURRENT_DATE")).notNullable(); // Apenas a data (YYYY-MM-DD)
    })
    .then(() => {
      console.log(`# Create table ${ETableNames.DESPERSA}`);
    });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(ETableNames.DESPERSA).then(() => {
    console.log(`# Drop table ${ETableNames.DESPERSA}`);
  });
}
