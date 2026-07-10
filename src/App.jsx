import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import CartDrawer from "./components/CartDrawer.jsx";
import AuthModal from "./components/AuthModal.jsx";
import ChatWidget from "./components/ChatWidget.jsx";
import CallButton from "./components/CallButton.jsx";
import { StoreProvider } from "./store/StoreContext.jsx";
import Home from "./pages/Home.jsx";

/* Route-level code splitting: the homepage stays in the main bundle for the
   fastest LCP; every other page loads its chunk on navigation. */
const Shop = lazy(() => import("./pages/Shop.jsx"));
const Product = lazy(() => import("./pages/Product.jsx"));
const NewArrivals = lazy(() => import("./pages/NewArrivals.jsx"));
const Sale = lazy(() => import("./pages/Sale.jsx"));
const BestSellers = lazy(() => import("./pages/BestSellers.jsx"));
const Brands = lazy(() => import("./pages/Brands.jsx"));
const Wishlist = lazy(() => import("./pages/Wishlist.jsx"));
const About = lazy(() => import("./pages/info/About.jsx"));
const Delivery = lazy(() => import("./pages/info/Delivery.jsx"));
const Returns = lazy(() => import("./pages/info/Returns.jsx"));
const Privacy = lazy(() => import("./pages/info/Privacy.jsx"));
const Terms = lazy(() => import("./pages/info/Terms.jsx"));
const Faq = lazy(() => import("./pages/info/Faq.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));

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
        <Suspense fallback={null}>
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
            <Route path="/faq" element={<Faq />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <CartDrawer />
      <AuthModal />
      <ChatWidget />
      <CallButton />
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
