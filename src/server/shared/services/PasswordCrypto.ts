import { compare, genSalt, hash } from "bcryptjs";

// Complexidade da senha
const PASSWORD_SALT = 8;

const hashPassword = async (password: string) => {
  // Gera uma sere de caractere aleatorio
  const saltGenerated = await genSalt(PASSWORD_SALT);

  // Aqui criptografa a senhaa
  return await hash(password, saltGenerated);
};

const verifyPassword = async (password: string, hashedPassword: string) => {
  return await compare(password, hashedPassword);
};

export const PasswordCrypto = {
  hashPassword,
  verifyPassword,
};
