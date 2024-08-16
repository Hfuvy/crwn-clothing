import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/homepage/homepage.components";
import ShopPage from "./pages/shop/shop.component";



function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/shop" element={<ShopPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
