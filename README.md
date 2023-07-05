# To-do Restify

TO-DO list API rest-full, feita com Restify e MongoDB, as principais tecnologias usadas são:

[Node](https://nodejs.org/en) - 16.13.0
[Restify](http://restify.com) - 11.1.0
[Mongo](https://www.mongodb.com) - 5.6,

## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env, ou deixe em branco que será usado valores padrão setado em `src/settings/environment`

`PORT` - Porta que será rodada a plataforma

`MONGODB_URI`- Link do seu MongoDB

## Rodando localmente

Para rodar o projeto em sua maquina, certifique-se de ter devidamente instalada em sua máquinas as tecnologas necessarias, elas estão listadas no início de arquivo. Tendo todo os requisítos, siga os passos abaixo:

Clone o projeto e acesse o diretório

```bash
  git clone https://github.com/WilkerLopes/to-do-restify
  cd to-do-restify
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm start
```

Se tudo ocorrer certo, você poderá acessar a API localmente na porta 4000, o na porta definida por você. Você também verá no console todas as rotas que foram encontradas durante a inicialização.

Para facilitar os teste, o arquivo `requests.json` contêm todas as possíves requisições para ser importado dentro do Postman ou outra plataforma de tsete de API de sua preferência.

## Funcionalidades

A API, conta com um crud completo para o TO-DO list

- `[GET] /todos` - Retorna todos os TODO cadastrados, permitindo paginação
- `[GET] /todos/id` - Retorna um TODO correspondente ao id inserido
- `[POST] /todos` - Cadastra um novo TODO
- `[PATCH] /todos/id` - Altera parcialmente um TODO correspondente ao id inserido
- `[DELETE] /todos/id` - Exclui um TODO correspondente ao id inserido

O método `[GET] /todos` aceita alguns parâmetros para vizualização dos dados de acordo com a necessidade, sedo eles:

- `page: number` indica qual a página deve ser retornada
- `size: number` indica quantos itens devem ser retornados por página
- `where: string` filtro de busca do objeto. Pode ser adicionada varios paramentros separando por `,`, cada paramentro é separado por `:`, sendo o nome da key, e o valor esperado. ex: `where=completed:true` - retorna todos os items que forem concluídos.
- `fields: string` filtro de busca do objeto. Pode ser adicionada varios paramentros separando por `,`, cada paramentro é separado por `:`, sendo o nome da key, e o valor esperado. ex: `fields=title:true` - retorna somente o \_id e title nos resultados.
