import { HeroSection } from "../components/sections/HeroSection";
import { ProductSection } from "../components/sections/ProductSection";
import { BenefitsSection } from "../components/sections/BenefitsSection";
import { AboutSection } from "../components/sections/AboutSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProductSection />
      <BenefitsSection />
      <AboutSection />
    </>
  );
}