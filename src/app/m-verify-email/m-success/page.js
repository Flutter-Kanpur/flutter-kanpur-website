"use client";

import React from "react";
import SuccessScreen from "@/v2components/BottomNav/m-successScreen/SuccessScreen";

export default function EmailVerifiedSuccessPage() {
  return (
    <SuccessScreen
      imageSrc="/assets/m-AuthImages/email-verified.png"
      imageAlt="Email Verified"
      title="Email verified"
      subtitle="Your email address is successfully verified."
      helperText="Loading..."
      redirectTo="/"
      redirectDelay={1600}
      showButton={false}
    />
  );
}