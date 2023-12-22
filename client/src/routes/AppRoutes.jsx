import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import FoodPage from "../Pages/FoodPage";
import CartPage from "../Pages/CartPage";
import LoginPage from "../Pages/LoginPage";
import RegisterPage from "../Pages/RegisterPage";
import AuthRoute from "../Components/AuthRoute";
import CheckoutPage from "../Pages/CheckoutPage";
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/search/:searchTerm" element={<HomePage />} />
      <Route path="/tag/:tag" element={<HomePage />} />
      <Route path="/food/:id" element={<FoodPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route
        path="/checkout"
        element={
          <AuthRoute>
            <CheckoutPage />
          </AuthRoute>
        }
      />
    </Routes>
  );
}
