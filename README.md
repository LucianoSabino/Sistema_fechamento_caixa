#### O que tem que fazer

- vincular o id do pagamento do entregador a comprovante
- fazer um jeito de verificação, se for dinheiro não precisa do comprovante

<h3 align="center"> Inicializando o Node e o Git</h3>

        npm init -y

        git init

- Comandos para o git:

      -   `git add .` : seleciona todos os arquivos
      -   `git commit -m "colocar oq esta commitando"` : Vai fazer o commit

<h3 align="center"> Instalando dependencia</h3>

        yarn add express

        yarn add -D tsc typescript ts-node

        yarn add -D @types/express @types/node

        yarn add -D nodemon

- No arquivo _package.json_ em _scripts_ e coloque:

        "dev": "nodemon --watch \"src/\" --exec \"node_modules/.bin/ts-node src/index.ts\" -e ts"

- Depois coloque:

        "compilerOptions": {
            "module": "ESNext",
            "moduleResolution": "node",
            "target": "ESNext",
            "esModuleInterop": true,
            "skipLibCheck": true,
            "strict": true
        },
        "include": [
            "src"
        ]

- Depois para inicializar o typescript:

        npx tsc --init

- Criando variavel de ambiente. Execute esse comando

      yarn add -D dotenv

depois crie um arquivo na raiz do projeto `.env`

- inicializando eslint:

        npx eslint --init

- Depois crie um arquivo com o nome:

          .gitignore

e coloque

            /node_modules
            .env_

para o git iginorar esses arquivos.

- Blibioteca para mensagem de erro:

        yarn add http-status-codes

<h3 align="center"> Biblioteca de validação YUP</h3>
Yup é um construtor de esquema para análise e validação de valor em tempo de execução.

        yarn add yup

<h5> Explicando um pouco do codigo (src/server/controller/cidade/create)</h5>

