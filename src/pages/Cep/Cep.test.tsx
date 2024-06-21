import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import axios from "axios"
import Cep from "."

jest.mock("axios")
const mockedAxios = axios as jest.Mocked<typeof axios>

describe("Cep Component", () => {
  test("renders the input and button", () => {
    render(<Cep />)
    expect(
      screen.getByPlaceholderText("Digite o CEP (somente números)")
    ).toBeInTheDocument()
    expect(screen.getByText("Buscar")).toBeInTheDocument()
  })

  test("displays address when fetch is successful", async () => {
    const addressData = {
      logradouro: "Praça da Sé",
      bairro: "Sé",
      localidade: "São Paulo",
      uf: "SP",
    }
    mockedAxios.get.mockResolvedValueOnce({ data: addressData })

    render(<Cep />)
    fireEvent.change(
      screen.getByPlaceholderText("Digite o CEP (somente números)"),
      {
        target: { value: "01001000" },
      }
    )
    fireEvent.click(screen.getByText("Buscar"))

    expect(
      await screen.findByText("Logradouro: Praça da Sé")
    ).toBeInTheDocument()
  })

  test("displays error message when fetch fails", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("CEP não encontrado."))

    render(<Cep />)
    fireEvent.change(
      screen.getByPlaceholderText("Digite o CEP (somente números)"),
      { target: { value: "010010000" } }
    )
    fireEvent.click(screen.getByText("Buscar"))

    expect(await screen.findByText("CEP não encontrado.")).toBeInTheDocument()
  })
})
