"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  InputAdornment,
  IconButton,
} from "@mui/material";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/navigation";

import MPrimaryButton from "@/components/buttons/MPrimaryButton/MPrimaryButton";
import SkillChip from "@/v2components/m-onboarding/SkillChip";
import { useOnboarding } from "@/contexts/OnboardingContext";

export default function OnboardingScreen3() {
  const router = useRouter();
  const { onboardingData, updateOnboardingData } = useOnboarding();

  const [experience, setExperience] = useState(onboardingData.experience || "");
  const [selected, setSelected] = useState(onboardingData.skills || []);
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [otherValue, setOtherValue] = useState("");
  const [expOpen, setExpOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const MIN_SKILLS = 3;

  const skills = useMemo(
    () => [
      "Flutter",
      "Dart",
      "Figma",
      "Kubernetes",
      "Docker",
      "Kafka",
      "Prisma",
      "Canva",
      "JavaScript",
      "Mongo",
      "Postgres",
    ],
    [],
  );

  const experienceOptions = useMemo(
    () => ["0-1 year", "1-2 years", "2-3 years", "3-4 years", "4+ years"],
    [],
  );

  const [customSkills, setCustomSkills] = useState([]);

  const allSkills = [...skills, ...customSkills];

  const filteredSkills = useMemo(() => {
    const q = otherValue.trim().toLowerCase();
    if (!q) return allSkills;
    return allSkills.filter((skill) => skill.toLowerCase().includes(q));
  }, [allSkills, otherValue]);

  const toggleChip = (label) => {
    setSelected((prev) => {
      const updated = prev.includes(label)
        ? prev.filter((x) => x !== label)
        : [...prev, label];

      updateOnboardingData({ skills: updated });
      return updated;
    });
  };

  const addOther = () => {
    const trimmed = otherValue.trim();
    if (!trimmed) return;

    const alreadyExistsInDefault = skills.some(
      (item) => item.toLowerCase() === trimmed.toLowerCase(),
    );

    const alreadyExistsInCustom = customSkills.some(
      (item) => item.toLowerCase() === trimmed.toLowerCase(),
    );

    if (!alreadyExistsInDefault && !alreadyExistsInCustom) {
      setCustomSkills((prev) => [...prev, trimmed]);
    }

    setOtherValue("");
    setShowOtherInput(false);
  };

  const cancelOther = () => {
    setOtherValue("");
    setShowOtherInput(false);
  };

  const canContinue = selected.length >= MIN_SKILLS;

  const dropdownSx = {
    "& .MuiOutlinedInput-root": {
      height: 56,
      width: "100%",
      maxWidth: 325,
      borderRadius: "16px",
      backgroundColor: "#FFFFFF",

      "& fieldset": {
        borderColor: "#D9D9D9",
      },
      "&:hover fieldset": {
        borderColor: "#D9D9D9",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#D9D9D9",
      },
    },

    "& .MuiSelect-select": {
      paddingLeft: "18px",
      paddingRight: "44px",
      paddingTop: "16px",
      paddingBottom: "16px",
      fontSize: "14px",
      fontWeight: 400,
      color: experience ? "#111111" : "#A6A6A6",
      display: "flex",
      alignItems: "center",
    },
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
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          boxSizing: "border-box",
          pt: 6,
          pb: 4,
        }}
      >
        {/* Top progress (4 steps) - 3 filled */}
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
                backgroundColor: i <= 2 ? "#4167F2" : "#DCE5FD",
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
          Your skills & experience
        </Typography>

        {/* Subtitle */}
        <Typography
          sx={{
            fontSize: 13.5,
            fontWeight: 400,
            color: "#6D6D6D",
            textAlign: "center",
            mb: 3,
          }}
        >
          Share what you’re comfortable with.
        </Typography>

        {/* Experience dropdown */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            height: 50,
          }}
        >
          <TextField
            select
            value={experience}
            onChange={(e) => {
              const value = e.target.value;
              setExperience(value);
              updateOnboardingData({ experience: value });
            }}
            fullWidth
            sx={dropdownSx}
            SelectProps={{
              displayEmpty: true,
              open: expOpen,
              onOpen: () => setExpOpen(true),
              onClose: () => setExpOpen(false),

              IconComponent: () => null,

              renderValue: (val) => (val ? val : "Years of experience"),

              MenuProps: {
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "right",
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "right",
                },
                disableAutoFocusItem: true,
                PaperProps: {
                  sx: {
                    mt: 1,
                    width: 198,
                    borderRadius: "24px",
                    border: "1px solid #E6E6E6",
                    boxShadow: "0px 8px 24px rgba(0,0,0,0.10)",
                    overflow: "hidden",
                    p: "8px",
                    mr: "6px",
                  },
                },
                MenuListProps: {
                  sx: {
                    p: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  },
                },
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" sx={{ pr: 1 }}>
                  <Box
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpOpen((v) => !v);
                    }}
                    sx={{
                      width: 32,
                      height: 32,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                  >
                    <KeyboardArrowDownRoundedIcon
                      sx={{ color: "#111", fontSize: 22 }}
                    />
                  </Box>
                </InputAdornment>
              ),
            }}
          >
            {experienceOptions.map((opt) => (
              <MenuItem
                key={opt}
                value={opt}
                sx={{
                  borderRadius: "14px",
                  px: "18px",
                  py: 0,
                  height: 48,
                  minHeight: 48,
                  fontSize: 16,
                  fontWeight: 400,
                  color: "#111111",
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: experience === opt ? "#DCE5FD" : "#FFFFFF",

                  "&.Mui-selected": {
                    backgroundColor: "#DCE5FD",
                  },
                  "&.Mui-selected:hover": {
                    backgroundColor: "#DCE5FD",
                  },

                  "&.Mui-focusVisible": {
                    backgroundColor: experience === opt ? "#DCE5FD" : "#FFFFFF",
                  },

                  "&:hover": {
                    backgroundColor: experience === opt ? "#DCE5FD" : "#FFFFFF",
                  },
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span>{opt}</span>

                  {experience === opt && (
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Image
                        src="/assets/m-onboardingImages/check.svg"
                        alt="check"
                        width={20}
                        height={20}
                      />
                    </Box>
                  )}
                </Box>
              </MenuItem>
            ))}
          </TextField>
        </Box>

        {/* Skills label */}
        <Box sx={{ width: "100%", maxWidth: 325, mt: 2.2 }}>
          <Typography
            sx={{
              fontSize: 12.5,
              fontWeight: 600,
              color: "#111",
              mb: 1.2,
            }}
          >
            Add Skills (Minimum 3 skills)
          </Typography>

          {/* Chips grid*/}
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              alignItems: "flex-start",
            }}
          >
            {allSkills.map((label) => (
              <SkillChip
                key={label}
                label={label}
                active={selected.includes(label)}
                onToggle={toggleChip}
                sx={{
                  maxWidth: "calc((100% - 24px) / 4)",
                  flex: "0 1 auto",
                }}
                textSx={{
                  whiteSpace: "nowrap",
                }}
              />
            ))}

            {/* Add other inline input when visible */}
            {showOtherInput && (
              <Box
                sx={{
                  height: 40,
                  borderRadius: "100px",
                  border: "1.5px solid #4167F2",
                  backgroundColor: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  position: "relative",
                  width: "fit-content",
                  minWidth: 92,
                  maxWidth: 170,
                  pl: "18px",
                  pr: "36px",
                  boxSizing: "border-box",
                }}
              >
                <input
                  value={otherValue}
                  onChange={(e) => setOtherValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addOther();
                    }
                    if (e.key === "Escape") cancelOther();
                  }}
                  onBlur={() => {
                    if (otherValue.trim()) addOther();
                  }}
                  style={{
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    fontSize: "14px",
                    fontWeight: 400,
                    color: "#2B2B2B",
                    width: "100%",
                  }}
                  autoFocus
                />

                <IconButton
                  onClick={cancelOther}
                  size="small"
                  sx={{
                    position: "absolute",
                    right: 10,
                    top: "50%",
                    transform: "translateY(-50%)",
                    padding: 0,
                    minWidth: 24,
                  }}
                >
                  <CloseIcon sx={{ fontSize: 18, color: "#2B2B2B" }} />
                </IconButton>
              </Box>
            )}
          </Box>
        </Box>

        {/* Add other */}
        <Box sx={{ width: "100%", maxWidth: 325, mt: 2 }}>
          <Typography
            onClick={() => {
              setShowOtherInput(true);
              if (otherValue.trim()) return;
            }}
            sx={{
              fontSize: 14,
              fontWeight: 500,
              color: "#4167F2",
              cursor: "pointer",
              width: "fit-content",
            }}
          >
            Add other
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
            boxSizing: "border-box",
            gap: 1.6,
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
              onClick={() => {
                if (isLoading) return;

                updateOnboardingData({
                  experience,
                  skills: selected,
                });

                setIsLoading(true);

                setTimeout(() => {
                  router.push("/m-onboarding/m-Onboarding/screen4");
                }, 400);
              }}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Continue"}
            </MPrimaryButton>
          </Box>

          <Typography
            onClick={() => {
              router.push("/m-onboarding/m-Onboarding/screen4");
            }}
            sx={{
              fontSize: 14,
              fontWeight: 500,
              color: "#4167F2",
              cursor: "pointer",
              marginBottom: 6,
            }}
          >
            Skip for now
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
