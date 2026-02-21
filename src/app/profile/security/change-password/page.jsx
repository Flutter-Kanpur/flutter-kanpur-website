"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  TextField,
  Typography,
  Button,
  IconButton,
  InputAdornment,
  Alert,
  Stack,
  Fade
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  ErrorOutline,
  WarningAmberRounded
} from "@mui/icons-material";
import RevampButton from "@/components/buttons/revampbutton/RevampButton";
import GradientHeader from "@/components/header/GradientHeader";
import { getAuth, reauthenticateWithCredential, EmailAuthProvider, updatePassword } from "firebase/auth";
import { auth } from "@/firebase/config";

const SUCCESS_IMAGE_PATH = "/images/success_tick.png";

export default function ChangePassword() {
  const router = useRouter();
  const user = auth.currentUser;
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [firebaseError, setFirebaseError] = useState("");
  const [success, setSuccess] = useState(false);
  const isLengthValid = newPassword.length >= 8;
  const isMatchValid = !confirmPassword || newPassword === confirmPassword;

  const handleUpdatePassword = async () => {
    setFirebaseError("");

    if (!user) {
      setFirebaseError("User not logged in.");
      return;
    }

    if (!isLengthValid) {
      return;
    }

    if (!isMatchValid) {
      return;
    }

    try {
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );

      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);

      setSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

    } catch (err) {
      console.error(err);
      setFirebaseError("Current password is incorrect.");
    }
  };
  if (success) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "transparent",
          p: 2,
          pointerEvents: "auto",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "425px",
            textAlign: "center",
            bgcolor: "white",
            borderRadius: "24px",
            p: { xs: 3, sm: 5 },
            boxShadow: { xs: "none", sm: "0px 4px 20px rgba(0,0,0,0.1)" }
          }}
        >
          <Box
            component="img"
            src={SUCCESS_IMAGE_PATH}
            alt="Success"
            sx={{ width: "120px", height: "120px", mb: 3, objectFit: "contain" }}
          />

          <Typography variant="h5" fontWeight="700" gutterBottom sx={{ color: "black" }}>
            Changed successfully
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, px: 1, lineHeight: 1.5 }}>
            Your password has been successfully changed.<br />
            Now you can change it after 14 days.
          </Typography>

          <RevampButton
            text="Back to Login & Security"
            onClick={() => router.push("/profile/security")}
            hasIcon={false}
          />
        </Box>
      </Box>
    );
  }
  return (
    <Box
      sx={{
        maxWidth: 425,
        mx: "auto",
        backgroundColor: "#fff",
        minHeight: "100vh",
        pb: 4,
      }}
    >
      <GradientHeader
        title="Change password"
        onBack={() => router.back()}
        sx={{ mb: '-100px' }}
      />

      <Box
        sx={{
          px: 3,
          pt: 2,
        }}
      >
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Update the password associated with your account.
        </Typography>
        <Stack spacing={2.5}>
          <CustomPasswordField
            label="Current password"
            value={currentPassword}
            setValue={setCurrentPassword}
            show={showCurrent}
            setShow={setShowCurrent}
          />

          <CustomPasswordField
            label="New password"
            value={newPassword}
            setValue={setNewPassword}
            show={showNew}
            setShow={setShowNew}
          />

          <CustomPasswordField
            label="Confirm new password"
            value={confirmPassword}
            setValue={setConfirmPassword}
            show={showConfirm}
            setShow={setShowConfirm}
          />
        </Stack>
        <Stack spacing={2} sx={{ mt: 3 }}>
          {!isLengthValid && (
            <Alert
              icon={<WarningAmberRounded fontSize="small" sx={{ color: "#F57C00" }} />}
              sx={{
                bgcolor: "#FFF8E1",
                color: "#F57C00",
                border: "none",
                borderRadius: "12px",
                alignItems: "center",
                "& .MuiAlert-message": { fontWeight: 500 }
              }}
            >
              Use at least 8 characters.
            </Alert>
          )}
          {!isMatchValid && confirmPassword.length > 0 && (
            <Alert
              severity="error"
              icon={<ErrorOutline fontSize="small" />}
              sx={{
                bgcolor: "#FFEBEE",
                color: "#D32F2F",
                border: "none",
                borderRadius: "12px",
                alignItems: "center",
                "& .MuiAlert-message": { fontWeight: 500 }
              }}
            >
              Confirm password is different.
            </Alert>
          )}
          {firebaseError && (
            <Alert severity="error" sx={{ borderRadius: "12px" }}>
              {firebaseError}
            </Alert>
          )}
        </Stack>
        <RevampButton
          text="Update password"
          onClick={handleUpdatePassword}
        />

        <Button
          fullWidth
          disableRipple
          sx={{
            mt: 2,
            color: "black",
            textTransform: "none",
            fontWeight: "500",
            "&:hover": { bgcolor: "transparent" }
          }}
          onClick={() => router.back()}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
}
function CustomPasswordField({ label, value, setValue, show, setShow }) {
  return (
    <Box>
      <Typography
        variant="subtitle2"
        fontWeight="600"
        sx={{ mb: 1, color: "#111", fontSize: "0.95rem" }}
      >
        {label}

      </Typography>
      <TextField
        fullWidth
        placeholder={show ? "" : "........"}
        type={show ? "text" : "password"}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        variant="outlined"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShow(!show)} edge="end" sx={{ color: "#666" }}>
                {show ? <VisibilityOff sx={{ fontSize: 22 }} /> : <Visibility sx={{ fontSize: 22 }} />}
              </IconButton>
            </InputAdornment>
          ),
          sx: {
            borderRadius: "16px",
            backgroundColor: "transparent",
            fontSize: "1rem",
            "& fieldset": {
              borderColor: "#E0E0E0",
              borderWidth: "1.5px",
            },
            "&:hover fieldset": {
              borderColor: "#BDBDBD",
            },
            "&.Mui-focused fieldset": {
              borderColor: "black",
              borderWidth: "1.5px"
            },
            height: "56px"
          }
        }}
      />


    </Box>
  );
}