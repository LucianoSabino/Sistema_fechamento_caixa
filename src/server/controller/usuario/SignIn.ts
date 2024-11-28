import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";
import { Iusuario } from "../../database/models";
import { UsuarioProvider } from "../../database/providers/usuario";
import { JWTService, PasswordCrypto } from "../../shared/services";

// É feito essa interface para ter uma validação mais precisa dos dados
// Ou seja caso eu não passe o nome ele vai da erro por causa do yup

// Exemplo mais simples, no caso so de baixo é exportado so por sematica mesmo. mas pode ser assim como esta comentado
// interface ICidade {
//     nome: string;
// }

interface IBodyProps extends Omit<Iusuario, "id" | "nome"> {}

export const singInValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      email: yup.string().required().email(),
      senha: yup.string().required(),
    })
  ),
}));

export const singIn = async (
  req: Request<{}, {}, IBodyProps>,
  res: Response
): Promise<void> => {
  const { email, senha } = req.body;

  const result = await UsuarioProvider.getByEmail(email);

  if (result instanceof Error) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: "Email ou senha são invalidos",
      },
    });
    return;
  }

  // Verificando a senha, pela criptografia
  const passwordMatch = await PasswordCrypto.verifyPassword(
    senha,
    result.senha
  );
  if (!passwordMatch) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: "Email ou senha são invalidos",
      },
    });
    return;
  } else {
    // Gerando o tokem
    const accessToken = JWTService.sign({ uid: result.id });

    if (accessToken === "JWT_SECRET_NOT_FOUND") {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
          default: "Erro ao gerar o Token de acesso!",
        },
      });
      return;
    }

    res.status(StatusCodes.OK).json({ accessToken });
  }
};
