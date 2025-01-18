import * as create from "./Create";
import * as getByEmail from "./GetByEmail";
import * as getAll from "./GetAll";

export const UsuarioProvider = {
  ...create,
  ...getByEmail,
  ...getAll,
};
