"use client";

import RoleSkillSelectorStep from "@/v2components/m-onboarding/RoleSkillSelectorStep";
export default function OnboardingScreen2() {
  return (
    <RoleSkillSelectorStep
      step={2}
      nextRoute="/m-onboarding/m-Onboarding/screen3"
      title="What best describes you?"
      subtitle="Choose one or more."
    />
  );
}