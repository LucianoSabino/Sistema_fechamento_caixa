import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { ensureAuthenticated } from "../shared/middlewares";
import { UsuarioController } from "../controller";

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
export { router };
