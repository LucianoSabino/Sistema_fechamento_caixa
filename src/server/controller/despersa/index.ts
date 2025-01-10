import * as create from "./Create";
import * as getdata from "./GetData";
import * as getTotal from "./GetTotal";

export const despesaController = {
  ...create,
  ...getdata,
  ...getTotal,
};
