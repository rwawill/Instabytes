// Importa o módulo express para criar o servidor web
import express from "express";
import routes from "./src/config/routes/postRoutes.js";

// Importa a função de conexão com o banco de dados
import conectarAoBanco from "./src/config/dbConfig.js";



// Lista de posts de exemplo com id, descrição e URL da imagem
const posts = [
  {
    id: 1,
    descricao: "uma foto teste",
    imgUrl: "https://placecats.com/millie/300/150"
  },
  {
    id: 2,
    descricao: "Gato brincando com um novelo de lã",
    imgUrl: "https://placekitten.com/400/300"
  },
  {
    id: 3,
    descricao: "Paisagem de um pôr do sol",
    imgUrl: "https://picsum.photos/seed/picsum/200/300"
  },
  {
    id: 4,
    descricao: "Cachorro correndo na praia",
    imgUrl: "https://source.unsplash.com/random/200x300/?dog,beach"
  },
];

// Cria uma instância do aplicativo Express
const app = express();
app.use(express.static("uploads"))
routes(app)

// Inicia o servidor na porta 3000 e exibe uma mensagem ao iniciar
app.listen(3000, () => {
  console.log('servidor escutando...');
});
