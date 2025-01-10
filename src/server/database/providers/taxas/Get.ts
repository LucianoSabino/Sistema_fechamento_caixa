import { Knex } from "../../Knex"; // Importa a instância configurada do Knex para interagir com o banco de dados.
import { ETableNames } from "../../ETableNames"; // Importa os nomes das tabelas definidos no projeto para evitar erros de digitação.

export const Get = async (): Promise<
  | {
      taxaCartao: number;
      taxaIfood: number;
      taxaIfoodOnline: number;
    }
  | Error
> => {
  try {
    // Realiza a consulta no banco de dados para selecionar os valores das colunas.
    const result = await Knex(ETableNames.TAXAS)
      .select("taxaCartao", "taxaIfood", "taxaIfoodOnline") // Seleciona as colunas desejadas sem somá-las
      .first(); // Pega o primeiro registro, já que queremos os valores específicos

    // Verifica se não há resultados retornados.
    if (!result) {
      return new Error("Nenhum registro encontrado.");
    }

    // Retorna os valores dos campos encontrados
    return {
      taxaCartao: result.taxaCartao || 1,
      taxaIfood: result.taxaIfood || 1,
      taxaIfoodOnline: result.taxaIfoodOnline || 1,
    };
  } catch (error) {
    // Caso ocorra um erro na execução da query ou no processamento dos dados, exibe o erro no console.
    console.error(error);
    return new Error("Erro ao buscar os dados.");
  }
};
