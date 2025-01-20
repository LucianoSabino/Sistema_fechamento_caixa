import * as signIn from "./SignIn";
import * as signUp from "./SignUp";
import * as getAllUsuario from "./GetAll";
import * as update from "./Update";

export const UsuarioController = {
  ...signIn,
  ...signUp,
  ...getAllUsuario,
  ...update,
};
