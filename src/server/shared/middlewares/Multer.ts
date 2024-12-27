// // Importamos o multer, que é um middleware para gerenciar uploads de arquivos no Node.js
// // Também importamos o tipo FileFilterCallback para uso na configuração do multer
// import multer, { FileFilterCallback } from "multer";

// // Importamos o módulo path para manipulação de caminhos de arquivos e extensões
// import path from "path";

// // Configuração do armazenamento para os uploads
// const storage = multer.diskStorage({
//   // Define o diretório onde os arquivos serão armazenados
//   destination: (req, file, cb) => {
//     // 'uploads/' é a pasta onde os arquivos serão salvos
//     cb(null, "uploads/");
//   },
//   // Define o nome do arquivo que será salvo no servidor
//   filename: (req, file, cb) => {
//     // O nome do arquivo será a data/hora atual (em milissegundos) seguido da extensão original do arquivo
//     cb(null, `${Date.now()}${path.extname(file.originalname)}`);
//   },
// });

// // Cria uma instância do multer usando a configuração de armazenamento definida acima
// const upload = multer({
//   storage,
//   fileFilter: (req, file, cb) => {
//     const normalizedPath = path.posix.join("uploads", file.originalname);
//     console.log("Caminho normalizado:", normalizedPath); // Confirma o caminho correto
//     cb(null, true);
//   },
// });

// // Exportamos o objeto `upload` para ser utilizado em outros módulos
// export { upload };

import multer from "multer";
import path from "path";
import fs from "fs";

// Caminho da pasta "uploads"
const uploadDir = path.join(__dirname, "uploads");

// Garantir que a pasta "uploads" exista
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
  console.log('Pasta "uploads" criada com sucesso.');
}

// Configuração do armazenamento do multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Usa a pasta 'uploads' para armazenar os arquivos
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`); // Nome do arquivo com timestamp
  },
});

// Instância do multer
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    // Tipos de arquivos permitidos (exemplo: apenas imagens)
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true); // Permite o arquivo
    } else {
      // Aqui, passamos o erro corretamente com tipo 'Error' que o multer espera
      cb(new Error("Tipo de arquivo não permitido") as any, false); // Rejeita o arquivo
    }
  },
});

export { upload };
