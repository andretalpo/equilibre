# Equilibre - API

Equilibre é uma aplicação Web para controle de gastos com foco em cartões. Essa aplicação foi desenvolvida como projeto final do curso de WebDev da Ironhack. Esse repositorio armazena a API RESTful, responsável pelo back-end.

## Agradecimentos

Nossos sinceros agradecimentos ao nosso instrutor Henrique Mendes e nossa TA Adriana Saty.

## API Característicassticas

* Stack usado: Node, Express, Mongoose, Cors, BodyParser, Bcrypt, JWT
* Métodos HTTP implementados: GET, POST, PUT & DELETE
* Deploy: Heroku

* Link para a Aplicação Web: [https://equilibre-app.herokuapp.com/]
* Endpoints: "/user", "/category", "/expense", "/card"

* O deploy do React foi feito juntamente com a API REST, sendo o build React present na pasta /src/public
* Link para repositório Front-End: [https://github.com/andretalpo/equilibre-react]

## Implementações futuras

*Criar estrutura no backend para surpotar a funcionalidade de metas
*Criar estrutura no backend para surpotar a funcionalidade de fatura
*Criar estrutura no backend para surpotar a funcionalidade de inserção automática de compras

## Pré requisitos

Após baixar o repositório, execute o comando 'npm install'. Você também precisará criar o arquivo ".env" na raiz do projeto com as seguintes chaves:

* PORT=YOUR_LOCALHOST_ACCESS_PORT
* MONGODB_URI=mongodb://localhost/YOUR_COLLECTION_NAME_IN_MONGODB
* JWT_USER_TOKEN_HASH=FORNECER_HASH_DE_SUA_PREFERENCIA
* JWT_USER_TOKEN_EXPIRATION=FORNECER_TEMPO_DE_EXPIRAÇÂO_TOKEN '1h para uma hora'
* JWT_USER_REFRESH_TOKEN_EXPIRATION=FORNECER_TEMPO_DE_EXPIRAÇÂO_REFRESH_TOKEN '2h para uma hora - considerar um valor maior que a token acima'

Também será necessário ajustar o middleware CORS com a URL de origem da qual o Backend receberá as requisições HTTP. O middleware CORS está presente no arquivo app.js e abaixo segue o código do respectivo middleware: 

*this.app.use(cors({*
    *origin: ['http://localhost:3000', 'https://equilibre-app.herokuapp.com/'],*

## Autores

API desenvolvida por **André Talpo - https://github.com/andretalpo** & **Paulo Salles - https://github.com/plsalles** - **Publicado em Julho/2020**