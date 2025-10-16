'use client';

import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, Backdrop } from '@mui/material';
import ApplyNowButton from "@/components/buttons/ApplyNowButton";

import GoogleButton from "../buttons/continueWithGoogleButton/googleButton";
import InputComponent from "../inputComponent/InputComponent";
import ShowPasswordButtonComponent from "../buttons/customShowPasswordButton/ShowPasswordButtonComponent";
import CustomloginSignUpButton from "../buttons/customComponents/CustomComponents";
import { signInUserWithEmailAndPassword, signInWithGoogle } from "@/lib/firebase/server/auth";
import { isValidEmail } from "@/lib/utils/utils";


const LoginDialog = ({ open, onClose, onShowSignup, setloginData, loginData }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginDisabled, setloginDisabled] = useState(true);


  const handleSignUpClick = () => {
    onClose();
    onShowSignup();
  };

  useEffect(() => {
    if (!isValidEmail(loginData.email)) {
      setloginDisabled(true);
      return;
    }
    if (loginData.email && loginData.password && loginData.password.length >= 6) {
      setloginDisabled(false);
    }
  }, [loginData])

  const handleUserLogin = async () => {
  if (!isValidEmail(loginData.email)) {
    alert("Please enter a valid email");
    return;
  }
  if (!loginData.email || !loginData.password) {
    alert("Please fill all the fields");
    return;
  }
  if (loginData.password.length < 6) {
    alert("Password should be at least 6 characters long");
    return;
  }

  try {
    const response = await signInUserWithEmailAndPassword(
      loginData.email,
      loginData.password
    );

    // If login successful
    if (response && response.user) {
      console.log("User logged in:", response.user);
      onClose(); // close the dialog
      window.location.href = "/"; // redirect to home page
    }
  } catch (err) {
    // Firebase error handling
    if (err.code === "auth/user-not-found") {
      alert("User does not exist. Please sign up first.");
    } else if (err.code === "auth/wrong-password") {
      alert("Incorrect password. Please try again.");
    } else if (err.code === "auth/invalid-email") {
      alert("Invalid email format.");
    } else {
      alert("Login failed. Please try again.");
    }
  }
};



  // console.log(loginData, "login data");
  // consts

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
                  Login to your account
                </h2>
                <h3 style={{
                  color: '#A6A6A6',
                  fontSize: '14px',
                  fontWeight: '400',
                  marginBottom: '30px',
                  textAlign: 'left',
                  fontFamily: 'Encode Sans, sans-serif'
                }}>
                  Welcome Back to Flutter Kanpur!
                </h3>

                <GoogleButton
                  onClick={
                    async () => {
                      await signInWithGoogle();
                      onClose();
                    }}
                />

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    margin: '20px 0'
                  }}>
                  <div style={{ flex: 1, height: '1px', background: '#E5E8EC', opacity: 0.3 }}></div>
                </div>

                <div style={{ marginBottom: '15px' }}>
                  <InputComponent
                    type={"email"}
                    placeholder={"Email - abc@xyz.com"}
                    value={loginData.email}
                    onChange={(e) => { setloginData({ ...loginData, email: e.target.value }) }}
                  />
                </div>

                <div style={{ marginBottom: '15px', position: 'relative' }}>
                  <InputComponent
                    type={showPassword ? "text" : "password"}
                    placeholder={"Password - 123456"}
                    value={loginData.password}
                    onChange={(e) => { setloginData({ ...loginData, password: e.target.value }) }}
                  />
                  <ShowPasswordButtonComponent
                    setShowPassword={setShowPassword}
                    showPassword={showPassword}
                  />
                </div>

                <div style={{ marginTop: '60px' }}>
                  <ApplyNowButton
                    disabled={loginDisabled}
                    text="CONTINUE"
                    width="100%"
                    height="48px"
                    fontSize="14px"
                    onClick={handleUserLogin}
                  />
                </div>

                <CustomloginSignUpButton
                  buttontext={"Sign up"}
                  conditionText={"Don't have an account?"}
                  onClick={handleSignUpClick}
                />

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
        </ DialogContent >
      </Dialog >
    </>
  );
};

export default LoginDialog;