![imagem de arquitetura do projeto](https://github.com/LucianoSabino/api-typescript/blob/master/img/createValidation.png?raw=true)

Interfaces

- ICidade: Define a estrutura de um objeto que representa uma cidade. Possui as propriedades nome (nome da cidade) e estado (estado da cidade).
- IFilter: Define a estrutura de um objeto que representa um filtro. Possui a propriedade filter (critério de filtragem).
- Validação

- createValidation: Cria um esquema de validação para garantir que os dados recebidos nas requisições estejam no formato correto.
  Valida tanto o corpo da requisição (body) quanto os parâmetros da query (query).

- Corpo da requisição: Verifica se o nome da cidade possui pelo menos 3 caracteres e se o estado possui exatamente 2 caracteres.
  Parâmetros da query: Verifica se o parâmetro filter possui pelo menos 3 caracteres.

<h5>(src/server/shared/middlewares/Validation)</h5>

![imagem de arquitetura do projeto](https://github.com/LucianoSabino/api-typescript/blob/master/img/validation.png?raw=true)

Define um middleware de validação reutilizável para aplicações.

Definições de Tipos:

- TProperty: Define os possíveis locais onde a validação pode ser aplicada em uma requisição HTTP: corpo, cabeçalho, parâmetros ou query string.
- TGetSchema: Representa uma função que recebe um esquema de validação e o retorna. É usada para criar esquemas de forma dinâmica.
- TAllSchemas: Representa um objeto que mapeia cada TProperty a um esquema de validação correspondente.
- TGetAllSchema: Representa uma função que recebe uma função TGetSchema e retorna um objeto parcial do tipo TAllSchemas. É responsável por gerar os esquemas de validação para todas as partes da requisição.
- TValidation: Representa uma função que recebe uma função TGetAllSchema e retorna um middleware (RequestHandler). É a assinatura da nossa função de validação principal.

Função validation:

- Entrada: Uma função getAllSchemas para gerar esquemas de validação.
- Saída: Uma função middleware que valida requisições HTTP.

Funcionamento:

- Geração de Esquemas: Chama getAllSchemas para obter os esquemas de validação para diferentes partes da requisição.
- Inicialização do Objeto de Erros: Cria um objeto vazio errorsResult para armazenar os erros de validação.

Itera e Valida:
Valida a parte correspondente da requisição usando schema.validateSync.
Captura erros de validação e extrai as mensagens de erro.
Adiciona as mensagens de erro ao errorsResult.
Tratamento de Resultados:
Se não houver erros, chama next() para passar para o próximo middleware.
Se houver erros, retorna uma resposta com status 400 (Bad Request) e os detalhes dos erros.

<h3 align="center"> Teste para Api</h3>
Jest é um poderoso framework de testes JavaScript de código aberto
Qualque duvida esta no [video](https://youtu.be/G6Lo8wk4Y5w?si=0Lm1hyt72u474iMg)

Instale essas biblioteca:

        yarn add jest ts-jest @types/jest
        yarn add -D supertest @types/supertest

Depois inicie:

        yarn jest --init

No arquivo _jest.config.ts_ coloque:

        coverageReporters: ["json"],
        setupFilesAfterEnv: ["./tests/jest.setup.ts"],
        testMatch: ["<rootDir>/tests/**/*.test.ts"],
        transform: {
            "^.+\\.(ts|tsx)$": "ts-jest",
        },

Depois crie uma psata _tests_ dentro dela um arquivo _jest.setup.ts_ vai conter:

![imagem de arquitetura do projeto](https://github.com/LucianoSabino/api-typescript/blob/master/img/jest1.png?raw=true)

No arquivo _tsconfig.json_ depois de _compilerOptions_ coloque:

        "exclude": ["./jest.config.ts", "./node_modules", "./tests", "./build"]

Colocar no _.gitignore_:

        /coverage

- Exemplo de um teste para criar ciadade

![imagem de arquitetura do projeto](https://github.com/LucianoSabino/api-typescript/blob/master/img/test.png?raw=true)

Na hora de executar os teste rodar o comando:

        yarn test

Assim foi feito para todas as rotas.

<h3 align="center"> Deploy da API Express no Render</h3>

- Colocar isso no *package.json* em script

          "postinstall": "tsc",
          "production": "node ./build/index.js",

- Link do site rodando [Api](https://api-typescript-t76p.onrender.com)

- Site para fazer deploy [Site Render](https://render.com/)

- Qualquer duvida [Video explicativo](https://youtu.be/hgCASoTp0XY?si=q1lHVePlOiR_Jmzf)

<h3 align="center"> Banco de dados</h3>
OBS: SE atente aos caminhos dos arquivos e comandos.

<h5> Utilizando Knex.js </h5>
Knex.js é uma biblioteca para Node.js que facilita a interação com bancos de dados relacionais. Em outras palavras, ele é um query builder, ou seja, uma ferramenta que constrói consultas SQL de forma mais intuitiva e organizada, eliminando a necessidade de escrever as consultas manualmente.

- Instalando as blibioteca:

        yarn add knex

<h5> Utilizando o banco de dados Sqlite </h5>

- Instalando as blibioteca:

        yarn add sqlite3

  <h5>No arquivo _database/Knex/knexfile.ts_ esta as configuração de conexão do banco de dados.</h5>

![imagem de arquitetura do projeto](https://github.com/LucianoSabino/api-typescript/blob/master/img/knexC.png?raw=true)

Tendo tres tipos de conexão

- test so para quando for rodar os testes assim os dados seram apagados depois
- Produção quando estiver no servidor
- Desenvolvimento

  <h5>No arquivo _database/Knex/index.ts_ esta passando as configuração de conexão e alternando entre elas</h5>

![imagem de arquitetura do projeto](https://github.com/LucianoSabino/api-typescript/blob/master/img/knexCIndex.png?raw=true)

<h5> Fazendo as migrações </h5>

- Execute esse comando para criar um arquivo de migração:

        yarn knex --knexfile ./src/server/database/Knex/knexfile.ts migrate:make test

Esse _test_, pode ser qualquer nome.

Deve aparecer um arquivo dentro da pastra de _database/migrations_: Caso não tenha criar uma

Depois so fazer as configurações de tabelas, Exemplo:

![imagem de arquitetura do projeto](https://github.com/LucianoSabino/api-typescript/blob/master/img/extable.png?raw=true)

Depois no arquivo _package.json_ coloque:

        "knex:rollback-all": "knex --knexfile ./src/server/database/Knex/knexfile.ts migrate:rollback --all",
        "knex:rollback": "knex --knexfile ./src/server/database/Knex/knexfile.ts migrate:rollback",
        "knex:migrate": "knex --knexfile ./src/server/database/Knex/knexfile.ts migrate:latest",
        "knex:seed": "knex --knexfile ./src/server/database/Knex/knexfile.ts seed:run",

Depois so rodar o comando e sera criado a tabela com as informações:

        yarn knex:migrate

- Foi criado uma pasta _models_ dentro de _server_ e colocado só a interfeice: caminho correto _server/models/Cidade.ts_

        export interface Icidade {
            id: number;
            nome: string;
        }

Depois exprotado no index: caminho _server/models/index.ts_

        export * from "./Cidade";

- Depois foi criado uma uma pasta dentro de _server/Knex/@types/knex.d.ts_ e colocado:

        import { Icidade } from "../../models";

        declare module "knex/types/tables" {
            interface Tables {
                cidade: Icidade;
            }
        }

<h5>Inserindo dados no banco</h5>

- Foi criado uma pasta _server/providers/cidade/Create.ts_ onde vai ficar responsavel por toda parte de inserir dados no banco de dados. Assim quando quiser trocar de ORM é so modificar esse aquivo.

O codigo ficou assim

![imagem de arquitetura do projeto](https://github.com/LucianoSabino/api-typescript/blob/master/img/inserindoDados.png?raw=true)

no arquivo index foi feito a exportação _server/providers/cidade/index.ts_

        import * as create from "./Create";
        export const CidadeProvider = {
            ...create,
        }

Depois foi feito a modificação no _controller/cidade/Create.ts_ ficando assim para salva as cidades no banco.

![imagem de arquitetura do projeto](https://github.com/LucianoSabino/api-typescript/blob/master/img/eee.png?raw=true)

<h5>Foi feita uma alteração na pasta testes: *test/cidade/jest.setup.ts</h5>
- Como ao rodar test esta criando um banco de dados em menoria, então é necessario rodar uma migração especifica para isso.

            beforeAll(async () => {
                await Knex.migrate.latest();
            });

            afterAll(async () => {
                await Knex.destroy();
            });

<h5>Como ficou o resto providers cidade : *dataabase/providers/cidade/ "Count, DeleteByid, GetAll, GetById, UpdateById".ts*</h5>

_Obs:_ Tambem tem alteração na respequetivas pastas na parte de _controller/cidade_ para o funcionamento.

- Count

![imagem de arquitetura do projeto](https://github.com/LucianoSabino/api-typescript/blob/master/img/count.png?raw=true)

- DeleteById

![imagem de arquitetura do projeto](https://github.com/LucianoSabino/api-typescript/blob/master/img/deletebyid.png?raw=true)

- GetAll

![imagem de arquitetura do projeto](https://github.com/LucianoSabino/api-typescript/blob/master/img/getall.png?raw=true)

- GetById

![imagem de arquitetura do projeto](https://github.com/LucianoSabino/api-typescript/blob/master/img/getbyid.png?raw=true)

- UpdateById

![imagem de arquitetura do projeto](https://github.com/LucianoSabino/api-typescript/blob/master/img/updatebyid.png?raw=true)

<h5>Foi alterado index de *src/index.ts</h5>

- Assim quando a aplicação estiver em produção criar uma migratio, ou seja uma tabela no sevidor.

![imagem de arquitetura do projeto](https://github.com/LucianoSabino/api-typescript/blob/master/img/index.png?raw=true)

- Foi adiciomado no arquivo _.env_

        IS_LOCALHOST=true

<h5>Inserindo cidade altomatica *server/database/seeds/0000_insert_cidade.ts*</h5>

- O nome _0000_insert_cidade.ts_ foi colocado manualmente, nele conterar o codigo para inserir todos as cidades da Bahia.

- É feita uma validação com count para quer, se ouver alguna cidade no banco não se cadastrada nem uma desse arry.

![imagem de arquitetura do projeto](https://github.com/LucianoSabino/api-typescript/blob/master/img/seed.png?raw=true)

- Tambem feito alteração em _src/index.ts_, fazendo com que ele insira as cidades altomaticamente

        if (process.env.IS_LOCALHOST !== "true") {
            Knex.migrate
                .latest()
                .then(() => {
                    Knex.seed
                        .run()
                        .then(() => startServer())
                        .catch(console.log);
                })
                .catch(console.log);
        } else {
            startServer();
        }

<h3 align="center"> Parte de pessoa </h3>

- Foi criado a migration de pessoa _0001_creat_pessoa.ts_ e a unica diferença foi a parte da ligação com a tabela de cidade, ficando assim:

        table.bigInteger("cidadeId").index().notNullable().references("id").inTable(ETableNames.CIDADE).onUpdate("CASCADE").onDelete("RESTRICT");

![imagem de arquitetura do projeto](https://github.com/LucianoSabino/api-typescript/blob/master/img/migrationpessoa.png?raw=true)

- Alem de acrecentar os outros campos como na interface _database/models/Pessoa.ts_:

        export interface IPessoa {
            id: number;
            email: string;
            cidadeId: number;
            nomeCompleto: string;
        }

Depois é só rodar o comando

        yarn knex:migrate

- Alem de ter adicionado no _database/seeds_:

        PESSOA = "pessoa",

<h5>O Resto foi bem paracido com que foi feito com cidade, provaid e controller</h5>

<h3 align="center"> Controler de usuario </h3>

- Foi feito o models

        export interface Iusuario {
            id: number;
            email: string;
            senha: string;
            nome: string;
        }

- Depois a migrations

![imagem de arquitetura do projeto](https://github.com/LucianoSabino/api-typescript/blob/master/img/migrationusuario.png?raw=true)

- Depois a exportação no _database/Knex/@types/knex.d.ts_

      import { Icidade, Ipessoa, Iusuario } from "../../models";

      declare module "knex/types/tables" {
          interface Tables {
              cidade: Icidade;
              pessoa: Ipessoa;
              usuario: Iusuario;
          }
      }

- Feito os providers _OBS: Sem a altenticação do token_

Create
![imagem de arquitetura do projeto](https://github.com/LucianoSabino/api-typescript/blob/master/img/createusuario.png?raw=true)

GetByEmail
![imagem de arquitetura do projeto](https://github.com/LucianoSabino/api-typescript/blob/master/img/getbyusuario.png?raw=true)

- Depois o controller, segue as mesma coisa de cidade e pessao

No SignIn é feita a parte de login, comparação de senha e email
![imagem de arquitetura do projeto](https://github.com/LucianoSabino/api-typescript/blob/master/img/signin.png?raw=true)

No SignUp é feita a parte de criar usuario
![imagem de arquitetura do projeto](https://github.com/LucianoSabino/api-typescript/blob/master/img/signup.png?raw=true)

- Depois é so fazer as rotas

<h5>_Cripitografia de Senha_</h5>
É diferente do TOKEN

- Adicionar a biblioteca

        yarn add bcryptjs
        yarn add @types/bcryptjs -D

- Como é um arquivo que vai ser utilizado em toda aplicação ele esta em _database/shared/services/PasswordCrypto.ts_
- Basicamente para criptografa a senha é so isso:

![imagem de arquitetura do projeto](https://github.com/LucianoSabino/api-typescript/blob/master/img/criptografia.png?raw=true)

- Agora no _database/providers/usuario/Create.ts_ é so adicionar isso :

        const hashedPassword = await PasswordCrypto.hashPassword(usuario.senha);
        usuario.senha = hashedPassword;

Isso que dizer que antes de salvar o usuario, criptogarfa a senha e depois salva no banco de dados.

- Foi modificado tbm no _server/controller/usuario/SignIn.ts_, para verificar a senha pela criptografia.

![imagem de arquitetura do projeto](https://github.com/LucianoSabino/api-typescript/blob/master/img/criptografiasignin.png?raw=true)

<h5>_Fazendo a parte de validação com TOKEN e JWT_</h5>

- Adicionar a biblioteca

        yarn add jsonwebtoken
        yarn add @types/jsonwebtoken -D

- Como é um arquivo que vai ser utilizado em toda aplicação ele esta em _database/shared/middlewares/ensureAuthenticated.ts_, nesse arquivo vai ser resposavel por fazer a verificação do Token

![imagem de arquitetura do projeto](https://github.com/LucianoSabino/api-typescript/blob/master/img/jwt.png?raw=true)

- Agora no arquivo _database/shared/services/JWTService.ts_, cria o Token

![imagem de arquitetura do projeto](https://github.com/LucianoSabino/api-typescript/blob/master/img/jwtser.png?raw=true)

- Agora no arquivo de _database/controller/usuario/SignIn.ts_, so foi alterado a parte de _else_ que chama a função de criar um token, fica assim:

        else {
            // Gerando o tokem
            const accessToken = JWTService.sign({ uid: result.id });

            if (accessToken === "JWT_SECRET_NOT_FOUND") {
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                    errors: {
                        default: "Erro ao gerar o Token de acesso!",
                    },
                });
                return;
            }

            res.status(StatusCodes.OK).json({ accessToken });
        }

<h3 align="center"> Configuração para o banco de dados em deploy/Produção </h3>

- Vai ser utilizado o postgresql

- adicionando a biblioteca

        yarn add pg
        yarn add @types/pg -D

- Foi alterado no arquivo _database/Knex/knexfile.ts_, foi modificado a parte de produção ficando assim:

![imagem de arquitetura do projeto](https://github.com/LucianoSabino/api-typescript/blob/master/img/bancoproducao.png?raw=true)

- Alem do arquivo index _database/Knex/index.ts_

![imagem de arquitetura do projeto](https://github.com/LucianoSabino/api-typescript/blob/master/img/indexproducao.png?raw=true)

<h5>Esta cendo utelizado um banco em nuvem</h5>

- Link do [tembo](https://tembo.io/docs/product/cloud/billing/)
- Duvida so ver o [video](https://youtu.be/5WkgKsoRYZw?si=ewlTg6ZmiijknUJp)

_Obs:_ Prestar atenção nas variaveis de anviente.

<h3 align="center"> Usando Cors </h3>

- Usada para facilitar no front-end
- Restrige so o frent-end que vc quer acesse sua api

- Adicionando a biblioteca

        yarn add cors
        yarn add @types/cors -D

- Basicamente é so ir no arquivo _server/server.ts_ e colocar

        import cors from "cors";
        app.use(
            cors({
                origin: process.env.ENABLED_CORS?.split(";") || [],
            })
        );

<h3 align="center"> Conectando api com front-end </h3>
