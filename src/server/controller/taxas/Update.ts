import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";
import { Itaxas } from "../../database/models";
import { TaxasProvider } from "../../database/providers/taxas";

interface IBodyProps extends Omit<Itaxas, "id"> {}

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      taxaCartao: yup.number().required(),
      taxaIfood: yup.number().required(),
      taxaIfoodOnline: yup.number().required(),
      despersaMes: yup.number().required(),
    })
  ),
}));

export const update = async (
  req: Request<{}, {}, IBodyProps>,
  res: Response
) => {
  const result = await TaxasProvider.update(req.body);
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
