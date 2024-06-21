import React, { ChangeEvent, useEffect, useState } from "react"

import "./styles.css"
import { Noticia } from "../../types/Noticia"
import axios from "axios"

function Noticias() {
  const [noticias, setNoticias] = useState<Noticia[]>([])
  const [title, setTitle] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [editando, setEditando] = useState<Noticia | null>(null)

  useEffect(() => {
    fetchNoticias()
  }, [])

  const fetchNoticias = async () => {
    try {
      const response = await axios.get("http://localhost:3333/news-list")
      setNoticias(response.data.allNews)
    } catch (error) {
      console.error("Erro ao buscar notícias:", error)
    }
  }

  const criarNoticia = async () => {
    try {
      const response = await axios.post("http://localhost:3333/news", {
        title,
        description,
      })
      console.log("Resposta da criação:", response.data)
      setTitle("")
      setDescription("")
      fetchNoticias()
    } catch (error) {
      console.error("Erro ao criar notícia:", error)
    }
  }

  const atualizarNoticia = async () => {
    if (editando) {
      try {
        const response = await axios.put(
          `http://localhost:3333/news/${editando.id}`,
          { title, description }
        )
        setNoticias(
          noticias.map((noticia) =>
            noticia.id === editando.id ? response.data : noticia
          )
        )
        setTitle("")
        setDescription("")
        setEditando(null)
        fetchNoticias()
      } catch (error) {
        console.error("Erro ao atualizar notícia:", error)
      }
    }
  }

  const apagarNoticia = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3333/news/${id}`)
      setNoticias(noticias.filter((noticia) => noticia.id !== id))
    } catch (error) {
      console.error("Erro ao apagar notícia:", error)
    }
  }

  const handletitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handledescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value)
  }

  const iniciarEdicao = (noticia: Noticia) => {
    setEditando(noticia)
    setTitle(noticia.title)
    setDescription(noticia.description)
  }

  return (
    <div className="wrapper">
      <div className="container">
        <h1>Notícias</h1>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={handletitleChange}
        />
        <textarea
          placeholder="Descrição"
          value={description}
          onChange={handledescriptionChange}
        />
        <button
          onClick={editando ? atualizarNoticia : criarNoticia}
          disabled={!title || !description}
        >
          {editando ? "Atualizar Notícia" : "Criar Notícia"}
        </button>
        {noticias.map((noticia) => (
          <div key={noticia.id} className="news-item">
            <h2>{noticia.title}</h2>
            <p>{noticia.description}</p>
            <button onClick={() => iniciarEdicao(noticia)}>Editar</button>
            <button onClick={() => apagarNoticia(noticia.id)}>Apagar</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Noticias
