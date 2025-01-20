import * as create from "./Create";
import * as getByEmail from "./GetByEmail";
import * as getAll from "./GetAll";
import * as updateRole from "./Update";

export const UsuarioProvider = {
  ...create,
  ...getByEmail,
  ...getAll,
  ...updateRole,
};
