import * as create from "./Create";
import * as getData from "./GetData";
import * as getDataComprovante from "./GetDataComprovante";

export const EntregadorProvider = {
  ...create,
  ...getData,
  ...getDataComprovante,
};
