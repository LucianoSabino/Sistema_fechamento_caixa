import { Knex } from "../../Knex"; // Importa a instância configurada do Knex para interagir com o banco de dados.
import { ETableNames } from "../../ETableNames"; // Importa os nomes das tabelas definidos no projeto para evitar erros de digitação.

export const getTotal = async (): Promise<
  | {
      total: number;
      totalDinheiro: number;
      totalCartao: number;
      totalIfood: number;
      totalIfoodOnline: number;
    }
  | Error
> => {
  try {
    // Realiza a consulta no banco de dados para somar os valores de todas as colunas numéricas na tabela 'caixa'.
    const result = await Knex(ETableNames.CAIXA)
      .sum({
        totalDinheiro: "dinheiro", // Soma os valores da coluna 'dinheiro'.
        totalCartao: "cartao", // Soma os valores da coluna 'cartao'.
        totalIfoodOnline: "ifoodOnline", // Soma os valores da coluna 'ifoodOnline'.
        totalIfood: "ifood", // Soma os valores da coluna 'ifood'.
      })
      .first(); // Pega o primeiro registro do resultado, já que estamos somando todos os registros da tabela.

    // Verifica se não há resultados retornados.
    if (!result) {
      return new Error("Nenhum registro encontrado para cálculo do total.");
    }

    // Calcula o total geral:
    // Soma as receitas ('dinheiro', 'cartao', 'ifoodOnline', 'ifood') e subtrai as despesas ('despersa').
    // O operador '|| 0' garante que valores nulos sejam tratados como zero.
    const totalDinheiro = Number(result.totalDinheiro) || 0;
    const totalCartao = Number(result.totalCartao) || 0;
    const totalIfoodOnline = Number(result.totalIfoodOnline) || 0;
    const totalIfood = Number(result.totalIfood) || 0;
    const total =
      (result.totalDinheiro || 0) + // Soma total de dinheiro.
      (result.totalCartao || 0) + // Soma total de cartão.
      (result.totalIfoodOnline || 0) + // Soma total de iFood Online.
      (result.totalIfood || 0);

    console.log("Total do caixa provaider", total);
    return {
      totalDinheiro,
      totalCartao,
      totalIfood,
      totalIfoodOnline,
      total,
    }; // Retorna o total calculado como um objeto.
  } catch (error) {
    // Caso ocorra um erro na execução da query ou no processamento dos dados, exibe o erro no console.
    console.error(error);
    return new Error("Erro ao calcular o total."); // Retorna um erro genérico para o chamador da função.
  }
};
