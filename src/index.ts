import { Knex } from "./server/database/Knex";
import { app } from "./server/server";

const startServer = () => {
  app.listen(process.env.PORT || 8080, () => {
    console.log(`App rodando na porta ${process.env.PORT || 8080}`);
  });
};

if (process.env.IS_LOCALHOST !== "true") {
  console.log("Rodando migrations");

  Knex.migrate
    .latest()
    .then(() => startServer())
    .catch(console.log);
} else {
  startServer();
}
