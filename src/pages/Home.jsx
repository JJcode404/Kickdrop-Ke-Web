import Seo from "../components/Seo.jsx";
import { localBusinessLd } from "../data/seo.js";
import Hero from "../components/Hero.jsx";
import FlashSale from "../components/FlashSale.jsx";
import BestSellers from "../components/BestSellers.jsx";
import ProductShowcase from "../components/ProductShowcase.jsx";
import Benefits from "../components/Benefits.jsx";
import Reviews from "../components/Reviews.jsx";
import BrandStrip from "../components/BrandStrip.jsx";
import Newsletter from "../components/Newsletter.jsx";

export default function Home() {
  return (
    <>
      <Seo
        title="Authentic Sneakers in Nairobi, Kenya — Nike, Jordan, Adidas, New Balance"
        description="KICKDROP is Nairobi's premium sneaker store. Verified-authentic Nike Air Force 1, Jordan 1, Adidas Samba, New Balance & more. Free delivery across Kenya, M-Pesa accepted, order on WhatsApp."
        path="/"
        jsonLd={[localBusinessLd()]}
      />
      <Hero />
      <BestSellers />
      <FlashSale />
      <ProductShowcase />
      <Benefits />
      <Reviews />
      <BrandStrip />
      <Newsletter />
    </>
  );
}
