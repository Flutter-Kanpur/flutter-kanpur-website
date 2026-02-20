"use client";

import { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useRouter } from "next/navigation";
import { fetchDataFromApi } from "@/utils/utils";
import { auth } from "@/firebase/config";
import RevampButton from "@/components/buttons/revampbutton/RevampButton";

const useUser = () => {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { getAuth } = await import("firebase/auth");
        const auth = getAuth();

        const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
          if (!firebaseUser) {
            console.warn("No user logged in");
            setLoadingUser(false);
            return;
          }

          try {
            const idToken = await firebaseUser.getIdToken();

            const res = await fetchDataFromApi({
              url: "/api/me",
              method: "GET",
              headers: {
                Authorization: `Bearer ${idToken}`
              }
            });

            if (res.data?.success) {
              setUser(res.data.user);
            }
          } catch (error) {
            console.error("User fetch error:", error);
          } finally {
            setLoadingUser(false);
          }
        });

        return () => unsubscribe();
      } catch (error) {
        console.error("Error initializing auth:", error);
        setLoadingUser(false);
      }
    };

    getUser();
  }, []);

  return { user, loadingUser };
};


export default function ChangeEmailPage() {
  const router = useRouter();
  const { user, loadingUser } = useUser();
  const [step, setStep] = useState("input");
  const [showToast, setShowToast] = useState(false);
  const [isError, setIsError] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [serverOtp, setServerOtp] = useState(null);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(34);
  const otpRefs = [useRef(), useRef(), useRef(), useRef()];

  useEffect(() => {
    let interval;
    if (step === "verify" && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const handleSendCode = async (isResend = false) => {
    if (!newEmail) return;
    setLoading(true);
    setIsError(false);

    try {
      const res = await fetch("/api/sendOtp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newEmail }),
      });
      const data = await res.json();

      if (data.success) {
        setServerOtp(data.debugOtp);
        setShowToast(true);
        setLoading(false);
        setTimer(34); // Reset timer
        setOtp(["", "", "", ""]); // Clear OTP inputs
        if (!isResend) {
          setTimeout(() => {
            setStep("verify");
            setShowToast(false);
          }, 1500);
        } else {
          setTimeout(() => setShowToast(false), 2000);
        }
      } else {
        alert("Failed to send code");
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    const enteredCode = otp.join("");

    try {
      const { getAuth } = await import("firebase/auth");
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (!currentUser) {
        console.error("User not authenticated");
        return;
      }

      const token = await currentUser.getIdToken(true); // Force fresh token

      const res = await fetchDataFromApi({
        url: "/api/verifyOtp",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        data: {
          email: newEmail,
          otp: enteredCode,
        },
      });

      if (res.data.success) {
        // Re-authenticate user with custom token to prevent logout
        if (res.data.customToken) {
          try {
            const { signInWithCustomToken } = await import("firebase/auth");
            await signInWithCustomToken(auth, res.data.customToken);
          } catch (e) {
            console.log("Re-auth after email change:", e.message);
          }
        }
        setStep("success");
      } else {
        alert(res.data.error || "Verification failed");
        setIsError(true);
      }
    } catch (error) {
      const errorMsg = error.response?.data?.error || error.message || "Verification failed";
      console.error("Verification error:", errorMsg);
      alert(errorMsg);
      setIsError(true);
    }
  };

  const handleOtpChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 3) {
      otpRefs[index + 1].current.focus();
    }
  };
  const SuccessToast = () => (
    <Box
      sx={{
        backgroundColor: "#e6f4ea",
        color: "#1e8e3e",
        p: 2,
        borderRadius: 2,
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        mt: 2,
        mb: 2,
      }}
    >
      <CheckCircleOutlineIcon sx={{ fontSize: 20 }} />
      <Typography sx={{ fontWeight: 500, fontSize: "14px" }}>
        Verification code sent
      </Typography>
    </Box>
  );
  const ErrorBox = () => (
    <Box
      sx={{
        backgroundColor: "#d93025",
        color: "#fff",
        p: 1.5,
        borderRadius: 2,
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        mb: 3,
      }}
    >
      <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
        ⚠ Incorrect code. Please try again.
      </Typography>
    </Box>
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        p: { xs: 2, sm: 3 },
        pointerEvents: "auto",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "425px",
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {step === "success" ? (
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              mt: -5,
              bgcolor: "#e6f4ea",
            }}
          >
            <img
              src="/images/success_tick.png"
              alt="Success"
              style={{ width: 120, height: 120, marginBottom: 24 }}
            />

            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1.5 }}>
              Updated successfully
            </Typography>

            <Typography sx={{ color: "#666", fontSize: "15px", px: 2, mb: 4 }}>
              Your email has been successfully updated. <br />
              Now you can change it after 14 days.
            </Typography>

            <Button
              variant="outlined"
              onClick={() => router.push("/profile/security")}
              sx={{
                borderRadius: "30px",
                textTransform: "none",
                color: "#000",
                borderColor: "#e0e0e0",
                px: 4,
                py: 1.2,
                fontSize: "15px",
                "&:hover": { borderColor: "#000", backgroundColor: "transparent" }
              }}
            >
              ← Back to Login & Security
            </Button>
          </Box>
        ) : (
          <>
            <Box sx={{ mb: 4, mt: 1 }}>
              <IconButton
                onClick={() => step === "verify" ? setStep("input") : router.back()}
                sx={{ ml: -1, color: "#000" }}
              >
                <ArrowBackIcon />
              </IconButton>
            </Box>

            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
              {step === "input" ? "Change email address" : "Verify your new email"}
            </Typography>

            <Typography sx={{ color: "#666", fontSize: "15px", mb: 4 }}>
              {step === "input"
                ? "Update the email associated with your account."
                : "Enter the 4-digit code sent to your email."}
            </Typography>
            {step === "input" && (
              <>
                <Typography sx={{ fontWeight: 600, fontSize: "15px", mb: 1 }}>
                  Current email
                </Typography>
                {loadingUser ? (
                  <CircularProgress size={24} />
                ) : (
                  <TextField
                    fullWidth
                    value={user?.email || ""}
                    disabled
                    variant="outlined"
                    sx={{
                      mb: 3,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                        backgroundColor: "#fff"
                      }
                    }}
                  />
                )}
                <Typography sx={{ fontWeight: 600, fontSize: "15px", mb: 1 }}>
                  New email address
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Enter new email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  variant="outlined"
                  sx={{
                    mb: 2,
                    "& .MuiOutlinedInput-root": { borderRadius: "12px", backgroundColor: "#fff" }
                  }}
                />

                {showToast && <SuccessToast />}
                {!showToast && (
                  <Box sx={{
                    backgroundColor: "#fff8e1",
                    color: "#f57c00",
                    p: 2,
                    borderRadius: 3,
                    display: "flex",
                    gap: 1.5,
                    mb: 4
                  }}>
                    <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
                      ⚠ We'll send a verification code to your new email.
                    </Typography>
                  </Box>
                )}

                <Box sx={{ flexGrow: 1 }} />

                <RevampButton
                  text={loading ? "Sending..." : "Send code"}
                  onClick={() => handleSendCode(false)}
                  disabled={loading || !newEmail}
                />

                <Button
                  fullWidth
                  onClick={() => router.back()}
                  sx={{ mt: 2, color: "#000", textTransform: "none", fontSize: "15px" }}
                >
                  Cancel
                </Button>
              </>
            )}

            {step === "verify" && (
              <>
                <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
                  {otp.map((digit, index) => (
                    <TextField
                      key={index}
                      inputRef={otpRefs[index]}
                      value={digit}
                      onChange={(e) => handleOtpChange(e.target.value, index)}
                      inputProps={{
                        maxLength: 1,
                        style: { textAlign: "center", fontSize: "24px", fontWeight: "bold" },
                      }}
                      sx={{
                        width: "60px",
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                          backgroundColor: digit ? "#4879F5" : "#fff", // Blue bg when active/filled (Matches Image 3/4)
                          color: digit ? "#fff" : "#000",
                          "& fieldset": { borderColor: digit ? "#4879F5" : "#ccc" },
                        },
                      }}
                    />
                  ))}
                </Box>
                {isError && <ErrorBox />}

                <Box sx={{ flexGrow: 1 }} />

                <RevampButton
                  text="Verify"
                  onClick={handleVerify}
                />

                {timer > 0 ? (
                  <Typography align="center" sx={{ color: "#000", fontWeight: 500 }}>
                    Resend code in {timer}s
                  </Typography>
                ) : (
                  <Typography
                    align="center"
                    onClick={() => handleSendCode(true)}
                    sx={{ color: "#2373E2", fontWeight: 600, cursor: "pointer" }}
                  >
                    Resend code
                  </Typography>
                )}
              </>
            )}
          </>
        )}
      </Box>
    </Box>
  );
}