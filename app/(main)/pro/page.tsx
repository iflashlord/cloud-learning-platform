"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ProHero } from "@/components/ui/pro-hero";
import { ProFeatures } from "@/components/ui/pro-features";
import { ProComparison } from "@/components/ui/pro-comparison";
import { ProTestimonials } from "@/components/ui/pro-testimonials";
import { ProCTA } from "@/components/ui/pro-cta";

const ProPage = () => {
  const router = useRouter();
  // TODO: Add checkSubscription when implemented
  const isPro = false; // await checkSubscription();

  useEffect(() => {
    if (isPro) {
      router.push("/learn");
    }
  }, [isPro, router]);

  const handleStartTrial = () => {
    // TODO: Implement trial start logic
    console.log("Starting free trial...");
  };

  const handleViewPlans = () => {
    // TODO: Implement view plans logic
    console.log("Viewing all plans...");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <ProHero onStartTrial={handleStartTrial} />
      <ProFeatures />
      <ProComparison />
      <ProTestimonials />
      <ProCTA onStartTrial={handleStartTrial} onViewPlans={handleViewPlans} />
    </div>
  );
};

export default ProPage;
