por enquanto não é para ficar bonito, mas apenas para anotar algumas coisas.

1. index.js é onde está configurado o servidor, o servidor está bonitamente funcionando e ok.

2. dataBaseConnection.js lá é estabelecido a conexão com o banco de dados e o .env usando sequelize, essa conexão nos permite fazer as requisições crud dentro das tabelas do nosso banco de dados feito isoladamente em MySQL.

3. Dentro de dataBaseConnection.js criamos uma função que vai dentro do index.js para exibir uma mensagem caso o servidor estiver rodando, ela será exibida junto com a do servidor, todos os dois arquivos:

- index.js
- dataBaseConnection.js

estão bem configurados e rodando corretamente, mas, esteja ciente que são os arquivos mais importantes do backend.

- models: a pasta models, terá os "modelos" que basicamente são as tabelas dentro do nosso banco de dados. Cada arquivo dentro desta pasta possui fields, que correspondem as colunas de uma tabela.

- controllers: a pasta controllers, terá as requisições de cada tabela, é lá onde criamos funções que agem por trás dos métodos crud.

- routes: Na pasta routes, chamamos os controlador condizente e definimos um padrão de como aquele método é invocado na URL.

mudanças:

- vamos mover o conteúdo de indexRoutes para index.js, assim mantemos chamadas tudo em um arquivo só.

coisas para ver:

- lógica das tabelas, como será exibido, o que será exibido primeiro, após criar um usuário, armazenar em profile, procurar saber como será feito a alteração de senha caso o usuário tenha esquecido e como será feito o registre-se caso ele não ter uma senha.

- quando criamos um usuário inserindo nome, email e senha, vamos redirecionar para o post profile, onde preencheremos nome, sobrenome, foto_perfil e bio e inserir tudo na tabela profiles.

A tabela de Usuários já foi feita.
