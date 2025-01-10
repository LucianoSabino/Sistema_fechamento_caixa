import * as create from "./Create";
import * as getData from "./GetData";
import * as getTotal from "./GetTotal";

export const DespersaProvider = {
  ...create,
  ...getData,
  ...getTotal,
};
