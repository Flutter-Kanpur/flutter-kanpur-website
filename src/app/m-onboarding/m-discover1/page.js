"use client";
import React, { useState } from "react";
import { Box, Typography, Button, MobileStepper } from "@mui/material";
import { useRouter } from "next/navigation";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

const STEPS = [
  {
    title: "Discover what's happening",
    subtitle: (
      <>
        Stay updated with meetups, workshops,
        <br />
        and challenges happening in the Flutter
        <br />
        Kanpur community.
      </>
    ),
  },
  {
    title: "Learn and build together",
    subtitle: (
      <>
        Join events, explore teams, and learn <br />
        through real-world discussions and hands- <br />
        on sessions.
      </>
    ),
  },
  {
    title: "Be part of the community",
    subtitle: (
      <>
        Connect with developers and designers, <br />
        contribute to projects, and grow together.
      </>
    ),
  },
];

export default function DiscoverPage() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0); //0,1,2
  const maxSteps = STEPS.length; // 3

  const handleNext = () => {
    if (activeStep < maxSteps - 1) setActiveStep((s) => s + 1);
    else router.push("/m-onboarding/m-SignupDialog"); // ✅ later you can navigate
  };

  const step = STEPS[activeStep];

  return (
    <Box
      sx={{
        height: "100dvh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#fff",
      }}
    >
      <Box
        sx={{
          justifyContent: "right",
        }}
      >
        <Typography
          onClick={() => router.push("/m-onboarding/m-SignupDialog")}
          sx={{
            fontSize: { xs: 14, sm: 17, md: 20 },
            fontWeight: 300,
            textAlign: "right",
            mb: 1,
            px: 3,
            pt: 3,
            color: "#4167F2",
            cursor: "pointer", // ✅ makes it feel clickable
          }}
        >
          Skip
        </Typography>
      </Box>

      {/* ✅ Top area (can be image/illustration). It auto takes remaining height */}
      <Box sx={{ flex: 1 }} />

      {/* ✅ Bottom content area */}
      <Box sx={{ px: 3, pb: 2 }}>
        <Typography
          sx={{
            fontSize: { xs: 20, sm: 22, md: 24 },
            fontWeight: 600,
            textAlign: "center",
            mb: 1,
          }}
        >
          {step.title}
        </Typography>

        <Typography
          sx={{
            fontSize: { xs: 12.5, sm: 13.5, md: 14.5 },
            color: "#777",
            textAlign: "center", // (your current is center; choose one)
            lineHeight: 1.6,
            maxWidth: 360,
            mb: 2,
          }}
        >
          {step.subtitle}
        </Typography>

        {/* ✅ Carousel indicator (dots) */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1, // space between indicators
            mt: 1.5,
          }}
        >
          {Array.from({ length: maxSteps }).map((_, index) => {
            const isActive = index === activeStep;

            return (
              <Box
                key={index}
                sx={{
                  height: 8,
                  width: isActive ? 28 : 8, // ✅ active expands, others stay dot
                  borderRadius: 999,
                  backgroundColor: isActive ? "#0A0A0A" : "#D9D9D9",
                  transition: "width 220ms ease, background-color 220ms ease",
                }}
              />
            );
          })}
        </Box>
      </Box>

      {/* ✅ Bottom fixed button area */}
      <Box
        sx={{
          px: 3,
          pb: "max(16px, env(safe-area-inset-bottom))",
        }}
      >
        
        <Button
          fullWidth
          onClick={handleNext}
          endIcon={<ArrowForwardRoundedIcon sx={{ fontSize: 22 }} />}
          sx={{
            height: 46,
            borderRadius: "100px",
            backgroundColor: "#0A0A0A",
            color: "#fff",
            fontWeight: 600,
            fontSize: 18,
            textTransform: "none",
            boxShadow: "inset 4px 6px 6px rgba(226,226,226,0.2)",

            "& .MuiButton-endIcon": {
              marginLeft: "8px",
            },

            "&:hover": {
              backgroundColor: "#000",
            },
          }}
        >
          {activeStep === maxSteps - 1 ? "Get Started" : "Next"}
        </Button>
      </Box>
    </Box>
  );
}
