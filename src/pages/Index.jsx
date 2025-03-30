import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Features from "@/components/Features";
import MobilePreview from "@/components/MobilePreview";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="container mx-auto px-4 min-h-screen flex flex-col gap-12">
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <MobilePreview />
      <Testimonials />
      <Footer />
    </main>
  );
};

export default Index;