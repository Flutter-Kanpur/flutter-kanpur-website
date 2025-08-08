'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import ApplyNowButton from "@/components/buttons/ApplyNowButton";
import OnboardingScreen1Dialog from "@/components/dialogs/OnboardingScreen1Dialog";

const EmailVerified = () => {
  const router = useRouter();
  const [onboardingOpen, setOnboardingOpen] = useState(false);

  const handleContinue = () => {
    // Show onboarding screen 1 dialog instead of navigating to home
    setOnboardingOpen(true);
  };

  const handleCloseOnboarding = () => {
    setOnboardingOpen(false);
    // Navigate to home page when onboarding is closed
    router.push('/');
  };

  const handleOnboardingNext = () => {
    // Navigate to onboarding screen 2
    setOnboardingOpen(false);
    router.push('/onboarding/screen2');
  };

  return (
    <>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'radial-gradient(circle at 50% 45%, rgba(63, 209, 255, 0.15) 0%, rgba(63, 209, 255, 0.05) 25%, transparent 50%), radial-gradient(circle at 50% 40%, #010A10 0%, #010A10 100%)'
      }}>
     

        {/* Main Modal */}
        <div style={{
          background: '#0C1217',
          borderRadius: '12px',
          padding: '40px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          maxWidth: '500px',
          width: '100%',
          textAlign: 'center'
        }}>
          
          {/* Success Icon */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '24px'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #34A853, #28A745)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="#FFFFFF"/>
              </svg>
            </div>
          </div>

          {/* Title */}
          <h1 style={{ 
            color: '#FFFFFF', 
            fontSize: '24px', 
            fontWeight: '600', 
            marginBottom: '16px',
            fontFamily: 'Encode Sans, sans-serif'
          }}>
            Email Verified Successfully!
          </h1>

          {/* Thank You Message */}
          <p style={{ 
            color: '#A6A6A6', 
            fontSize: '16px', 
            marginBottom: '32px',
            fontFamily: 'Encode Sans, sans-serif',
            lineHeight: '1.5'
          }}>
            Thank you for verifying your email address. Your account has been successfully created and you're now part of the Flutter Kanpur community!
          </p>

          {/* Continue Button */}
          <div style={{ marginBottom: '24px' }}>
            <ApplyNowButton 
              text="CONTINUE" 
              width="100%" 
              height="48px" 
              fontSize="14px"
              onClick={handleContinue}
            />
          </div>

          {/* Additional Info */}
          <p style={{ 
            color: '#A6A6A6', 
            fontSize: '14px', 
            fontFamily: 'Encode Sans, sans-serif',
            lineHeight: '1.4'
          }}>
            You can now access all features of the Flutter Kanpur platform and connect with our community.
          </p>
        </div>
      </div>

      <OnboardingScreen1Dialog 
        open={onboardingOpen}
        onClose={handleCloseOnboarding}
        onNext={handleOnboardingNext}
      />
    </>
  );
};

export default EmailVerified; 