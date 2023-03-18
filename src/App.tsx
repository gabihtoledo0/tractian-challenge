// eslint-disable-next-line import/no-extraneous-dependencies
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home/Home"
import DetailsAssets from "./pages/DetailsAssets/DetailsAssets"

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
