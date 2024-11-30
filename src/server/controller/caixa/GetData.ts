import { Request, Response } from "express"; // Importando os tipos Request e Response do Express para tipar as requisições e respostas
import { StatusCodes } from "http-status-codes"; // Importando os códigos de status HTTP para facilitar o manuseio
import { CaixaProvider } from "../../database/providers/caixa";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";

interface IQueryProps {
  dataInicio: string;
  dataFinal: string;
}

// Esquema de validação usando yup
const querySchema = yup.object().shape({
  dataInicio: yup.string().required(),
  dataFinal: yup.string().required(),
});

// Passando esquema diretamente para getSchema
export const GetDataValidation = validation((getSchema) => ({
  query: getSchema(querySchema),
}));

export const getData = async (
  req: Request<{}, {}, IQueryProps>,
  res: Response
): Promise<void> => {
  try {
    // Chama a função 'total' que calcula o total das colunas do caixa
    const query = req.query as unknown as IQueryProps;
    const totalCaixa = await CaixaProvider.getData(
      query.dataInicio,
      query.dataFinal
    );

    // Se houver erro ao calcular o total, retorna um erro no status 500
    if (totalCaixa instanceof Error) {
      console.error(totalCaixa.message); // Loga a mensagem de erro para depuração
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
          default: totalCaixa.message, // Mensagem de erro retornada pela função 'total'
        },
      });
      return;
    }

    // Responde com o total calculado no caixa
    res.status(StatusCodes.OK).json({
      // Total calculado das colunas no 'caixa'
      totalCaixa,
    });
    return;
  } catch (error) {
    // Caso ocorra um erro inesperado, retorna um erro genérico
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: "Erro ao calcular o total.", // Mensagem de erro genérica
      },
    });
    return;
  }
};
