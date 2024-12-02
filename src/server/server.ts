import express from "express";
import { router } from "./routes";
import path from "path";
import cors from "cors";

const app = express();

app.use(cors());
// Servindo a pasta 'uploads' como estática
// Logando o caminho da pasta 'uploads' para verificação
const uploadsPath = path.join(__dirname, "uploads");
console.log("Caminho para a pasta de uploads: ", uploadsPath);

// Servindo a pasta 'uploads' como estática
app.use("/uploads", express.static(uploadsPath));

app.use(express.json());
app.use(router);
export { app };
