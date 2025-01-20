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
import { TaxasController } from "../controller/taxas";

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

router.get("/usuarios", ensureAuthenticated, UsuarioController.getAllUsuario);

router.post(
  "/upadetRole",
  ensureAuthenticated,
  UsuarioController.updateRoleValidation,
  UsuarioController.update
);

router.get("/admin", ensureAuthenticated, getRoleFromToken, (req, res) => {
  res.json({ message: `Bem-vindo, admin!` });
});

// Caixa

router.post(
  "/caixa",
  ensureAuthenticated,
  CaixaController.createValidation,
  CaixaController.create
); //Criar caixa
router.get("/total", ensureAuthenticated, CaixaController.getTotalCaixa);
router.get(
  "/data",
  ensureAuthenticated,
  CaixaController.GetDataValidation,
  CaixaController.getData
);

// Entregador
router.post(
  "/entregador",
  ensureAuthenticated,
  EntregadorController.createValidationEntrega,
  EntregadorController.create
);
router.get(
  "/dataEntregador",
  ensureAuthenticated,
  EntregadorController.GetDataValidation,
  EntregadorController.getData
);

router.get(
  "/getDataComprovante",
  ensureAuthenticated,
  EntregadorController.getDataComprovante
);

router.post(
  "/comprovanteEntrega",
  ensureAuthenticated,
  upload.single("file"),
  ComprovanteEntregaController.create
);
router.get(
  "/comprovanteEntrega",
  ensureAuthenticated,
  ComprovanteEntregaController.getImg
);

router.get(
  "/totalEntrega",
  ensureAuthenticated,
  EntregadorController.getTotalEntrega
);

// Despersa
router.post(
  "/despersa",
  ensureAuthenticated,
  upload.single("file"),
  despesaController.create
);
router.get(
  "/dataDespersa",
  ensureAuthenticated,
  despesaController.GetDataValidation,
  despesaController.getData
);

router.get(
  "/totalDespersa",
  ensureAuthenticated,
  despesaController.getTotalDespersa
);

// Taxas
router.post(
  "/taxas",
  ensureAuthenticated,
  TaxasController.createValidation,
  TaxasController.update
);

router.get("/getTaxas", ensureAuthenticated, TaxasController.Get);

export { router };
