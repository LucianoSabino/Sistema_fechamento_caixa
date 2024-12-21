import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";
import { Idespersa } from "../../database/models";
import { DespersaProvider } from "../../database/providers/despersa";

interface IBodyProps extends Omit<Idespersa, "id" | "src"> {
  despersa: string;
}

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      despersa: yup.string().required(),
    })
  ),
}));

export const create = async (
  req: Request<{}, {}, IBodyProps>,
  res: Response
) => {
  const { despersa } = req.body;
  const file = req.file;

  if (!file) {
    res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        src: "Arquivo não encontrado.",
      },
    });
    return;
  }

  const result = await DespersaProvider.create({
    despersa,
    src: file.path.replace(/\\/g, "/"),
  });

  if (result instanceof Error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  res.status(StatusCodes.CREATED).json(result);
};
