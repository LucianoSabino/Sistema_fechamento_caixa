// Inserindo um resistro no bando de dados

import { Knex } from "../../Knex";
import { ETableNames } from "../../ETableNames";
import { Icaixa } from "../../models";

export const create = async (
  caixa: Omit<Icaixa, "id">
): Promise<number | Error> => {
  try {
    const [result] = await Knex(ETableNames.CAIXA)
      .insert(caixa)
      .returning("id");

    console.log(result);
    if (typeof result === "object") {
      return result.id;
    } else if (typeof result === "number") {
      return result;
    }

    return new Error("Erro ao cadastras o registro");
  } catch (error) {
    return Error("Erro ao cadastras o registro");
  }
};
