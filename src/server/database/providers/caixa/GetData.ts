import { Knex } from "../../Knex"; // Instância configurada do Knex
import { ETableNames } from "../../ETableNames"; // Enum com os nomes das tabelas
import { Icaixa } from "../../models";

export const getData = async (
  dataInicio: string, // Data inicial no formato "YYYY-MM-DD"
  dataFinal: string // Data final no formato "YYYY-MM-DD"
): Promise<Icaixa[] | Error> => {
  try {
    // Busca todos os registros filtrados pelo intervalo de datas
    const result = await Knex(ETableNames.CAIXA)
      .select("*") // Seleciona todas as colunas
      .whereBetween("data", [dataInicio, dataFinal]) // Filtra pelo intervalo de datas
      .orderBy("data", "asc"); // Ordena os registros por data, do mais antigo para o mais recente

    console.log(result);
    // Verifica se algum resultado foi encontrado
    if (!result || result.length === 0) {
      return new Error("Nenhum registro encontrado para o intervalo de datas.");
    }

    return result as Icaixa[]; // Retorna os registros como uma lista de objetos
  } catch (error) {
    console.error(error);
    return new Error("Erro ao buscar os registros para o intervalo de datas.");
  }
};
