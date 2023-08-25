import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { JwtSecretKey } from "./constants/appConstant";
import Layout from "./layout/Layout";
import Login from "./pages/Auth/Login";
import Catalog from "./pages/Catalog/Catalog";
import CowDetail from "./pages/CowDetail/CowDetail";
import Home from "./pages/Home/Home";
import Recipt from "./pages/Recipt/Recipt";
import ReciptcowDetail from "./pages/ReciptCowDetail/ReciptcowDetail";

function App() {
  const token = localStorage.getItem("token");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={token === JwtSecretKey ? <Layout/> : <Navigate to="/login" /> }>
          <Route index element={<Home />} />
          <Route path="/detail" element={<CowDetail />} />
          <Route path="/catalog" element={<Catalog />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/catalog/:lotNo" element={<Recipt />} />
        <Route path="/reciptDetail/:lotNo" element={<ReciptcowDetail />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
