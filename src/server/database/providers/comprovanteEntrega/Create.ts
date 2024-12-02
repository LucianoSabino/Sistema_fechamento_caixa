import { Knex } from "../../Knex";
import { ETableNames } from "../../ETableNames";
import { IcomprovanteEntrega } from "../../models";

export const create = async (
  teste: Omit<IcomprovanteEntrega, "id">
): Promise<number | Error> => {
  try {
    // Log para verificar o objeto sendo inserido
    console.log("Dados a serem inseridos:", teste);

    const [result] = await Knex(ETableNames.COMPROVANTEENTREGA)
      .insert(teste)
      .returning("id");

    // Log para verificar o retorno
    console.log("Resultado da inserção:", result);

    if (result && typeof result === "object" && "id" in result) {
      return result.id;
    } else if (typeof result === "number") {
      return result;
    }

    // Se nenhum ID foi retornado, lançar um erro
    return new Error("Erro ao cadastrar o registro");
  } catch (error) {
    console.error("Erro ao tentar inserir no banco:", error);
    return new Error("Erro ao cadastrar o registro");
  }
};
