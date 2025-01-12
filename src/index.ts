import { Knex } from "./server/database/Knex";
import { app } from "./server/server";

const startServer = () => {
  app.listen(process.env.PORT || 10000, () => {
    console.log(`App rodando na porta ${process.env.PORT || 10000}`);
  });
};

if (process.env.IS_LOCALHOST !== "true") {
  console.log("Rodando migrations");

  Knex.migrate
    .latest()
    .then(() => {
      Knex.seed
        .run()
        .then(() => startServer())
        .catch(console.log);
    })
    .catch(console.log);
} else {
  startServer();
}
