import * as create from "./Create";
import * as getTotal from "./GetTotal";
import * as getData from "./GetData";

export const CaixaProvider = {
  ...create,
  ...getTotal,
  ...getData,
};
