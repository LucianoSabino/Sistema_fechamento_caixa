import { Icaixa, Ientrega, Iusuario } from "../../models";

declare module "knex/types/tables" {
  interface Tables {
    usuario: Iusuario;
    caixa: Icaixa;
    entrega: Ientrega;
  }
}
