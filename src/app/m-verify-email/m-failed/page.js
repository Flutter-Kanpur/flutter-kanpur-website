"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

import MPrimaryButton from "@/components/buttons/MPrimaryButton/MPrimaryButton";

export default function EmailVerifiedFailedPage() {
  const router = useRouter();

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
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          position: "relative",
        }}
      >
        {/* ❌ Failed Illustration */}
        <Box
          component="img"
          src="/assets/m-AuthImages/email-failed.png"
          alt="Verification Failed"
          sx={{
            width: 220,
            height: "auto",
            mb: 2.5,
            userSelect: "none",
          }}
        />

        <Typography sx={{ fontSize: 22, fontWeight: 800, mb: 1 }}>
          Failed
        </Typography>

        <Typography
          sx={{
            fontSize: 13.5,
            color: "#7A7A7A",
            maxWidth: 260,
            lineHeight: 1.5,
            mb: 6,
          }}
        >
          Something went wrong.
          <br />
          Please try again.
        </Typography>

        {/* Button at bottom */}
        <Box
          sx={{
            position: "absolute",
            bottom: 28,
            left: 0,
            right: 0,
            px: 2,
            boxSizing: "border-box",
          }}
        >
          <Box sx={{ maxWidth: 325, mx: "auto" }}>
            <MPrimaryButton onClick={() => router.push("/verify-email")}>
              Retry
            </MPrimaryButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
