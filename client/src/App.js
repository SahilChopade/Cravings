import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import HomePage from "./Pages/HomePage";
import FoodPage from "./Pages/FoodPage";
import CartPage from "./Pages/CartPage";
function App() {
  return (
    <div className="bg-gradient-to-b from-[#379298] to-[#084d50] h-[100vh] font-['Merriweather']">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search/:searchTerm" element={<HomePage />} />
        <Route path="/tag/:tag" element={<HomePage />} />
        <Route path="/food/:id" element={<FoodPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </div>
  );
}

export default App;
