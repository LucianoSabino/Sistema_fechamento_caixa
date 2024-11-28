import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { Schema, ValidationError } from "yup";

type TProperty = "body" | "header" | "params" | "query";

type TGetSchema = <T>(schema: Schema<T>) => Schema<T>;

type TAllSchemas = Record<TProperty, Schema<any>>;

type TGetAllSchema = (getSchema: TGetSchema) => Partial<TAllSchemas>;

type TValidation = (getAllSchemas: TGetAllSchema) => RequestHandler;

export const validation: TValidation =
  (getAllSchemas) => async (req, res, next) => {
    const schema = getAllSchemas((schema) => schema);
    const errorsResult: Record<string, Record<string, string>> = {};

    Object.entries(schema).forEach(([key, schema]) => {
      try {
        schema.validateSync(req[key as TProperty], {
          abortEarly: false,
        });
      } catch (error) {
        const yupError = error as ValidationError;
        const validatonErrors: Record<string, string> = {};

        yupError.inner.forEach((error) => {
          if (!error.path) return;

          validatonErrors[error.path] = error.message;
        });

        errorsResult[key] = validatonErrors;
      }
    });

    if (Object.entries(errorsResult).length == 0) {
      return next();
    } else {
      res.status(StatusCodes.BAD_REQUEST).json({
        Message: { Error: errorsResult },
      });
    }
  };
