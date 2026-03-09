"use client";

import React, { createContext, useContext, useState } from "react";

const OnboardingContext = createContext(null);

export function OnboardingProvider({ children }) {
  const [onboardingData, setOnboardingData] = useState({
    fullName: "",
    avatarFile: null,
    avatarPreviewUrl: "",
    roles: [],
    experience: "",
    skills: [],
    github: "",
    linkedin: "",
    portfolio: "",
  });

  const updateOnboardingData = (newFields) => {
    setOnboardingData((prev) => ({
      ...prev,
      ...newFields,
    }));
  };

  const resetOnboardingData = () => {
    setOnboardingData({
      fullName: "",
      avatarFile: null,
      avatarPreviewUrl: "",
      roles: [],
      experience: "",
      skills: [],
      github: "",
      linkedin: "",
      portfolio: "",
    });
  };

  return (
    <OnboardingContext.Provider
      value={{
        onboardingData,
        updateOnboardingData,
        resetOnboardingData,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);

  if (!context) {
    throw new Error("useOnboarding must be used inside OnboardingProvider");
  }

  return context;
}