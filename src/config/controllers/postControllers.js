import fs from "fs";
import {getTodosPosts, criarPost, atualizarPost} from "../models/postModel.js";
import gerarDescricaoComGemini from "../services/geminiService.js"


export async function listarPosts(req, res) {
    const posts = await getTodosPosts(); // Chama a função para obter todos os posts
    res.status(200).json(posts); // Retorna os posts em formato JSON com status 200
  } 

 export async function postarNovoPost(req, res) {
  const novoPost = req.body;
  try {
    const postCriado = await criarPost(novoPost)
    res.status(200).json(postCriado) 

  } catch(erro) {
    console.error(erro.message)
      res.status(500).json({"erro":"Falha na requisição"})
  }

 } 

 export async function uploadImagem(req, res) {
  const novoPost = {
      descricao: "",
      imgUrl: req.file.originalname,
      alt: ""
  };

  try{
      const postCriado = await criarPost(novoPost);
      const imagemAtualizada = `uploads/${postCriado.insertedId}.png`
      fs.renameSync(req.file.path, imagemAtualizada)
      return res.status(201).json(postCriado);
  } catch(erro) {
      console.error(erro.message);
      return res.status(500).json({"erro": "Falha na requisição"})
  }
}

export async function atualizarNovoPost(req, res) {
  const id = req.params.id;
  const urlImagem = `http://localhost:3000/${id}.png`

  try {
    const imgBuffer = fs.readFileSync(`uploads/${id}.png`)
    const descricao = await gerarDescricaoComGemini(imgBuffer)

    const post = {
      imgUrl: urlImagem,
      descricao: descricao,
      alt: req.body.alt
    }

    const postCriado = await atualizarPost(id, post);
    res.status(200).json(postCriado) 

  } catch(erro) {
    console.error(erro.message)
      res.status(500).json({"erro":"Falha na requisição"})
  }

 } 
 
