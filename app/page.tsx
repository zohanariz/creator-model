import React from "react";
import { ModalProvider } from "@/components/ModalContext";
import HeroSection from "@/components/HeroSection";
import PainPoints from "@/components/PainPoints";
import JourneyTimeline from "@/components/JourneyTimeline";
import StorySection from "@/components/StorySection";
import ModulesSection from "@/components/ModulesSection";
import IncludedSection from "@/components/IncludedSection";
import QualificationSection from "@/components/QualificationSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import LeadCaptureModal from "@/components/LeadCaptureModal";

export default function Home() {
  return (
    <ModalProvider>
      <main className="min-h-screen">
        {/* 1. Hero Section */}
        <HeroSection />

        {/* 2. Pain Points */}
        <PainPoints />

        {/* 3. Journey Timeline (Negative variant) */}
        <JourneyTimeline variant="negative" />

        {/* 5. Modules Section */}
        <ModulesSection />

        {/* 6. Included Perks Section */}
        <IncludedSection />

        {/* 7. Qualification Section */}
        <QualificationSection />

        {/* 8. Journey Timeline (Positive variant) */}
        <JourneyTimeline variant="positive" />

        {/* 9. Testimonials & Social Proof */}
        <TestimonialsSection />

        {/* 4. Story Section */}
        <StorySection />

        {/* 10. FAQ Section */}
        <FAQSection />

        {/* 11. Final CTA Section */}
        <CTASection />
      </main>

      {/* 12. Footer */}
      <Footer />

      {/* Lead Capture Overlay Modal */}
      <LeadCaptureModal />
    </ModalProvider>
  );
}
