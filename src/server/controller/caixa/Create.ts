import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";
import { Icaixa } from "../../database/models";
import { CaixaProvider } from "../../database/providers/caixa";

interface IBodyProps extends Omit<Icaixa, "id"> {}

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      dinheiro: yup.string().required(),
      cartao: yup.string().required(),
      ifoodOnline: yup.string().required(),
      ifood: yup.string().required(),
      despersa: yup.string().required(),
      usuarioId: yup.number().required(),
    })
  ),
}));

export const create = async (
  req: Request<{}, {}, IBodyProps>,
  res: Response
) => {
  const usuario = req.body.usuarioId;
  const result = await CaixaProvider.create(req.body);

  if (result instanceof Error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  res.status(StatusCodes.CREATED).json(result);
};
