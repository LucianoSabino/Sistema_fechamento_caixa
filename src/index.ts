// import { Knex } from "./server/database/Knex";
// import { app } from "./server/server";

// const startServer = () => {
//   app.listen(process.env.PORT || 8080, () => {
//     console.log(`App rodando na porta ${process.env.PORT || 8080}`);
//   });
// };

// if (process.env.IS_LOCALHOST !== "true") {
//   console.log("Rodando migrations");

//   Knex.migrate
//     .latest()
//     .then(() => startServer())
//     .catch(console.log);
// } else {
//   startServer();
// }

import { Knex } from "./server/database/Knex";
import { app } from "./server/server";

const startServer = () => {
  app.listen(process.env.PORT || 8080, () => {
    console.log(`App rodando na porta ${process.env.PORT || 8080}`);
  });
};

const runMigrationsIfNeeded = async () => {
  try {
    const [latestMigration] = await Knex("knex_migrations")
      .orderBy("id", "desc")
      .limit(1);

    if (latestMigration) {
      console.log("Migrações já foram aplicadas. Iniciando o servidor...");
      startServer();
    } else {
      console.log("Rodando migrações...");
      await Knex.migrate.latest();
      console.log("Migrações concluídas. Iniciando o servidor...");
      startServer();
    }
  } catch (error: any) {
    // Caso a tabela knex_migrations ainda não exista ou ocorra outro erro
    if (
      error.code === "SQLITE_ERROR" ||
      error.message.includes("no such table")
    ) {
      console.log(
        "Tabela de migrações não encontrada. Executando migrações..."
      );
      await Knex.migrate.latest();
      startServer();
    } else {
      console.error("Erro ao verificar migrações:", error);
      process.exit(1);
    }
  }
};

if (process.env.IS_LOCALHOST !== "true") {
  runMigrationsIfNeeded();
} else {
  startServer();
}
