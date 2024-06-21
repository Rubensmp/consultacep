import React, { ChangeEvent, useState } from "react"
import "./styles.css"

import axios from "axios"
import { Endereco } from "../../types/Endereco"
import { Loading } from "../../components"

function Cep() {
  const [cep, setCep] = useState<string>("")
  const [endereco, setEndereco] = useState<Endereco | null>(null)
  const [erro, setErro] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCep(e.target.value)
  }

  const buscarCep = () => {
    setLoading(true)
    setEndereco(null)
    setErro("")

    axios
      .get(`https://viacep.com.br/ws/${cep}/json/`)
      .then((response) => {
        setEndereco(response.data)
        setErro("")
      })
      .catch((error) => {
        setErro("CEP não encontrado.")
        setEndereco(null)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <div className="wrapper">
      <div className="container">
        <h1>Consulta de CEP</h1>
        <input
          type="text"
          placeholder="Digite o CEP (somente números)"
          value={cep}
          onChange={handleInputChange}
        />
        <button onClick={buscarCep} disabled={loading}>
          Buscar
        </button>

        {loading && <Loading />}

        {erro && <p>{erro}</p>}
        {endereco && (
          <div>
            <p>CEP: {endereco.cep}</p>
            <p>Logradouro: {endereco.logradouro}</p>
            <p>
              Complemento:
              {endereco.complemento === ""
                ? " Sem complemento"
                : endereco.complemento}
            </p>
            <p>Bairro: {endereco.bairro}</p>
            <p>Cidade: {endereco.localidade}</p>
            <p>Estado: {endereco.uf}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cep
