import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";
import { UsuarioProvider } from "../../database/providers/usuario"; // Função de atualização no banco

// Interface para o corpo da requisição
interface IBodyProps {
  id: string;
  role: string;
}

// Esquema de validação usando yup
const bodySchema = yup.object().shape({
  id: yup.string().required("O ID é obrigatório."),
  role: yup
    .string()
    .oneOf(["admin", "user"], "O role deve ser 'admin' ou 'user'.")
    .required("O role é obrigatório."),
});

// Middleware de validação
export const updateRoleValidation = validation((getSchema) => ({
  body: getSchema(bodySchema), // Valida o corpo da requisição
}));

// Controlador para atualizar o role
export const update = async (
  req: Request<{}, {}, IBodyProps>,
  res: Response
): Promise<void> => {
  const { id, role } = req.body; // Extrai o ID e o role do corpo da requisição

  try {
    // Chama a função de atualização no banco de dados
    const result = await UsuarioProvider.updateRole(Number(id), role);

    if (result instanceof Error) {
      // Retorna erro caso o ID não seja encontrado ou outro erro ocorra
      res.status(StatusCodes.BAD_REQUEST).json({
        errors: {
          default: result.message,
        },
      });
      return;
    }

    // Retorna sucesso
    res
      .status(StatusCodes.OK)
      .json({ message: "Role atualizado com sucesso!" });
    return;
  } catch (error) {
    console.error(error);

    // Retorna erro interno do servidor em caso de falha inesperada
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: "Erro ao atualizar o role.",
      },
    });
    return;
  }
};
