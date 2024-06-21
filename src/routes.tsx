import React from "react"

import { Routes, Route } from "react-router-dom"

import * as Pages from "./pages"

export const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Pages.Cep />} />
      <Route path="/noticias" element={<Pages.Noticias />} />
    </Routes>
  )
}

export default Router
