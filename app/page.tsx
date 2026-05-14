import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/features/home/Hero';
import Marquee from '@/components/ui/Marquee';
import Features from '@/features/home/Features';
import HowItWorks from '@/features/home/HowItWorks';
import CreatorEconomy from '@/features/home/CreatorEconomy';
import Testimonials from '@/features/home/Testimonials';
import Comparison from '@/features/home/Comparison';
import FAQ from '@/features/home/FAQ';
import FinalCTA from '@/features/home/FinalCTA';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Marquee />
      <Features />
      <HowItWorks />
      <CreatorEconomy />
      <Testimonials />
      <Comparison />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
