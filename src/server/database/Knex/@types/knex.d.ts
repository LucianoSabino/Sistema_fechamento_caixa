import {
  Icaixa,
  Ientrega,
  IcomprovanteEntrega,
  Iusuario,
  Idespersa,
  Itaxas,
} from "../../models";

declare module "knex/types/tables" {
  interface Tables {
    usuario: Iusuario;
    caixa: Icaixa;
    entrega: Ientrega;
    comprovanteEntrega: IcomprovanteEntrega;
    despersa: Idespersa;
    taxas: Itaxas;
  }
}
