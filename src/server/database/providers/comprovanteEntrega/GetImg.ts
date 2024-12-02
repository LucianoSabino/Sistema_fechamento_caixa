import { Knex } from "../../Knex"; // Instância configurada do Knex
import { ETableNames } from "../../ETableNames"; // Enum com os nomes das tabelas
import { IcomprovanteEntrega } from "../../models";

export const getImg = async (): Promise<IcomprovanteEntrega[] | Error> => {
  try {
    // Busca todos os registros filtrados pelo intervalo de datas
    const result = await Knex(ETableNames.COMPROVANTEENTREGA).select("*"); // Seleciona todas as colunas  // Ordena os registros por data, do mais antigo para o mais recente

    console.log(result);
    // Verifica se algum resultado foi encontrado
    if (!result || result.length === 0) {
      return new Error("Nenhum registro de imagem, encontrado!");
    }

    const port = process.env.PORT || 8080;

    const imagesWithUrls = result.map((image) => ({
      ...image,
      src: `http://localhost:${port}/${image.src.replace("\\", "/")}`,
    }));

    return imagesWithUrls as IcomprovanteEntrega[]; // Retorna os registros como uma lista de objetos
  } catch (error) {
    console.error(error);
    return new Error("Erro ao buscar imagens no banco.");
  }
};
