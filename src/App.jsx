import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import Product from "./components/Product";
import Cart from "./pages/Cart";
import Errorpage from "./pages/Errorpage";
import Category from "./pages/Category";
import Products from "./pages/Products";
import { CartContextProvider } from "./context/CartContext";
import Contact from "./pages/Contact";

function App() {
  return (
    <>
      <CartContextProvider>
        <div className="mb-32">
          <Header />
        </div>
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="product/:id" element={<Product />} />
          <Route path="products" element={<Products />} />
          <Route path="contact" element={<Contact />} />
          <Route path="categories/:categoryName" element={<Category />} />
          <Route path="cart" element={<Cart />} />
          <Route path="*" element={<Errorpage />} />
        </Routes>
        <Footer />
      </CartContextProvider>
    </>
  );
}

export default App;
