import 'dotenv/config' 
import conectarAoBanco from "../dbConfig.js";
import { ObjectId } from "mongodb";



// Conecta ao banco de dados usando a string de conexão do ambiente
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO)

// Função para obter todos os posts da coleção 'posts' no banco de dados
export async function getTodosPosts() {
    const db = conexao.db("imersao-instabyte"); // Seleciona o banco de dados
    const colecao = db.collection("posts"); // Seleciona a coleção "posts"
    return colecao.find().toArray(); // Retorna todos os posts como um array
  }

  export async function criarPost(novoPost) {

    const db = conexao.db("imersao-instabyte"); 
    const colecao = db.collection("posts"); 
    return colecao.insertOne(novoPost); 
  
  }

  export async function atualizarPost(id, novoPost) {

    const db = conexao.db("imersao-instabyte"); 
    const colecao = db.collection("posts")
    const objID = ObjectId.createFromHexString(id)
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost}); 
  
  }