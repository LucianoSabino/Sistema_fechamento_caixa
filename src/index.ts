import { app } from "./server/server";

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Sevidor rodando na porta ${port}`));
