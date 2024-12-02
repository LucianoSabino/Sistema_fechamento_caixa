import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";
import { IcomprovanteEntrega } from "../../database/models";
import { ComprovanteEntregaProvider } from "../../database/providers/comprovanteEntrega";

interface IBodyProps extends Omit<IcomprovanteEntrega, "id" | "src"> {
  nome: string;
}

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      nome: yup.string().required(),
    })
  ),
}));

// Função 'create' sem retorno explícito de Response
export const create = async (
  req: Request<{}, {}, IBodyProps>,
  res: Response
): Promise<void> => {
  const { nome } = req.body;
  const file = req.file;

  console.log(nome);
  console.log(file);

  if (!file) {
    res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        src: "Arquivo não encontrado.",
      },
    });
    return;
  }

  const result = await ComprovanteEntregaProvider.create({
    nome,
    src: file.path.replace(/\\/g, "/"),
  });

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
