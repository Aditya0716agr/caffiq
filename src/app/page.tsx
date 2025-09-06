import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ProductShowcase from '@/components/ProductShowcase';
import FAQSection from '@/components/FAQSection';
import { CommentCollectionComponent } from '@/components/CommentCollection';
import Footer from '@/components/Footer';
import { BackgroundAnimation } from '@/components/BackgroundAnimation';

export default function Home() {
  return (
    <main className="min-h-screen bg-background relative">
      <BackgroundAnimation />
      
      <Header />
      
      <div className="pt-16 md:pt-20">
        <HeroSection className="px-4 sm:px-6 lg:px-8" />
        
        <ProductShowcase className="px-4 sm:px-6 lg:px-8" />
        
        <FAQSection />
        
        <CommentCollectionComponent />
        
        <Footer />
      </div>
      
      <div className="pb-20 sm:pb-0" />
    </main>
  );
}