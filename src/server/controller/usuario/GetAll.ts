import { Request, Response } from "express"; // Importando os tipos Request e Response do Express para tipar as requisições e respostas
import { StatusCodes } from "http-status-codes"; // Importando os códigos de status HTTP para facilitar o manuseio
import { UsuarioProvider } from "../../database/providers/usuario";

export const getAllUsuario = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Chama a função 'total' que calcula o total das colunas do caixa
    const usuarios = await UsuarioProvider.getAllUsuario();

    // Se houver erro ao calcular o total, retorna um erro no status 500
    if (usuarios instanceof Error) {
      console.error(usuarios.message); // Loga a mensagem de erro para depuração
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
          default: usuarios.message, // Mensagem de erro retornada pela função 'total'
        },
      });
      return;
    }

    // Responde com o total calculado no caixa
    res.status(StatusCodes.OK).json({
      usuarios,
    });
    return;
  } catch (error) {
    // Caso ocorra um erro inesperado, retorna um erro genérico
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: "Erro ao buscar usuarios.", // Mensagem de erro genérica
      },
    });
    return;
  }
};
