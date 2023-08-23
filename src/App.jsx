import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Catalog from "./pages/Catalog/Catalog";
import CowDetail from "./pages/CowDetail/CowDetail";
import Home from "./pages/Home/Home";
import Recipt from "./pages/Recipt/Recipt";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/detail" element={<CowDetail />} />
          <Route path="/catalog" element={<Catalog />} />
        </Route>
        <Route path="/catalog/:lotNo" element={<Recipt />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
