"use client";

import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import MPrimaryButton from "@/components/buttons/MPrimaryButton/MPrimaryButton";

export default function SuccessScreen({
  imageSrc = "/assets/m-AuthImages/email-verified.png",
  imageAlt = "Success",
  title = "Email verified",
  subtitle = "Your email address is successfully verified.",
  helperText = "Loading...",
  redirectTo = "/",
  redirectDelay = null,
  showButton = false,
  buttonText = "Continue",
  onButtonClick, // if not provided and redirectTo exists -> uses router.push(redirectTo)
  buttonSx = {},
}) {
  const router = useRouter();

  useEffect(() => {
    //Auto redirect only if BOTH redirectTo and a valid delay are provided
    if (!redirectTo || typeof redirectDelay !== "number" || redirectDelay <= 0)
      return;

    const t = setTimeout(() => {
      router.push(redirectTo);
    }, redirectDelay);

    return () => clearTimeout(t);
  }, [router, redirectTo, redirectDelay]);

  return (
    <Box
      sx={{
        height: "100dvh",
        width: "100%",
        overflow: "hidden",
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
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {/* Success Illustration */}
        <Box
          component="img"
          src={imageSrc}
          alt={imageAlt}
          sx={{
            width: 220,
            height: "auto",
            mb: 3,
            userSelect: "none",
          }}
        />

        <Typography sx={{ fontSize: 22, fontWeight: 800, mb: 1 }}>
          {title}
        </Typography>

        <Typography
          sx={{
            fontSize: 13.5,
            color: "#7A7A7A",
            maxWidth: 260,
            lineHeight: 1.5,
            mb: showButton ? 3 : 5,
          }}
        >
          {subtitle}
        </Typography>

        {!showButton ? (
          <Typography sx={{ fontSize: 16, color: "#4167F2", fontWeight: 500 }}>
            {helperText}
          </Typography>
        ) : (
          <Box sx={{ width: "100%", maxWidth: 325 }}>
            <MPrimaryButton
              sx={buttonSx}
              onClick={() => {
                if (onButtonClick) return onButtonClick();
                if (redirectTo) router.push(redirectTo);
              }}
            >
              {buttonText}
            </MPrimaryButton>
          </Box>
        )}
      </Box>
    </Box>
  );
}
