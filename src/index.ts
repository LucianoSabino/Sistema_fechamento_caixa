import { Knex } from "./server/database/Knex";
import { app } from "./server/server";

const port = process.env.PORT || 8080;

const startServer = () => {
  app.listen(port, () => console.log(`Servidor rodando! na porta ${port}`));
};

startServer();
