import { Knex } from "../../Knex"; // Importa a instância configurada do Knex para interagir com o banco de dados.
import { ETableNames } from "../../ETableNames"; // Importa os nomes das tabelas definidos no projeto para evitar erros de digitação.

export const getTotal = async (): Promise<
  | {
      totalValorDespersa: number;
    }
  | Error
> => {
  try {
    // Realiza a consulta no banco de dados para somar os valores de todas as colunas numéricas na tabela 'caixa'.
    const result = await Knex(ETableNames.DESPERSA)
      .sum({
        totalValorDespersa: "valorDespersa", // Soma os valores da coluna 'valorDespersa'.
      })
      .first(); // Pega o primeiro registro do resultado, já que estamos somando todos os registros da tabela.

    // Verifica se não há resultados retornados.
    if (!result) {
      return new Error("Nenhum registro encontrado para cálculo do total.");
    }

    // Calcula o total geral:
    // Soma as receitas ('dinheiro', 'cartao', 'ifoodOnline', 'ifood') e subtrai as despesas ('despersa').
    // O operador '|| 0' garante que valores nulos sejam tratados como zero.
    const totalValorDespersa = Number(result.totalValorDespersa) || 0;
    return {
      totalValorDespersa,
    }; // Retorna o total calculado como um objeto.
  } catch (error) {
    // Caso ocorra um erro na execução da query ou no processamento dos dados, exibe o erro no console.
    console.error(error);
    return new Error("Erro ao calcular o total."); // Retorna um erro genérico para o chamador da função.
  }
};
