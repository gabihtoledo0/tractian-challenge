import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import DetailsAssets from "./pages/DetailsAssets"

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ativos/:id" element={<DetailsAssets />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
