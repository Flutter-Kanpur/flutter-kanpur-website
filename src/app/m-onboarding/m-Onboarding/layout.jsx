"use client";

import { OnboardingProvider } from "@/contexts/OnboardingContext";

export default function OnboardingLayout({ children }) {
  return <OnboardingProvider>{children}</OnboardingProvider>;
}