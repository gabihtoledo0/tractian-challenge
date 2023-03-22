// eslint-disable-next-line import/no-extraneous-dependencies
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home/Home"
import DetailsAssets from "./pages/DetailsAssets/DetailsAssets"
import DetailsWorkOrders from "./pages/DetailsWorkOrders.tsx/DetailsWorkOrders"
import "./App.css"

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ativos/:id" element={<DetailsAssets />} />
        <Route path="/ordens-de-servico/:id" element={<DetailsWorkOrders />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
