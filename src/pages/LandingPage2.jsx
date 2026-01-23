import AboutSection from "@/components/common/AboutSection";
import FAQSection from "@/components/common/FAQSection";
import Footer from "@/components/common/Footer";
import Hero from "@/components/common/Hero";
import LogoCloud from "@/components/common/LogoCloud";
import Navbar from "@/components/common/Navbar";
import Navbar2 from "@/components/common/Navbar2";
import Navbar3 from "@/components/common/Navbar3";
import StatsSection from "@/components/common/StatsSection";
import ValuesSection from "@/components/common/ValuesSection";
import React from "react";

const LandingPage2 = () => {
  return (
    <>
      <section className="px-6 pt-2 pb-14">
        <Navbar3 />
      </section>

      <section className="max-h-[900vh] w-full">
        <Hero />
      </section>

      <section className="my-16">
        <LogoCloud />
      </section>

      <section className="lg:my-8">
        <AboutSection />
      </section>

      <section>
        <ValuesSection />
      </section>

      <section>
        <StatsSection />
      </section>

      <section className="max-lg:my-18 lg:my-24">
        <FAQSection />
      </section>

      <section>
        <Footer />
      </section>
    </>
  );
};

export default LandingPage2;
