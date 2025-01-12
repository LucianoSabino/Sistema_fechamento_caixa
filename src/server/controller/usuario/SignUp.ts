import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";
import { Iusuario } from "../../database/models";
import { UsuarioProvider } from "../../database/providers/usuario";

// É feito essa interface para ter uma validação mais precisa dos dados
// Ou seja caso eu não passe o nome ele vai da erro por causa do yup

// Exemplo mais simples, no caso so de baixo é exportado so por sematica mesmo. mas pode ser assim como esta comentado
// interface ICidade {
//     nome: string;
// }

interface IBodyProps extends Omit<Iusuario, "id"> {}

export const singUpValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      nome: yup.string().required().min(3).max(150),
      email: yup.string().required().email(),
      senha: yup.string().required(),
      role: yup.string().required(),
    })
  ),
}));

export const singUp = async (
  req: Request<{}, {}, IBodyProps>,
  res: Response
): Promise<void> => {
  console.log(req.body);
  const result = await UsuarioProvider.create(req.body);
  console.log(result);
  if (result instanceof Error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
    return;
  }

  res.status(StatusCodes.CREATED).json(result);
};
