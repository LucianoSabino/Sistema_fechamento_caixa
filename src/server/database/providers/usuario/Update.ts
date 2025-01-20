import { Knex } from "../../Knex"; // Instância configurada do Knex
import { ETableNames } from "../../ETableNames"; // Enum com os nomes das tabelas

export const updateRole = async (
  id: number,
  newRole: string
): Promise<boolean | Error> => {
  try {
    // Valida os valores permitidos para `role`
    const allowedRoles = ["admin", "user"];
    if (!allowedRoles.includes(newRole)) {
      return new Error(
        `O valor '${newRole}' para o role não é válido. Valores permitidos: ${allowedRoles.join(
          ", "
        )}.`
      );
    }

    // Atualiza o campo `role` no banco de dados
    const updated = await Knex(ETableNames.USUARIO)
      .update({ role: newRole })
      .where("id", id);

    // Verifica se o registro foi atualizado
    if (updated === 0) {
      return new Error(
        `Não foi possível atualizar o role. Usuário com ID ${id} não encontrado.`
      );
    }

    return true; // Atualização bem-sucedida
  } catch (error) {
    console.error(error);
    return new Error("Erro ao atualizar o role no banco de dados.");
  }
};
