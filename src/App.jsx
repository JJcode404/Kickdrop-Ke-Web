import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Shop from "./pages/Shop.jsx";
import Product from "./pages/Product.jsx";
import NewArrivals from "./pages/NewArrivals.jsx";
import Sale from "./pages/Sale.jsx";
import BestSellers from "./pages/BestSellers.jsx";
import Brands from "./pages/Brands.jsx";
import About from "./pages/info/About.jsx";
import Delivery from "./pages/info/Delivery.jsx";
import Returns from "./pages/info/Returns.jsx";
import Privacy from "./pages/info/Privacy.jsx";
import Terms from "./pages/info/Terms.jsx";
import Wishlist from "./pages/Wishlist.jsx";
import CartDrawer from "./components/CartDrawer.jsx";
import AuthModal from "./components/AuthModal.jsx";
import { StoreProvider } from "./store/StoreContext.jsx";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppShell() {
  const { pathname, search } = useLocation();
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <Navbar />
      <ScrollToTop />
      {/* key remounts main on navigation so the page-fade transition replays */}
      <main id="main" className="page-fade" key={pathname + search}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/new-arrivals" element={<NewArrivals />} />
          <Route path="/best-sellers" element={<BestSellers />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/sale" element={<Sale />} />
          <Route path="/about" element={<About />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/returns" element={<Returns />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <CartDrawer />
      <AuthModal />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <StoreProvider>
        <AppShell />
      </StoreProvider>
    </BrowserRouter>
  );
}
