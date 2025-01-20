import { Knex } from "./server/database/Knex";
import { app } from "./server/server";

const startServer = () => {
  app.listen(process.env.PORT || 8080, () => {
    console.log(`App rodando na porta ${process.env.PORT || 8080}`);
  });
};

const runMigrationsIfNeeded = async () => {
  try {
    console.log("Iniciando migrações...");
    await Knex.migrate.latest(); // Executa as migrações mais recentes no banco de dados PostgreSQL na nuvem
    console.log("Migrações concluídas. Iniciando o servidor...");
    startServer();
  } catch (error: any) {
    console.error("Erro ao verificar migrações:", error);
    process.exit(1);
  }
};

// Verificando se estamos no ambiente de produção ou de desenvolvimento
if (process.env.IS_LOCALHOST !== "true") {
  runMigrationsIfNeeded(); // Verifica e roda as migrações se necessário
} else {
  startServer(); // Inicia o servidor direto no ambiente local
}
