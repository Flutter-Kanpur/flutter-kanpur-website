"use client";

import React, { useMemo, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { useRouter } from "next/navigation";

import { auth } from "@/lib/firebase/server/setup";
import { actionCodeSettings } from "@/lib/firebase/server/auth";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

import MPrimaryButton from "@/components/buttons/MPrimaryButton/MPrimaryButton";

export default function EmailSignupPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [show, setShow] = useState({
    password: false,
    confirmPassword: false,
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // ✅ validations
  const isUsernameValid = form.username.trim().length >= 3;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());
  const isPasswordValid = form.password.length >= 6;
  const isConfirmValid =
    form.confirmPassword.length > 0 && form.confirmPassword === form.password;

  const canSubmit = useMemo(() => {
    return (
      form.username.trim() &&
      form.email.trim() &&
      form.password.trim() &&
      form.confirmPassword.trim()
    );
  }, [form]);

  const handleChange = (key) => (e) => {
    setForm((p) => ({ ...p, [key]: e.target.value }));
    setErrors((p) => ({ ...p, [key]: "" }));
  };

  const validateAll = () => {
    const next = { username: "", email: "", password: "", confirmPassword: "" };

    if (!form.username.trim()) next.username = "Username is required";
    else if (!isUsernameValid)
      next.username = "Username must be at least 3 characters";

    if (!form.email.trim()) next.email = "Email is required";
    else if (!isEmailValid) next.email = "Enter a valid email address";

    if (!form.password) next.password = "Password is required";
    else if (!isPasswordValid)
      next.password = "Password must be at least 6 characters";

    if (!form.confirmPassword) next.confirmPassword = "Confirm your password";
    else if (!isConfirmValid) next.confirmPassword = "Passwords do not match";

    setErrors(next);

    return !Object.values(next).some(Boolean);
  };

  const handleCreateAccount = async () => {
    const ok = validateAll();
    if (!ok) return;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email.trim(),
        form.password,
      );

      await sendEmailVerification(userCredential.user, actionCodeSettings);

      router.push("/verify-email");
    } catch (err) {
      console.error(err);
      setErrors((p) => ({ ...p, email: "Signup failed. Try again." }));
    }
  };

  // ✅ ONE reusable input style
  // ✅ keeps browser suggestions but removes the blue autofill background
  const textFieldSx = {
    "& .MuiOutlinedInput-root": {
      height: 45,
      borderRadius: 3,
      backgroundColor: "#F6F6F6",
      fontSize: "16px",

      "& fieldset": { borderColor: "transparent" },
      "&:hover fieldset": { borderColor: "transparent" },
      "&.Mui-focused fieldset": { borderColor: "#D6D6D6" },
    },

    // ✅ keep browser suggestions but remove blue background (Chrome autofill)
    "& input:-webkit-autofill": {
      WebkitBoxShadow: "0 0 0 1000px #F6F6F6 inset",
      WebkitTextFillColor: "#111",
      caretColor: "#111",
      transition: "background-color 9999s ease-out 0s",
    },
    "& input:-webkit-autofill:hover": {
      WebkitBoxShadow: "0 0 0 1000px #F6F6F6 inset",
    },
    "& input:-webkit-autofill:focus": {
      WebkitBoxShadow: "0 0 0 1000px #F6F6F6 inset",
    },
  };

  const checkIcon = (
    <InputAdornment position="end">
      <CheckCircleRoundedIcon sx={{ color: "#22C55E", fontSize: 20 }} />
    </InputAdornment>
  );

  return (
    <Box
      sx={{
        height: "100dvh",
        width: "100%",
        overflow: "hidden", // no scroll anywhere
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
        boxSizing: "border-box",
        backgroundColor: "#fff",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 420,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 1.6,
        }}
      >
        {/* Mascot */}
        <Box
          component="img"
          src="/assets/bird.png"
          alt="Mascot"
          sx={{
            width: 200, // 👈 make it bigger here
            height: "auto", // ✅ keeps original aspect ratio
            objectFit: "contain",
            userSelect: "none",
            mb: 1.5,
          }}
        />

        <Typography sx={{ fontSize: 22, fontWeight: 800 }}>
          Create your account
        </Typography>

        <Typography
          sx={{
            fontSize: 13.5,
            color: "#7A7A7A",
            textAlign: "center",
            maxWidth: 280,
          }}
        >
          Join Flutter Kanpur and be part of the community.
        </Typography>

        {/* Inputs */}
        <Box
          sx={{
            width: { xs: "100%", sm: 325 },
            maxWidth: 325,
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <TextField
            placeholder="Username"
            value={form.username}
            onChange={handleChange("username")}
            error={Boolean(errors.username)}
            helperText={errors.username}
            fullWidth
            InputProps={{
              endAdornment: isUsernameValid && checkIcon,
              sx: {
                "& input::placeholder": {
                  fontSize: "13px", // 👈 reduce here
                  opacity: 1, // keeps color visible (important in MUI)
                  color: "#6D6D6D", // optional softer color
                },
              },
            }}
            sx={textFieldSx}
          />

          <TextField
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange("email")}
            error={Boolean(errors.email)}
            helperText={errors.email}
            fullWidth
            autoComplete="email" // ✅ keep Gmail suggestion
            InputProps={{
              endAdornment: isEmailValid && checkIcon,
              sx: {
                "& input::placeholder": {
                  fontSize: "13px", // 👈 reduce here
                  opacity: 1, // keeps color visible (important in MUI)
                  color: "#6D6D6D", // optional softer color
                },
              },
            }}
            sx={textFieldSx}
          />

          <TextField
            placeholder="Create Password"
            type={show.password ? "text" : "password"}
            value={form.password}
            onChange={handleChange("password")}
            error={Boolean(errors.password)}
            helperText={errors.password}
            fullWidth
            autoComplete="new-password" // ✅ keeps suggestions but avoids old-password autofill
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() =>
                      setShow((p) => ({ ...p, password: !p.password }))
                    }
                    edge="end"
                    sx={{ color: "#000000" }}
                  >
                    {show.password ? (
                      <VisibilityOffOutlinedIcon />
                    ) : (
                      <VisibilityOutlinedIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
              sx: {
                "& input::placeholder": {
                  fontSize: "13px", // 👈 reduce here
                  opacity: 1, // keeps color visible (important in MUI)
                  color: "#6D6D6D", // optional softer color
                },
              },
            }}
            sx={textFieldSx}
          />

          <TextField
            placeholder="Confirm Password"
            type={show.confirmPassword ? "text" : "password"}
            value={form.confirmPassword}
            onChange={handleChange("confirmPassword")}
            error={Boolean(errors.confirmPassword)}
            helperText={errors.confirmPassword}
            fullWidth
            autoComplete="new-password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() =>
                      setShow((p) => ({
                        ...p,
                        confirmPassword: !p.confirmPassword,
                      }))
                    }
                    edge="end"
                    sx={{ color: "#000000" }}
                  >
                    {show.confirmPassword ? (
                      <VisibilityOffOutlinedIcon />
                    ) : (
                      <VisibilityOutlinedIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
              sx: {
                "& input::placeholder": {
                  fontSize: "13px", // 👈 reduce here
                  opacity: 1, // keeps color visible (important in MUI)
                  color: "#6D6D6D", // optional softer color
                },
              },
            }}
            sx={textFieldSx}
          />
        </Box>

        <Box sx={{ width: "100%", maxWidth: 325, mt: 1 }}>
          <MPrimaryButton onClick={handleCreateAccount} disabled={!canSubmit}>
            Create account
          </MPrimaryButton>
        </Box>

        <Typography sx={{ fontSize: 13.5 }}>
          Already have an account?{" "}
          <Box
            component="span"
            onClick={() => router.push("/m-onboarding/m-login")}
            sx={{ color: "#4167F2", cursor: "pointer", fontWeight: 500 }}
          >
            Log in
          </Box>
        </Typography>
      </Box>
    </Box>
  );
}
