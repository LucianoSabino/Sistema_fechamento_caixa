import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import {
  getRoleFromToken,
  ensureAuthenticated,
  upload,
} from "../shared/middlewares";
import { UsuarioController } from "../controller";
import { CaixaController } from "../controller/caixa";
import { EntregadorController } from "../controller/entrega";
import { ComprovanteEntregaController } from "../controller/comprovanteEntrega";
import { despesaController } from "../controller/despersa";

const router = Router();

router.get("/", (req, res) => {
  res.send("Olá mundo!");
});

// usuario
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

router.post("/caixa", CaixaController.createValidation, CaixaController.create); //Criar caixa
router.get("/total", CaixaController.getTotalCaixa);
router.get("/data", CaixaController.GetDataValidation, CaixaController.getData);

// Entregador
router.post(
  "/entregador",
  EntregadorController.createValidationEntrega,
  EntregadorController.create
);
router.get(
  "/dataEntregador",
  EntregadorController.GetDataValidation,
  EntregadorController.getData
);

router.get("/getDataComprovante", EntregadorController.getDataComprovante);

// Teste

router.post(
  "/comprovanteEntrega",
  upload.single("file"),
  ComprovanteEntregaController.create
);
router.get("/comprovanteEntrega", ComprovanteEntregaController.getImg);

// Despersa
router.post("/despersa", upload.single("file"), despesaController.create);
router.get(
  "/dataDespersa",
  despesaController.GetDataValidation,
  despesaController.getData
);

export { router };
