import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";
import { Idespersa } from "../../database/models";
import { DespersaProvider } from "../../database/providers/despersa";

interface IBodyProps extends Omit<Idespersa, "id" | "src"> {
  valorDespersa: number;
}

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      valorDespersa: yup.number().required(),
      usuarioId: yup.string().required(),
    })
  ),
}));

export const create = async (
  req: Request<{}, {}, IBodyProps>,
  res: Response
) => {
  const { valorDespersa } = req.body;
  const file = req.file;
  const usuarioId = req.body.usuarioId;

  if (!file) {
    res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        src: "Arquivo não encontrado.",
      },
    });
    return;
  }

  const result = await DespersaProvider.create({
    valorDespersa,
    src: file.path.replace(/\\/g, "/"),
    // src: `/uploads/${file.filename}`,
    usuarioId,
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
