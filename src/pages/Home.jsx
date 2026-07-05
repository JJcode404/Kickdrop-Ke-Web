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
      <Hero />
      <FlashSale />
      <BestSellers />
      <ProductShowcase />
      <Benefits />
      <Reviews />
      <BrandStrip />
      <Newsletter />
    </>
  );
}
