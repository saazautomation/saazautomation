"use client";

import { BookingProvider } from "@/context/BookingContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useSmoothAnchorLinks } from "@/hooks/useSmoothAnchorLinks";
import BookingModal from "./BookingModal";
import CtaSection from "./CtaSection";
import DemoVaultSection from "./DemoVaultSection";
import CustomCursor from "./CustomCursor";
import DiscoveryFlowSection from "./DiscoveryFlowSection";
import FaqMetricsSection from "./FaqMetricsSection";
import Footer from "./Footer";
import Hero from "./Hero";
import Marquee from "./Marquee";
import Nav from "./Nav";
import Portfolio from "./Portfolio";
import Preloader from "./Preloader";
import Process from "./Process";
import Reviews from "./Reviews";
import ScrollToTop from "./ScrollToTop";
import ShowreelBundle from "./ShowreelBundle";
import MagicAiSearchSection from "./MagicAiSearchSection";
import Stats from "./Stats";
import StudioShowcase from "./StudioShowcase";

export default function SiteClient() {
  useScrollReveal();
  useSmoothAnchorLinks();

  return (
    <BookingProvider>
      <CustomCursor />
      <Preloader />
      <Nav />
      <ScrollToTop />
      <main>
        <Hero />
        <Stats />
        <DiscoveryFlowSection />
        <Marquee />
        <Portfolio />
        <ShowreelBundle />
        <StudioShowcase />
        <MagicAiSearchSection />
        <Process />
        <FaqMetricsSection />
        <Reviews />
        <CtaSection />
        <DemoVaultSection />
      </main>
      <Footer />
      <BookingModal />
    </BookingProvider>
  );
}
