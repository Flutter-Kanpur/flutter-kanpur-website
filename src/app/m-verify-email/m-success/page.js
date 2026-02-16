"use client";

import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function EmailVerifiedSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => {
      router.push("/"); // ✅ change this route if needed (dashboard/home)
    }, 1600);

    return () => clearTimeout(t);
  }, [router]);

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
        {/* ✅ Success Illustration */}
        <Box
          component="img"
          src="/assets/m-AuthImages/email-verified.png"
          alt="Email Verified"
          sx={{
            width: 220,
            height: "auto",
            mb: 3,
            userSelect: "none",
          }}
        />

        <Typography sx={{ fontSize: 22, fontWeight: 800, mb: 1 }}>
          Email verified
        </Typography>

        <Typography
          sx={{
            fontSize: 13.5,
            color: "#7A7A7A",
            maxWidth: 260,
            lineHeight: 1.5,
            mb: 5,
          }}
        >
          Your email address is successfully verified.
        </Typography>

        <Typography sx={{ fontSize: 16, color: "#4167F2", fontWeight: 500 }}>
          Loading...
        </Typography>
      </Box>
    </Box>
  );
}
