import { Header } from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProductShowcase from "@/components/ProductShowcase";
import { FAQSection } from "@/components/FAQSection";
import { CommentCollection } from "@/components/CommentCollection";
import Footer from "@/components/Footer";
import { BackgroundAnimation } from "@/components/BackgroundAnimation";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <BackgroundAnimation />
      <Header />
      <main className="pt-20 md:pt-24">
        <section id="home">
          <HeroSection />
        </section>
        <section id="product">
          <ProductShowcase />
        </section>
        <section id="faq">
          <FAQSection />
        </section>
        <section id="contact">
          <CommentCollection />
        </section>
      </main>
      <Footer />
    </div>
  );
}