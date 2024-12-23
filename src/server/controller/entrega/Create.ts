import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";
import { Ientrega } from "../../database/models";
import { EntregadorProvider } from "../../database/providers/entrega";

interface IBodyProps extends Omit<Ientrega, "id"> {}

export const createValidationEntrega = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      nomeEntregador: yup.string().required(),
      dinheiro: yup.string().required(),
      cartao: yup.string().required(),
      quantidaEntrega: yup.string().required(),
      valorEntregaDinheiro: yup.string().required(),
      valorEntregaPix: yup.string().required(),
      usuarioId: yup.string().required(),
    })
  ),
}));

export const create = async (
  req: Request<{}, {}, IBodyProps>,
  res: Response
) => {
  console.log(req.body);
  const result = await EntregadorProvider.create(req.body);
  console.log(result);

  if (result instanceof Error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  res.status(StatusCodes.CREATED).json(result);
};
