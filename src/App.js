import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import AuthState from "./contexts/AuthState";
import CartState from "./contexts/CartState";
import Checkout from "./pages/Checkout";
import ProductState from "./contexts/ProductState";

function App() {
  return (
    <ProductState>
      <CartState>
        <AuthState>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </BrowserRouter>
        </AuthState>
      </CartState>
    </ProductState>
  );
}

export default App;
