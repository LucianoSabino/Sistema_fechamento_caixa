import { Knex } from "../../Knex"; // Instância configurada do Knex
import { ETableNames } from "../../ETableNames"; // Enum com os nomes das tabelas
import { Iusuario } from "../../models";

export const getAllUsuario = async (): Promise<Iusuario[] | Error> => {
  try {
    // Busca todos os registros da tabela
    const result = await Knex(ETableNames.USUARIO).select("*"); // Seleciona todas as colunas

    console.log(result);
    // Verifica se algum resultado foi encontrado
    if (!result || result.length === 0) {
      return new Error("Nenhum registro encontrado.");
    }

    return result as unknown as Iusuario[]; // Retorna os registros como uma lista de objetos
  } catch (error) {
    console.error(error);
    return new Error("Erro ao buscar os registros.");
  }
};
