"use client";

import React, { useState } from "react";
import { Box, Typography, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import MPrimaryButton from "@/components/buttons/MPrimaryButton/MPrimaryButton";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { auth } from "@/lib/firebase/server/setup";
import {
  uploadAvatarAndGetURL,
  saveFinalOnboardingData,
} from "@/lib/firebase/server/server-actions";

export default function OnboardingScreen4() {
  const router = useRouter();
  const { onboardingData, updateOnboardingData } = useOnboarding();

  const [github, setGithub] = useState(onboardingData.github || "");
  const [linkedin, setLinkedin] = useState(onboardingData.linkedin || "");
  const [portfolio, setPortfolio] = useState(onboardingData.portfolio || "");
  const [isSaving, setIsSaving] = useState(false);

  const getInputSx = (value) => {
    const isFilled = value.trim().length > 0;

    return {
      "& .MuiOutlinedInput-root": {
        height: 52,
        borderRadius: 3,
        fontSize: "14px",
        transition: "all 0.2s ease",
        backgroundColor: isFilled ? "#FFFFFF" : "#F6F6F6",

        "& fieldset": {
          borderColor: isFilled ? "#D1D1D1" : "transparent",
        },

        "&:hover": {
          backgroundColor: isFilled ? "#FFFFFF" : "#F6F6F6",
        },
        "&:hover fieldset": {
          borderColor: isFilled ? "#D1D1D1" : "transparent",
        },

        "&.Mui-focused": {
          backgroundColor: "#FFFFFF",
          boxShadow: "0px 0px 0px 2px #4167F226",
        },
        "&.Mui-focused fieldset": {
          borderColor: "#4167F2",
        },
      },

      "& input": {
        padding: "0 16px",
        color: "#111",
      },
      "& input::placeholder": {
        color: "#7A7A7A",
        opacity: 1,
        fontWeight: 400,
      },
    };
  };

  const handleFinishSetup = async () => {
    try {
      if (isSaving) return;

      setIsSaving(true);

      updateOnboardingData({
        github,
        linkedin,
        portfolio,
      });

      const user = auth.currentUser; //user= logged in user

      if (!user) {
        router.push("/");
        return;
      }

      let finalAvatarUrl = "";

      if (onboardingData.avatarFile) {
        finalAvatarUrl = await uploadAvatarAndGetURL(
          //this function returns downloadURL of the uploaded image
          user.uid,
          onboardingData.avatarFile,
        );
      }

      await saveFinalOnboardingData({
        uid: user.uid,
        username: user.displayName || "",
        fullName: onboardingData.fullName,
        avatarUrl: finalAvatarUrl,
        roles: onboardingData.roles,
        experience: onboardingData.experience,
        skills: onboardingData.skills,
        github,
        linkedin,
        portfolio,
      });

      router.push("/m-onboarding/m-Onboarding/m-finish");
    } catch (error) {
      console.error("Finish setup error:", error);
    } finally {
      setIsSaving(false); //after all the data is saved, set isSaving to false to allow user to click the button again if needed
    }
  };

  return (
    <Box
      sx={{
        height: "100dvh",
        width: "100%",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "stretch",
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
          minHeight: 0,
          overflow: "visible",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          boxSizing: "border-box",
          pt: 6,
          pb: 4,
        }}
      >
        {/* Top progress (4 steps) all filled */}
        <Box
          sx={{
            width: "100%",
            maxWidth: 325,
            display: "flex",
            gap: 1,
            mb: 5,
          }}
        >
          {[0, 1, 2, 3].map((i) => (
            <Box
              key={i}
              sx={{
                flex: 1,
                height: 6,
                borderRadius: 999,
                backgroundColor: "#4167F2",
              }}
            />
          ))}
        </Box>

        {/* Title */}
        <Typography
          sx={{
            fontSize: 22,
            fontWeight: 800,
            textAlign: "center",
            color: "#000000",
            mb: 0.8,
          }}
        >
          Add your work links
        </Typography>

        {/* Subtitle */}
        <Typography
          sx={{
            fontSize: 13.5,
            fontWeight: 400,
            color: "#6D6D6D",
            textAlign: "center",
            mb: 3.2,
          }}
        >
          Optional, but helpful for collaboration.
        </Typography>

        {/* Inputs */}
        <Box
          sx={{
            width: "100%",
            maxWidth: 325,
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <TextField
            value={github}
            onChange={(e) => {
              const value = e.target.value;
              setGithub(value);
              updateOnboardingData({ github: value });
            }}
            placeholder="Github Link"
            fullWidth
            sx={getInputSx(github)}
          />

          <TextField
            value={linkedin}
            onChange={(e) => {
              const value = e.target.value;
              setLinkedin(value);
              updateOnboardingData({ linkedin: value });
            }}
            placeholder="LinkedIn link"
            fullWidth
            sx={getInputSx(linkedin)}
          />

          <TextField
            value={portfolio}
            onChange={(e) => {
              const value = e.target.value;
              setPortfolio(value);
              updateOnboardingData({ portfolio: value });
            }}
            placeholder="Portfolio/Website link"
            fullWidth
            sx={getInputSx(portfolio)}
          />

          <Typography
            sx={{
              mt: 0.3,
              fontSize: 12,
              fontWeight: 500,
              color: "#EF9F20",
            }}
          >
            You can edit these anytime.
          </Typography>
        </Box>

        {/* Bottom CTA + skip */}
        <Box
          sx={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: "max(24px, env(safe-area-inset-bottom))",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            px: 2,
            pb: 8,
            boxSizing: "border-box",
          }}
        >
          <Box
            sx={{
              width: 280,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <MPrimaryButton
              sx={{
                width: "100%",
                borderRadius: "100px",
                overflow: "hidden",
                justifyContent: "center",
              }}
              onClick={handleFinishSetup}
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Finish Setup"}
            </MPrimaryButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
