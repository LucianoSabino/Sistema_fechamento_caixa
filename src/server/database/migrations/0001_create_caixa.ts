// import { Knex } from "knex";
// import { ETableNames } from "../ETableNames";

// export async function up(knex: Knex) {
//   return knex.schema
//     .createTable(ETableNames.CAIXA, (table) => {
//       table.bigIncrements("id").primary().index();
//       table.decimal("dinheiro", 10, 2).notNullable();
//       table.decimal("cartao", 10, 2).notNullable();
//       table.decimal("ifoodOnline", 10, 2).notNullable();
//       table.decimal("ifood", 10, 2).notNullable();

//       // Vinculação com a tabela usuario
//       table
//         .bigInteger("usuarioId")
//         .index()
//         .notNullable()
//         .references("id")
//         .inTable(ETableNames.USUARIO)
//         .onUpdate("CASCADE")
//         .onDelete("RESTRICT");
//       table.date("data").defaultTo(knex.raw("CURRENT_DATE")).notNullable(); // Apenas a data (YYYY-MM-DD)

//       table.comment("Tabela usada para armazenar caixa no sistema");
//     })
//     .then(() => {
//       console.log(`# Create table ${ETableNames.CAIXA}`);
//     });
// }

// export async function down(knex: Knex) {
//   return knex.schema.dropTable(ETableNames.CAIXA).then(() => {
//     console.log(`# Drop table ${ETableNames.CAIXA}`);
//   });
// }

import { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export async function up(knex: Knex) {
  return knex.schema
    .createTable(ETableNames.CAIXA, (table) => {
      table.bigIncrements("id").primary().index();
      table.float("dinheiro", 10, 2).notNullable(); // Altera para `float`
      table.float("cartao", 10, 2).notNullable(); // Altera para `float`
      table.float("ifoodOnline", 10, 2).notNullable(); // Altera para `float`
      table.float("ifood", 10, 2).notNullable(); // Altera para `float`

      // Vinculação com a tabela usuario
      table
        .bigInteger("usuarioId")
        .index()
        .notNullable()
        .references("id")
        .inTable(ETableNames.USUARIO)
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");
      table.date("data").defaultTo(knex.raw("CURRENT_DATE")).notNullable(); // Apenas a data (YYYY-MM-DD)

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
