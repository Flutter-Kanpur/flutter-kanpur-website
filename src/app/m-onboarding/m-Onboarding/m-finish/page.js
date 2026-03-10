"use client";

import React, { useEffect } from "react";
import SuccessScreen from "@/v2components/BottomNav/m-successScreen/SuccessScreen";
import { useOnboarding } from "@/contexts/OnboardingContext";

export default function ProfileSuccessPage() {
  const { resetOnboardingData } = useOnboarding();

  useEffect(() => {
    resetOnboardingData();
  }, [resetOnboardingData]);
  
  return (
    <SuccessScreen
      imageSrc="/assets/m-AuthImages/email-verified.png"
      imageAlt="You’re all set"
      title="You’re all set"
      subtitle="You can update your profile anytime."
      showButton={true}
      buttonText="Redirect to Home"
      redirectTo="/"
      redirectDelay={null}
      buttonSx={{ mt: 9 }}
    />
  );
}
