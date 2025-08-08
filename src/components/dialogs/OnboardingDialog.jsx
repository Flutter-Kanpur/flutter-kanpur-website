'use client';

import React from 'react';
import { Dialog, DialogContent, Backdrop } from '@mui/material';
import ApplyNowButton from "@/components/buttons/ApplyNowButton";

const OnboardingDialog = ({ open, onClose, onNext }) => {
  const handleNext = () => {
    onNext();
  };

  const handleSkip = () => {
    onClose();
  };

  return (
    <>
      {/* Backdrop with blur effect */}
      <Backdrop
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backdropFilter: 'blur(16px)',
          backgroundColor: 'rgba(0, 0, 0, 0.3)'
        }}
        open={open}
        onClick={onClose}
      />
      
      <Dialog 
        open={open} 
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          style: {
            backgroundColor: 'transparent',
            boxShadow: 'none',
            borderRadius: '0',
            zIndex: (theme) => theme.zIndex.drawer + 2,
            maxHeight: '100vh',
            overflow: 'hidden'
          }
        }}
        BackdropProps={{
          style: { backgroundColor: 'transparent' }
        }}
      >
        <DialogContent style={{ 
          padding: 0, 
          backgroundColor: 'transparent',
          overflow: 'auto',
          maxHeight: '100vh'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            position: 'relative',
            padding: '20px'
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
              
              {/* Onboarding Icon/Image */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '32px'
              }}>
                <div style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #3FD1FF, #266799)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#FFFFFF"/>
                    <path d="M2 17L12 22L22 17" fill="#FFFFFF"/>
                    <path d="M2 12L12 17L22 12" fill="#FFFFFF"/>
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
                Welcome to Flutter Kanpur!
              </h1>

              {/* Description */}
              <p style={{ 
                color: '#A6A6A6', 
                fontSize: '16px', 
                marginBottom: '32px',
                fontFamily: 'Encode Sans, sans-serif',
                lineHeight: '1.5'
              }}>
                You're now part of a vibrant community of Flutter developers, designers, and innovators. Let's get you started with your journey!
              </p>

              {/* Progress Indicator */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '32px',
                gap: '8px'
              }}>
                <div style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: '#3FD1FF'
                }}></div>
                <div style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: '#2E3942'
                }}></div>
                <div style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: '#2E3942'
                }}></div>
              </div>

              {/* Action Buttons */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                <ApplyNowButton 
                  text="GET STARTED" 
                  width="100%" 
                  height="48px" 
                  fontSize="14px"
                  onClick={handleNext}
                />
                
                <button
                  onClick={handleSkip}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#A6A6A6',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontFamily: 'Encode Sans, sans-serif',
                    padding: '8px'
                  }}
                >
                  Skip for now
                </button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default OnboardingDialog; 