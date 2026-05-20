"use client";

import { BookingProvider } from "@/context/BookingContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useSmoothAnchorLinks } from "@/hooks/useSmoothAnchorLinks";
import AboutSection from "@/components/AboutSection";
import BookingModal from "@/components/BookingModal";
import CtaSection from "@/components/CtaSection";
import CustomCursor from "@/components/CustomCursor";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import ImpactSection from "@/components/ImpactSection";
import IntegrationsSection from "@/components/IntegrationsSection";
import MagicAiSearchSection from "@/components/MagicAiSearchSection";
import Marquee from "@/components/Marquee";
import Nav from "@/components/Nav";
import Preloader from "@/components/Preloader";
import ProcessSection from "@/components/ProcessSection";
import ProjectsSection from "@/components/ProjectsSection";
import ReviewsSection from "@/components/ReviewsSection";
import ServicesSection from "@/components/ServicesSection";
import ShowreelSection from "@/components/ShowreelSection";
import TradingPortfolioSection from "@/components/TradingPortfolioSection";

function SiteContent() {
  useScrollReveal();
  useSmoothAnchorLinks();

  return (
    <>
      <CustomCursor />
      <Preloader />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <ImpactSection />
        <ServicesSection />
        <AboutSection />
        <ProcessSection />
        <IntegrationsSection />
        <ProjectsSection />
        <ReviewsSection />
        <MagicAiSearchSection />
        <FaqSection />
        <TradingPortfolioSection />
        <ShowreelSection />
        <CtaSection />
      </main>
      <Footer />
      <BookingModal />
    </>
  );
}

export default function SiteClient() {
  return (
    <BookingProvider>
      <SiteContent />
    </BookingProvider>
  );
}
