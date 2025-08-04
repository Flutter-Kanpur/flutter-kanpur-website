'use client';

import React, { useState } from "react";
import { Dialog, DialogContent, IconButton, Backdrop } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ApplyNowButton from "@/components/buttons/ApplyNowButton";
import VerifyEmailDialog from "./VerifyEmailDialog";

const SignupDialog = ({ open, onClose, onShowLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [verifyEmailOpen, setVerifyEmailOpen] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const handleLoginClick = () => {
    onClose();
    onShowLogin();
  };

  const handleCreateAccount = () => {
    // Get the email from the input field
    const emailInput = document.querySelector('input[placeholder="User Name"]');
    const email = emailInput ? emailInput.value : 'angelicasingh.design@gmail.com';
    setUserEmail(email);

    // Close signup dialog and open verify email dialog
    onClose();
    setVerifyEmailOpen(true);
  };

  const handleCloseVerifyEmail = () => {
    setVerifyEmailOpen(false);
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
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <img src="/landingPageIcons/flutter_icon.svg" alt="Flutter Logo" width="56" height="56" />
            </div>

            <div style={{
              background: '#010A10',
              borderRadius: '12px',
              padding: '40px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              maxWidth: '400px',
              width: '100%'
            }}>

              <div>
                <h2 style={{
                  color: '#FFFFFF',
                  fontSize: '20px',
                  fontWeight: '400',
                  marginBottom: '2px',
                  textAlign: 'left',
                  fontFamily: 'Encode Sans, sans-serif'
                }}>
                  Create your account
                </h2>
                <h3 style={{
                  color: '#A6A6A6',
                  fontSize: '14px',
                  fontWeight: '400',
                  marginBottom: '30px',
                  textAlign: 'left',
                  fontFamily: 'Encode Sans, sans-serif'
                }}>
                  Join Flutter Kanpur Community!
                </h3>

                <button style={{
                  width: '100%',
                  padding: '12px',
                  background: '#0F1C25',
                  color: '#FFFFFF',
                  border: '1px solid #2E3942',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                  boxSizing: 'border-box'
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" style={{ marginRight: "10px" }}>
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Continue with Google
                </button>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  margin: '20px 0'
                }}>
                  <div style={{ flex: 1, height: '1px', background: '#E5E8EC', opacity: 0.3 }}></div>
                </div>

                <div style={{ marginBottom: '15px' }}>
                  <input
                    type="text"
                    placeholder="User Name"
                    style={{
                      width: '100%',
                      paddingTop: '12px',
                      paddingBottom: '12px',
                      paddingLeft: '12px',
                      paddingRight: '12px',
                      background: 'transparent',
                      border: '1px solid #2E3942',
                      borderRadius: '8px',
                      color: '#FFFFFF',
                      fontSize: '16px',
                      boxSizing: 'border-box',
                      fontFamily: 'Encode Sans, sans-serif'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '15px', position: 'relative' }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    style={{
                      width: '100%',
                      paddingTop: '12px',
                      paddingBottom: '12px',
                      paddingLeft: '12px',
                      paddingRight: '40px',
                      background: 'transparent',
                      border: '1px solid #2E3942',
                      borderRadius: '8px',
                      color: '#FFFFFF',
                      fontSize: '16px',
                      boxSizing: 'border-box',
                      fontFamily: 'Encode Sans, sans-serif'
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '0'
                    }}
                  >
                    <img
                      src={showPassword ? "/assets/eyeglasses_filled.png" : "/assets/eyeglasses.png"}
                      alt="Toggle password visibility"
                      width="30"
                      height="30"
                      style={{
                        filter: 'brightness(0) saturate(100%) invert(70%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)'
                      }}
                    />
                  </button>
                </div>

                <div style={{ marginBottom: '15px' }}>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    style={{
                      width: '100%',
                      paddingTop: '12px',
                      paddingBottom: '12px',
                      paddingLeft: '12px',
                      paddingRight: '12px',
                      background: 'transparent',
                      border: '1px solid #2E3942',
                      borderRadius: '8px',
                      color: '#FFFFFF',
                      fontSize: '16px',
                      boxSizing: 'border-box',
                      fontFamily: 'Encode Sans, sans-serif'
                    }}
                  />
                </div>

                <div style={{ marginTop: '60px' }}>
                  <ApplyNowButton
                    text="CREATE ACCOUNT"
                    width="100%"
                    height="48px"
                    fontSize="14px"
                    onClick={handleCreateAccount}
                  />
                </div>

                <div style={{
                  textAlign: 'center',
                  marginTop: '20px',
                  color: '#A6A6A6',
                  fontSize: '14px',
                  fontFamily: 'Encode Sans, sans-serif'
                }}>
                  Already have an account?{' '}
                  <button
                    onClick={handleLoginClick}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#FFFFFF',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontFamily: 'Encode Sans, sans-serif'
                    }}
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>

            <div style={{
              textAlign: 'center',
              marginTop: '20px',
              color: '#A6A6A6',
              fontSize: '12px',
              fontFamily: 'Encode Sans, sans-serif'
            }}>
              <div style={{ marginBottom: '0px' }}>
                By creating account you agree to our
              </div>
              <div style={{ marginTop: '0px' }}>
                Terms of Service & Privacy Policy
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <VerifyEmailDialog
        open={verifyEmailOpen}
        onClose={handleCloseVerifyEmail}
        email={userEmail}
      />
    </>
  );
};

export default SignupDialog; 