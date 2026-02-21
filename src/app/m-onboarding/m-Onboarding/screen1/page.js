"use client";

import React, { useMemo, useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Box, Typography, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import MPrimaryButton from "@/components/buttons/MPrimaryButton/MPrimaryButton";

export default function OnboardingScreen1() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const canContinue = useMemo(() => fullName.trim().length > 0, [fullName]);
  const [isLoading, setIsLoading] = useState(false);

  // ✅ name error (NEW)
  const [nameError, setNameError] = useState("");

  // ✅ bottom sheet open/close
  const [openSheet, setOpenSheet] = useState(false);

  // ✅ image state (selected profile pic)
  const [avatarUrl, setAvatarUrl] = useState(null);

  // ✅ hidden inputs for gallery + camera
  const galleryInputRef = useRef(null);
  const cameraInputRef = useRef(null);
  const showNameTick = fullName.trim().length >= 6;

  const [openCamera, setOpenCamera] = useState(false);
  const videoRef = useRef(null);

  // ✅ confirm remove popup (NEW)
  const [openRemoveConfirm, setOpenRemoveConfirm] = useState(false);

  // ✅ cleanup object URLs to avoid memory leak
  useEffect(() => {
    return () => {
      if (avatarUrl?.startsWith("blob:")) URL.revokeObjectURL(avatarUrl);
    };
  }, [avatarUrl]);

  // ✅ common file handler
  const handleFile = (file) => {
    if (!file) return;

    // only accept images
    if (!file.type.startsWith("image/")) return;

    // clear previous object URL (if any)
    setAvatarUrl((prev) => {
      if (prev?.startsWith("blob:")) URL.revokeObjectURL(prev);
      return prev;
    });

    const url = URL.createObjectURL(file);
    setAvatarUrl(url);
  };

  const handleGalleryPick = (e) => {
    const file = e.target.files?.[0];
    handleFile(file);
    setOpenSheet(false);

    // allow selecting same file again later
    e.target.value = "";
  };

  const [isNameFocused, setIsNameFocused] = useState(false);

  const handleCameraPick = (e) => {
    const file = e.target.files?.[0];
    handleFile(file);
    setOpenSheet(false);

    // allow selecting same file again later
    e.target.value = "";
  };

  // ✅ now opens confirm popup instead of deleting directly (UPDATED)
  const handleRemovePicture = () => {
    setOpenSheet(false);
    setOpenRemoveConfirm(true);
  };

  // ✅ confirm delete (NEW)
  const confirmRemovePicture = () => {
    setAvatarUrl((prev) => {
      if (prev?.startsWith("blob:")) URL.revokeObjectURL(prev);
      return null;
    });
    setOpenRemoveConfirm(false);
  };

  // ✅ cancel delete (NEW)
  const cancelRemovePicture = () => {
    setOpenRemoveConfirm(false);
  };

  // Input style (matches your current auth inputs)
  const textFieldSx = {
    "& .MuiOutlinedInput-root": {
      height: 46,
      borderRadius: 3,
      backgroundColor: "#F6F6F6",
      fontSize: "16px",

      "& fieldset": { borderColor: "transparent" },
      "&:hover fieldset": { borderColor: "transparent" },
      "&.Mui-focused fieldset": { borderColor: "#D6D6D6" },

      "& input": {
        // fontFamily: "var(--font-product-sans)",
        fontWeight: 450,
        fontSize: "13px",
        lineHeight: "20px",
        letterSpacing: "0%",
        color: "#000000",
      },

      "& input::placeholder": {
        fontSize: "13px",
        opacity: 1,
        fontWeight: 500,
        color: "#6D6D6D",
      },
    },

    //red border when error
    "& .MuiOutlinedInput-root.Mui-error fieldset": {
      borderColor: "#CC3333",
    },
    "& .MuiOutlinedInput-root.Mui-error:hover fieldset": {
      borderColor: "#CC3333",
    },

    //helper text styling
    "& .MuiFormHelperText-root": {
      marginLeft: 0,
      marginTop: 8,
      fontSize: 12,
      color: "#CC3333",
      display: "flex",
      alignItems: "center",
      gap: 6,
    },

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

  // start camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false,
      });

      setOpenCamera(true);

      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }, 100);
    } catch (err) {
      console.error("Camera access denied", err);
    }
  };

  // capture photo
  const capturePhoto = () => {
    const video = videoRef.current;
    if (!video) return;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);

    const dataUrl = canvas.toDataURL("image/png");
    setAvatarUrl(dataUrl);

    const tracks = video.srcObject?.getTracks();
    tracks?.forEach((t) => t.stop());

    setOpenCamera(false);
    setOpenSheet(false);
  };

  const nameTick = (
    <Box sx={{ display: "flex", alignItems: "center", pr: 1 }}>
      <Image
        src="/assets/m-onboardingImages/green-tick.svg"
        alt="valid"
        width={18}
        height={18}
        style={{ display: "block" }}
      />
    </Box>
  );

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
      {/*hidden inputs (REAL LOGIC) */}
      <input
        ref={galleryInputRef}
        type="file"
        accept="image/*"
        onChange={handleGalleryPick}
        style={{ display: "none" }}
      />

      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleCameraPick}
        style={{ display: "none" }}
      />

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
                backgroundColor: i === 0 ? "#4167F2" : "#DCE5FD",
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
          Let&apos;s set up your profile
        </Typography>

        <Typography
          sx={{
            fontSize: 13.5,
            fontWeight: 500,
            color: "#6D6D6D",
            textAlign: "center",
            mb: 4,
          }}
        >
          Start with the basics.
        </Typography>

        {/* Avatar + plus badge */}
        <Box
          sx={{
            position: "relative",
            width: 88,
            height: 88,
            borderRadius: "50%",
            backgroundColor: "#F2F2F2",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt="profile selected"
              fill
              style={{ objectFit: "cover" }}
            />
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 0.5,
              }}
            >
              <svg
                width="32"
                height="46"
                viewBox="0 0 32 46"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="16" cy="10" r="10" fill="black" />
                <ellipse cx="16" cy="34.5" rx="16" ry="11.5" fill="black" />
              </svg>
            </Box>
          )}

          {/* Plus badge (click opens bottom sheet) */}
          <Box
            onClick={() => setOpenSheet(true)}
            sx={{
              position: "absolute",
              right: 6,
              bottom: 6,
              width: 20,
              height: 20,
              borderRadius: "50%",
              backgroundColor: "#4167F2",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <Image
              src="/assets/m-onboardingImages/blue-plus.png"
              alt="add"
              width={12}
              height={12}
              style={{ display: "block" }}
            />
          </Box>
        </Box>

        {/* Username */}
        <Typography
          sx={{
            // fontFamily: "var(--font-product-sans)",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "20px",
            letterSpacing: "0%",
            color: "#000000",
            mb: 0.8,
          }}
        >
          angie21_
        </Typography>

        {/* Input */}
        <Box sx={{ width: "100%", maxWidth: 325 }}>
          <TextField
            placeholder="Full name"
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
              if (nameError) setNameError("");
            }}
            onFocus={() => setIsNameFocused(true)}
            onBlur={() => setIsNameFocused(false)}
            fullWidth
            error={Boolean(nameError)}
            helperText={
              nameError ? (
                <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Box
                    component="svg"
                    viewBox="0 0 16 15"
                    xmlns="http://www.w3.org/2000/svg"
                    sx={{
                      width: 14,
                      height: 13,
                      flexShrink: 0,
                      display: "block",
                    }}
                  >
                    <path
                      d="M16.6498 13.2251L10.5009 2.54677C10.3473 2.28515 10.1279 2.06823 9.86463 1.91751C9.60131 1.76679 9.30318 1.6875 8.99978 1.6875C8.69638 1.6875 8.39824 1.76679 8.13493 1.91751C7.87161 2.06823 7.65226 2.28515 7.49861 2.54677L1.34978 13.2251C1.20194 13.4782 1.12402 13.766 1.12402 14.059C1.12402 14.3521 1.20194 14.6399 1.34978 14.8929C1.50146 15.1561 1.72044 15.3742 1.98425 15.5249C2.24806 15.6755 2.54719 15.7532 2.85095 15.75H15.1486C15.4521 15.753 15.751 15.6751 16.0145 15.5245C16.278 15.3739 16.4968 15.1559 16.6484 14.8929C16.7964 14.64 16.8746 14.3523 16.8748 14.0592C16.8751 13.7662 16.7974 13.4783 16.6498 13.2251ZM8.43728 7.31255C8.43728 7.16336 8.49654 7.02029 8.60203 6.9148C8.70752 6.80931 8.85059 6.75005 8.99978 6.75005C9.14896 6.75005 9.29204 6.80931 9.39753 6.9148C9.50301 7.02029 9.56228 7.16336 9.56228 7.31255V10.125C9.56228 10.2742 9.50301 10.4173 9.39753 10.5228C9.29204 10.6283 9.14896 10.6875 8.99978 10.6875C8.85059 10.6875 8.70752 10.6283 8.60203 10.5228C8.49654 10.4173 8.43728 10.2742 8.43728 10.125V7.31255ZM8.99978 13.5C8.8329 13.5 8.66977 13.4506 8.53102 13.3578C8.39226 13.2651 8.28412 13.1334 8.22025 12.9792C8.15639 12.825 8.13968 12.6554 8.17224 12.4917C8.2048 12.328 8.28516 12.1777 8.40316 12.0597C8.52116 11.9417 8.6715 11.8613 8.83517 11.8288C8.99884 11.7962 9.16849 11.8129 9.32267 11.8768C9.47684 11.9406 9.60862 12.0488 9.70133 12.1875C9.79404 12.3263 9.84353 12.4894 9.84353 12.6563C9.84353 12.8801 9.75463 13.0947 9.5964 13.2529C9.43816 13.4112 9.22355 13.5 8.99978 13.5Z"
                      fill="#CC3333"
                    />
                  </Box>

                  <Box component="span">{nameError}</Box>
                </Box>
              ) : (
                ""
              )
            }
            sx={{
              ...textFieldSx,

              "& .MuiOutlinedInput-root": {
                height: 46,
                borderRadius: 3,
                fontSize: "14px",
                marginTop: 2,

                // 1) default: unfilled + unselected => grey bg, NO border/outline
                backgroundColor:
                  isNameFocused ||
                  fullName.trim().length > 0 ||
                  Boolean(nameError)
                    ? "#FFFFFF"
                    : "#F6F6F6",

                "& fieldset": {
                  borderColor:
                    isNameFocused || fullName.trim().length > 0
                      ? "#4167F2"
                      : "transparent",
                  borderWidth: "1px",
                },

                // 2) focused / typing => blue border + outline shadow
                "&.Mui-focused": {
                  boxShadow: Boolean(nameError)
                    ? "none"
                    : "0px 0px 0px 2px #276FD42B",
                },
                "&.Mui-focused fieldset": {
                  borderColor: Boolean(nameError) ? "#CC3333" : "#4167F2",
                  borderWidth: "1px",
                },

                // 3) filled (after typing + blur) => keep blue border + outline shadow
                // (applies when NOT focused but filled)
                ...(fullName.trim().length > 0 &&
                !isNameFocused &&
                !Boolean(nameError)
                  ? { boxShadow: "0px 0px 0px 2px #276FD42B" }
                  : {}),

                // 4) error => white bg, red border, NO outline
                "&.Mui-error": {
                  boxShadow: "none",
                },
                "&.Mui-error fieldset": {
                  borderColor: "#CC3333",
                  borderWidth: "1px",
                },

                // keep hover from adding borders
                "&:hover fieldset": {
                  borderColor: Boolean(nameError)
                    ? "#CC3333"
                    : isNameFocused || fullName.trim().length > 0
                      ? "#4167F2"
                      : "transparent",
                },
              },

              "& .MuiFormHelperText-root": {
                marginLeft: 0,
                marginTop: "8px",
                fontWeight: 500,
                fontSize: "12px",
                lineHeight: "20px",
                letterSpacing: "0%",
                color: "#CC3333",
              },
            }}
          />
        </Box>

        {/* Bottom button fixed near bottom */}
        <Box
          sx={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: "max(24px, env(safe-area-inset-bottom))",
            display: "flex",
            justifyContent: "center",
            px: 2,
            boxSizing: "border-box",
          }}
        >
          <Box sx={{ width: "100%", maxWidth: 325 }}>
            <MPrimaryButton
              onClick={() => {
                if (isLoading) return; //prevents double click

                if (!fullName.trim()) {
                  setNameError("Please enter your name.");
                  return;
                }

                setIsLoading(true); //show loading state

                // simulate navigation delay (optional but recommended)
                setTimeout(() => {
                  router.push("/m-onboarding/m-Onboarding/screen2");
                }, 400);
              }}
              sx={{
                opacity: canContinue ? 1 : 0.6,
                pointerEvents: isLoading ? "none" : "auto", //disable spam clicks
              }}
            >
              {isLoading ? "Loading..." : "Continue"}
            </MPrimaryButton>
          </Box>
        </Box>

        {/*Bottom Sheet UI + REAL actions */}
        {openSheet && (
          <>
            {/* Overlay */}
            <Box
              onClick={() => setOpenSheet(false)}
              sx={{
                position: "fixed",
                inset: 0,
                zIndex: 55,
                backgroundColor: "rgba(0,0,0,0.35)",
              }}
            />

            {/* Sheet */}
            <Box
              sx={{
                position: "fixed",
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 60,
                backgroundColor: "#FFFFFF",
                borderTopLeftRadius: 24,
                borderTopRightRadius: 24,
                px: 2.5,
                pt: 1.5,
                pb: "max(18px, env(safe-area-inset-bottom))",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Handle */}
              <Box
                sx={{
                  width: 54,
                  height: 5,
                  borderRadius: 999,
                  backgroundColor: "#000000",
                  opacity: 0.2,
                  mx: "auto",
                  mb: 2,
                }}
              />

              {/* Items */}
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: 2, pb: 1 }}
              >
                {/* Import from gallery */}
                <Box
                  onClick={() => galleryInputRef.current?.click()}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    cursor: "pointer",
                  }}
                >
                  <Image
                    src="/assets/m-onboardingImages/import.png"
                    alt="import"
                    width={18}
                    height={18}
                  />
                  <Typography
                    sx={{ fontSize: 14, color: "#000000", fontWeight: 400 }}
                  >
                    Import from gallery
                  </Typography>
                </Box>

                {/* Take photo */}
                <Box
                  onClick={startCamera}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    cursor: "pointer",
                  }}
                >
                  <Image
                    src="/assets/m-onboardingImages/camera.png"
                    alt="camera"
                    width={18}
                    height={18}
                  />
                  <Typography
                    sx={{ fontSize: 14, color: "#000000", fontWeight: 400 }}
                  >
                    Take photo
                  </Typography>
                </Box>

                {/* Remove current picture */}
                <Box
                  onClick={handleRemovePicture}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    cursor: "pointer",
                  }}
                >
                  <Image
                    src="/assets/m-onboardingImages/delete.png"
                    alt="delete"
                    width={18}
                    height={18}
                  />
                  <Typography
                    sx={{ fontSize: 14, color: "#CC3333", fontWeight: 400 }}
                  >
                    Remove current picture
                  </Typography>
                </Box>
              </Box>
            </Box>
          </>
        )}

        {/* ✅ Confirm Remove Popup (EXACT UI) */}
        {openRemoveConfirm && (
          <>
            {/* Overlay */}
            <Box
              onClick={cancelRemovePicture}
              sx={{
                position: "fixed",
                inset: 0,
                zIndex: 80,
                backgroundColor: "rgba(0,0,0,0.35)",
              }}
            />

            {/* Popup */}
            <Box
              onClick={(e) => e.stopPropagation()}
              sx={{
                position: "fixed",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 85,
                width: "calc(100% - 64px)",
                maxWidth: 313,
                backgroundColor: "#FFFFFF",
                borderRadius: 8,
                px: 2.5,
                py: 2.2,
                textAlign: "center",
                boxSizing: "border-box",
              }}
            >
              <Typography
                sx={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: "#000000",
                  mb: 0.8,
                }}
              >
                Remove?
              </Typography>

              <Typography
                sx={{
                  fontSize: 12.5,
                  fontWeight: 400,
                  color: "#6D6D6D",
                  lineHeight: 1.4,
                  mb: 2,
                }}
              >
                Are you sure want to remove the <br />
                profile photo?
              </Typography>

              {/* Delete button */}
              <Box
                onClick={confirmRemovePicture}
                sx={{
                  width: "100%",
                  height: 40,
                  borderRadius: 999,
                  background:
                    "linear-gradient(180deg, #E36A6A 0%, #CC3333 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  mb: 1.1,
                }}
              >
                <Typography
                  sx={{ fontSize: 13.5, fontWeight: 500, color: "#FFFFFF" }}
                >
                  Delete
                </Typography>
              </Box>

              {/* Cancel */}
              <Typography
                onClick={cancelRemovePicture}
                sx={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: "#CC3333",
                  cursor: "pointer",
                }}
              >
                Cancel
              </Typography>
            </Box>
          </>
        )}

        {openCamera && (
          <Box
            sx={{
              position: "fixed",
              inset: 0,
              zIndex: 70,
              backgroundColor: "#000000",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <video
              ref={videoRef}
              autoPlay
              playsInline
              style={{
                width: "100%",
                maxWidth: 420,
                borderRadius: 12,
              }}
            />

            <Box
              onClick={capturePhoto}
              sx={{
                mt: 2,
                width: 70,
                height: 70,
                borderRadius: "100px",
                backgroundColor: "#FFFFFF",
                cursor: "pointer",
              }}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
}
