import * as create from "./Create";
import * as getData from "./GetData";
import * as getDataComprovante from "./GetDataComprovante";
import * as getTotal from "./GetTotal";

export const EntregadorProvider = {
  ...create,
  ...getData,
  ...getDataComprovante,
  ...getTotal,
  ...getTotal,
};
