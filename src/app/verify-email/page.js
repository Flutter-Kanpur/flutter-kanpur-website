'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const VerifyEmail = () => {
  const router = useRouter();
  const [countdown, setCountdown] = useState(15);
  const [email] = useState('angelicasingh.design@gmail.com');
  const [timerStopped, setTimerStopped] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setTimerStopped(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleOpenGmail = () => {
    window.open('https://mail.google.com', '_blank');
  };

  const handleChangeEmail = () => {
    router.push('/signup');
  };

  const handleResendEmail = () => {
    setCountdown(15);
    setTimerStopped(false);
    // Here you would typically call your API to resend the email
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'radial-gradient(circle at 50% 45%, rgba(63, 209, 255, 0.15) 0%, rgba(63, 209, 255, 0.05) 25%, transparent 50%), radial-gradient(circle at 50% 40%, #010A10 0%, #010A10 100%)'
    }}>
      {/* Header with Flutter Logo */}
      <div style={{ 
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <img 
          src="/landingPageIcons/flutter_icon.svg" 
          alt="Flutter Logo" 
          width="56" 
          height="56" 
        />
      </div>

      {/* Main Modal */}
      <div style={{
        background: '#0C1217',
        borderRadius: '12px',
        padding: '40px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        maxWidth: '500px',
        width: '100%',
        textAlign: 'left'
      }}>
        
        {/* Title */}
        <h1 style={{ 
          color: '#FFFFFF', 
          fontSize: '20px', 
          fontWeight: '400', 
          marginBottom: '16px',
          fontFamily: 'Encode Sans, sans-serif'
        }}>
          Verify your email
        </h1>

        {/* Instruction Text */}
        <p style={{ 
          color: '#A6A6A6', 
          fontSize: '16px', 
          marginBottom: '20px',
          fontFamily: 'Encode Sans, sans-serif',
          lineHeight: '1.5'
        }}>
          Check {email} to verify your account and get started
        </p>

        {/* Open Gmail Button and Timer Row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '24px',
          gap: '20px'
        }}>
          <button 
            onClick={handleOpenGmail}
            style={{
              background: '#0F1C25',
              color: '#FFFFFF',
              border: '1px solid #2E3942',
              borderRadius: '8px',
              padding: '12px 20px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontFamily: 'Encode Sans, sans-serif'
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="#EA4335"/>
            </svg>
            Open Gmail
          </button>

          {timerStopped ? (
            <button 
              onClick={handleResendEmail}
              style={{
                background: '#0F1C25',
                color: '#FFFFFF',
                border: '1px solid #2E3942',
                borderRadius: '8px',
                padding: '12px 20px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer',
                fontFamily: 'Encode Sans, sans-serif'
              }}
            >
              Resend email
            </button>
          ) : (
            <span style={{
              color: '#FFFFFF',
              fontSize: '14px',
              fontFamily: 'Encode Sans, sans-serif'
            }}>
              Resend email in {countdown}s
            </span>
          )}
        </div>

        {/* Change Email Link */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontFamily: 'Encode Sans, sans-serif'
        }}>
          <span style={{ color: '#A6A6A6', fontSize: '14px' }}>
            Not your email?
          </span>
          <button 
            onClick={handleChangeEmail}
            style={{
              background: 'none',
              border: 'none',
              color: '#3FD1FF',
              cursor: 'pointer',
              fontSize: '14px',
        
              fontFamily: 'Encode Sans, sans-serif'
            }}
          >
            Change email
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail; 