import { Knex } from "../../Knex";
import { ETableNames } from "../../ETableNames";
import { Itaxas } from "../../models";

export const update = async (
  taxas: Partial<Omit<Itaxas, "id">>
): Promise<boolean | Error> => {
  try {
    const result = await Knex(ETableNames.TAXAS).update(taxas);

    // Verifica se algum registro foi atualizado
    if (result > 0) {
      return true;
    }

    return new Error("Registro não encontrado ou não atualizado");
  } catch (error) {
    console.error(error);
    return new Error("Erro ao atualizar o registro");
  }
};
