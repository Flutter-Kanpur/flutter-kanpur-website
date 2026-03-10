"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/navigation";
import MPrimaryButton from "@/components/buttons/MPrimaryButton/MPrimaryButton";
import SkillChip from "@/v2components/m-onboarding/SkillChip";
import { useOnboarding } from "@/contexts/OnboardingContext";

export default function RoleSkillSelectorStep({
  step = 2,
  nextRoute = "/m-onboarding/m-Onboarding/screen3",
  title = "What best describes you?",
  subtitle = "Choose one or more.",
}) {
  const router = useRouter();
  const { onboardingData, updateOnboardingData } = useOnboarding();

  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(onboardingData.roles || []);
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [otherValue, setOtherValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const options = useMemo(
    () => [
      "Web Developer",
      "Community Contributor",
      "Student",
      "Flutter Developer",
      "Figma",
      "UI / UX Designer",
    ],
    [],
  );

  // const chipRows = useMemo(
  //   () => [
  //     ["Web Developer", "Community Contributor"],
  //     ["Student", "Flutter Developer", "Figma"],
  //     ["UI / UX Designer"],
  //   ],
  //   [],
  // );

  const [customOptions, setCustomOptions] = useState([]);

  const customOptionsList = customOptions.filter(
    (item) => !options.includes(item),
  );

  const allVisibleOptions = [...options, ...customOptionsList];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allVisibleOptions;

    return allVisibleOptions.filter((t) => t.toLowerCase().includes(q));
  }, [allVisibleOptions, query]);

  const toggleChip = (label) => {
    setSelected((prev) => {
      const updated = prev.includes(label)
        ? prev.filter((x) => x !== label)
        : [...prev, label];

      updateOnboardingData({ roles: updated });
      return updated;
    });
  };

  const addOther = () => {
    const trimmed = otherValue.trim();
    if (!trimmed) return;

    const alreadyExistsInDefault = options.some(
      (item) => item.toLowerCase() === trimmed.toLowerCase(),
    );

    const alreadyExistsInCustom = customOptions.some(
      (item) => item.toLowerCase() === trimmed.toLowerCase(),
    );

    if (!alreadyExistsInDefault && !alreadyExistsInCustom) {
      setCustomOptions((prev) => [...prev, trimmed]);
    }

    setOtherValue("");
    setShowOtherInput(false);
  };

  const cancelOther = () => {
    setOtherValue("");
    setShowOtherInput(false);
  };

  const HORIZONTAL_PADDING = 16 + 16;
  const getChipStyles = (label) => {
    const hugWidths = {
      "Web Developer": 165,
      "Community Contributor": 210,
      Student: 118,
      "Flutter Developer": 170,
      Figma: 108,
      "UI / UX Designer": 170,
    };
    const base = hugWidths[label] || 100;
    const style = {
      width: `${base}px`,
      flex: "0 0 auto",
    };

    if (label === "UI / UX Designer") {
      style.ml = 0.5;
    }
    return style;
  };

  const searchSx = {
    "& .MuiOutlinedInput-root": {
      height: 40,
      width: "100%",
      maxWidth: {
        xs: "100%",
        sm: 325,
      },
      borderRadius: 999,
      backgroundColor: "#FFFFFF",
      fontSize: "14px",
      paddingRight: "10px",
      boxSizing: "border-box",

      "& fieldset": { borderColor: "#D1D1D1" },
      "&:hover fieldset": { borderColor: "#D1D1D1" },
      "&.Mui-focused fieldset": { borderColor: "#4167F2" },
    },

    "& input::placeholder": {
      fontSize: "14px",
      opacity: 1,
      fontWeight: 400,
      color: "#6D6D6D",
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
          overflowX: "hidden",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          boxSizing: "border-box",
          pt: 6,
          pb: 4,
        }}
      >
        {/* Top progress (4 steps) */}
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
                backgroundColor: i < step ? "#4167F2" : "#DCE5FD",
              }}
            />
          ))}
        </Box>

        {/* Title + subtitle */}
        <Typography
          sx={{
            fontSize: 22,
            fontWeight: 700,
            textAlign: "center",
            color: "#000000",
            mb: 0.6,
          }}
        >
          {/*title via props */}
          {title}
        </Typography>

        <Typography
          sx={{
            fontSize: 13.5,
            fontWeight: 400,
            color: "#6D6D6D",
            textAlign: "center",
            mb: 2.6,
          }}
        >
          {/*subtitle via props */}
          {subtitle}
        </Typography>

        {/* Search */}
        <Box sx={{ width: "100%" }}>
          <TextField
            placeholder="Search roles or skills..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            fullWidth
            sx={searchSx}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" sx={{ marginRight: 1 }}>
                  <Image
                    src="/assets/m-onboardingImages/search.svg"
                    alt="search"
                    width={16}
                    height={16}
                  />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Chips container with border */}
        <Box
          sx={{
            width: 325,
            mt: 2,
            px: 2,
            py: 1,
            borderRadius: 4,
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            alignSelf: "center",
            boxSizing: "border-box",
          }}
        >
          {query.trim() && (
            <Typography
              sx={{
                fontSize: 13,
                fontWeight: 500,
                color: "#B2B2B2",
                mb: 0.5,
                px: 1,
              }}
            >
              {filtered.length === 0
                ? "No matching roles found."
                : `${filtered.length} results found`}
            </Typography>
          )}

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px 4px",
              width: "100%",
              alignItems: "flex-start",
              justifyContent: "flex-start",
            }}
          >
            {(query.trim() ? filtered : allVisibleOptions).map((label) => (
              <SkillChip
                key={label}
                label={label}
                active={selected.includes(label)}
                onToggle={toggleChip}
                sx={
                  options.includes(label)
                    ? getChipStyles(label)
                    : {
                        width: "auto",
                        flex: "0 0 auto",
                      }
                }
              />
            ))}

            {showOtherInput && (
              <Box
                sx={{
                  height: 36,
                  borderRadius: "100px",
                  border: "1.5px solid #4167F2",
                  backgroundColor: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  position: "relative",
                  minWidth: 92,
                  maxWidth: 150,
                  pl: "14px",
                  pr: "30px",
                  boxSizing: "border-box",
                  flex: "0 0 auto",
                }}
              >
                <input
                  type="text"
                  value={otherValue}
                  onChange={(e) => setOtherValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addOther();
                    }
                  }}
                  onBlur={() => {
                    if (otherValue.trim()) addOther();
                  }}
                  style={{
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    fontSize: "12px",
                    fontWeight: 300,
                    color: "#2B2B2B",
                    width: "100%",
                    minWidth: 0,
                  }}
                  autoFocus
                />

                <IconButton
                  onClick={cancelOther}
                  size="small"
                  sx={{
                    position: "absolute",
                    right: 6,
                    top: "50%",
                    transform: "translateY(-50%)",
                    padding: 0,
                    width: 18,
                    height: 18,
                  }}
                >
                  <CloseIcon sx={{ fontSize: 14, color: "#2B2B2B" }} />
                </IconButton>
              </Box>
            )}
          </Box>
        </Box>

        {/* Add other */}
        <Box sx={{ width: "100%", maxWidth: 325, mt: "9px", px: 1 }}>
          <Typography
            onClick={() => {
              setShowOtherInput(true);
              if (query.trim()) {
                setOtherValue(query.trim());
              }
            }}
            sx={{
              fontSize: 13,
              fontWeight: 500,
              color: "#4167F2",
              fontStyle: "Bold",
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

                updateOnboardingData({ roles: selected });

                setIsLoading(true);

                setTimeout(() => {
                  router.push(nextRoute);
                }, 400);
              }}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Continue"}
            </MPrimaryButton>
          </Box>

          <Typography
            onClick={() => {
              router.push("/m-onboarding/m-Onboarding/screen3");
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
