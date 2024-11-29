// authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import { JWTService } from "../services"; // Importa o serviço JWT, responsável por verificar e decodificar o token

// Middleware que será utilizado para obter e verificar a role do usuário a partir do token JWT
export const getRoleFromToken = (
  req: Request, // Requisição do Express
  res: Response, // Resposta do Express
  next: NextFunction // Função que permite passar o controle para o próximo middleware ou rota
) => {
  // 1. Recupera o token JWT do cabeçalho Authorization
  const token = req.headers.authorization?.split(" ")[1]; // O token normalmente vem no formato "Bearer <token>", então usamos o split para pegar o token após o "Bearer".

  // 2. Verifica se o token foi fornecido
  if (!token) {
    // Se não houver token, retorna um erro 401 (não autorizado)
    res.status(401).json({
      errors: {
        default: "Token não fornecido.", // Mensagem de erro
      },
    });
    return;
  }

  // 3. Decodifica o token utilizando o serviço JWTService
  const decoded = JWTService.verify(token);

  // 4. Verifica se o token é inválido ou se houve algum erro na decodificação
  if (decoded === "JWT_SECRET_NOT_FOUND") {
    // Caso o token seja inválido ou não encontrado, retorna um erro 401
    res.status(401).json({
      errors: {
        default: "Token inválido.", // Mensagem de erro
      },
    });
    return;
  }

  // 5. Acessa a propriedade `role` no objeto decodificado (a role deve ser "admin" ou "user")
  const userRole = (decoded as { role: "admin" | "user" }).role;

  // 6. Verifica qual é a role do usuário no token
  if (userRole === "admin") {
    // Se a role for "admin", adiciona a role ao objeto `req` para uso posterior
    next();
  } else if (userRole === "user") {
    // Se a role for "user", adiciona a role ao objeto `req` para uso posterior
    res.status(403).json({
      errors: {
        default: "Usuario não permitido.", // Mensagem de erro
      },
    });
    return;
  } else {
    // Caso a role não seja nem "admin" nem "user", retorna um erro 403 (acesso proibido)
    res.status(403).json({
      errors: {
        default: "Role inválida no token.", // Mensagem de erro
      },
    });
    return;
  }

  // 7. Chama o próximo middleware ou a rota após verificar a role
};
