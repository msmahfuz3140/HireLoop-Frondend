'use client';

import CtaBannerSection from "@/components/CtaBanner";
import FeaturesSection from "@/components/Features";
import JobBoard from "@/components/JobBoard";
import JobSearchBar from "@/components/JobSearchBar";
import PricingSection from "@/components/Pricing";
import StatsSection from "@/components/StatsSection";
import { useTheme } from "@/context/ThemeContext";

export default function Home() {
  const { theme } = useTheme();

  return (
    <div
      className="flex flex-col flex-1 items-center justify-center font-sans"
      style={{ backgroundColor: 'var(--bg-base)' }}
    >
      <JobSearchBar />
      <StatsSection />
      <JobBoard />
      <FeaturesSection />
      <PricingSection />
      <CtaBannerSection />
    </div>
  );
}
