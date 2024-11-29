import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { getRoleFromToken, ensureAuthenticated } from "../shared/middlewares";
import { UsuarioController } from "../controller";
import { CaixaController } from "../controller/caixa";

const router = Router();

router.get("/", (req, res) => {
  res.send("Olá mundo!");
});

//
router.post(
  "/entrar",
  UsuarioController.singInValidation,
  UsuarioController.singIn
);
router.post(
  "/cadastra",
  UsuarioController.singUpValidation,
  UsuarioController.singUp
);

router.get("/admin", ensureAuthenticated, getRoleFromToken, (req, res) => {
  res.json({ message: `Bem-vindo, admin!` });
});

// Caixa

router.post("/caixa", CaixaController.createValidation, CaixaController.create);

export { router };
