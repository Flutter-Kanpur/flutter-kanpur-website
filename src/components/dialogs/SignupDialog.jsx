'use client';

import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, Backdrop } from '@mui/material';
import ApplyNowButton from "@/components/buttons/ApplyNowButton";
import VerifyEmailDialog from "./VerifyEmailDialog";
import GoogleButton from "../buttons/continueWithGoogleButton/googleButton";
import InputComponent from "../inputComponent/InputComponent";
import ShowPasswordButtonComponent from "../buttons/customShowPasswordButton/ShowPasswordButtonComponent";
import CustomloginSignUpButton from "../buttons/customComponents/CustomComponents";
import { signInWithGoogle } from "@/lib/firebase/server/auth";
import { isValidEmail } from "@/lib/utils/utils";
import { createUserWithEmailAndPassword, sendEmailVerification, getAuth } from "firebase/auth";
import { useRouter } from "next/navigation"; // ✅ Import useRouter

const SignupDialog = ({ open, onClose, onShowLogin, signUpData, setSignUpData }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [verifyEmailOpen, setVerifyEmailOpen] = useState(false);
  const [signUpDisabled, setsignUpDisabled] = useState(true);

  const auth = getAuth();
  const router = useRouter(); // ✅ Define router inside the component

  const handleLoginClick = () => {
    onClose();
    onShowLogin();
  };

  useEffect(() => {
    if (!isValidEmail(signUpData.email)) {
      setsignUpDisabled(true);
      return;
    }
    if (
      signUpData.email &&
      signUpData.password &&
      signUpData.confirmPassword &&
      signUpData.password === signUpData.confirmPassword &&
      signUpData.password.length >= 6
    ) {
      setsignUpDisabled(false);
    } else {
      setsignUpDisabled(true);
    }
  }, [signUpData]);

  const handleCreateAccount = async () => {
    const { email, password, confirmPassword } = signUpData;

    if (password !== confirmPassword || password.length < 6) {
      alert("Passwords do not match or are too short!");
      return;
    }

    try {
      // ✅ Create user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // ✅ Save email to localStorage for verification
      localStorage.setItem("emailForSignUp", email);

      // ✅ Send verification email
      await sendEmailVerification(user);
      alert("✅ Verification email sent!");

      // ✅ Open VerifyEmailDialog
      setVerifyEmailOpen(true);
      // ❌ REMOVE router.push("/verify-email") because dialog opens directly
      // router.push("/verify-email"); <-- removed
    } catch (error) {
      console.error("Error signing up:", error);
      alert(error.message);
    }
  };

  const handleCloseVerifyEmail = () => {
    setVerifyEmailOpen(false);
  };

  return (
    <>
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
        BackdropProps={{ style: { backgroundColor: 'transparent' } }}
      >
        <DialogContent
          style={{
            padding: 0,
            backgroundColor: 'transparent',
            overflow: 'auto',
            maxHeight: '100vh'
          }}
        >
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

              <GoogleButton onClick={async () => { await signInWithGoogle(); onClose(); }} />

              <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0' }}>
                <div style={{ flex: 1, height: '1px', background: '#E5E8EC', opacity: 0.3 }}></div>
              </div>

              <InputComponent
                type="email"
                placeholder="Email - abc@xyz.com"
                value={signUpData.email}
                onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
              />

              <div style={{ marginBottom: '15px', position: 'relative' }}>
                <InputComponent
                  type={showPassword ? "text" : "password"}
                  placeholder="Password - 123456"
                  value={signUpData.password}
                  onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                />
                <ShowPasswordButtonComponent setShowPassword={setShowPassword} showPassword={showPassword} />
              </div>

              <InputComponent
                type="password"
                placeholder="Confirm Password"
                value={signUpData.confirmPassword}
                onChange={(e) => setSignUpData({ ...signUpData, confirmPassword: e.target.value })}
              />

              <div style={{ marginTop: '60px' }}>
                <ApplyNowButton
                  disabled={signUpDisabled}
                  text="CREATE ACCOUNT"
                  width="100%"
                  height="48px"
                  fontSize="14px"
                  onClick={handleCreateAccount}
                />
              </div>

              <CustomloginSignUpButton
                buttontext="Login"
                conditionText="Already have an account?"
                onClick={handleLoginClick}
              />
            </div>

            <div style={{
              textAlign: 'center',
              marginTop: '20px',
              color: '#A6A6A6',
              fontSize: '12px',
              fontFamily: 'Encode Sans, sans-serif'
            }}>
              <div>By creating account you agree to our</div>
              <div>Terms of Service & Privacy Policy</div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* ✅ Verify Email Dialog */}
      <VerifyEmailDialog
        open={verifyEmailOpen}
        onClose={handleCloseVerifyEmail}
        email={signUpData.email} // pass email as prop
      />
    </>
  );
};

export default SignupDialog;
