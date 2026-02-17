// "use client";

// import { Box, Typography, Button, Paper, Dialog } from "@mui/material";
// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import { auth } from "@/lib/firebase/server/setup";
// import GoogleButton from "@/components/buttons/continueWithGoogleButton/googleButton";
// import { checkUserExistsInFirestore } from "@/lib/firebase/server/server-actions";
// import {
//   actionCodeSettings,
//   signInWithGoogle,
// } from "@/lib/firebase/server/auth";
// import {
//   createUserWithEmailAndPassword,
//   sendEmailVerification,
// } from "firebase/auth";

// const MSignupDialog = ({
//   open,
//   onClose,
//   onShowLogin,
//   signUpData,
//   setSignUpData,
// }) => {
//   const router = useRouter();
//   const [message, setMessage] = useState({ text: "", type: "" });

//   const handleCreateAccount = async () => {
//     const { email, password, confirmPassword } = signUpData;

//     if (!email || !password || !confirmPassword) {
//       setMessage({ text: "Fill all fields", type: "error" });
//       return;
//     }

//     if (password !== confirmPassword) {
//       setMessage({ text: "Passwords do not match", type: "error" });
//       return;
//     }

//     try {
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password,
//       );
//       await sendEmailVerification(userCredential.user, actionCodeSettings);

//       setMessage({ text: "Verification email sent!", type: "success" });

//       setTimeout(() => {
//         onClose?.();
//         router.push("/verify-email");
//       }, 1500);
//     } catch (error) {
//       console.error(error);
//       setMessage({ text: "Signup failed", type: "error" });
//     }
//   };

//   return (
//     <Dialog
//       open={open}
//       onClose={onClose}
//       fullScreen
//       sx={{
//         // ✅ Force the dialog container to center content
//         "& .MuiDialog-container": {
//           alignItems: "center",
//           justifyContent: "center",
//         },

//         // ✅ Force the paper to be true full-viewport (mobile safe)
//         "& .MuiDialog-paper": {
//           margin: 0,
//           width: "100dvw",
//           maxWidth: "100dvw",
//           height: "100dvh",
//           maxHeight: "100dvh",
//           borderRadius: 0,
//           backgroundColor: "#fff",
//         },
//       }}
//     >
//       <Box
//         sx={{
//           width: "100%",
//           height: "100%",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           overflowY: { xs: "auto", sm: "hidden" },
//         }}
//       >
//         <Box
//           sx={{
//             maxWidth: {
//               xs: "100%", // mobile = full width
//               sm: 420, // small tablets
//               md: 480, // laptop card size
//             },
//             width: "100%",
//             minHeight: "100%", // ✅ important
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center", // ✅ vertical centering
//             alignItems: "center",
//             px: 2,
//             paddingBottom: "max(16px, env(safe-area-inset-bottom))",
//           }}
//         >
//           {/* Mascot */}
//           <Box
//             component="img"
//             src="/assets/bird.png"
//             alt="Loading Mascot"
//             sx={{
//               width: "clamp(120px, 28vw, 180px)", // ✅ smoother & smaller for all
//               height: "auto",
//               objectFit: "contain",
//               userSelect: "none",
//               mb: 1.5,
//             }}
//           />

//           {/* Title */}
//           <Typography
//             sx={{
//               // ✅ CHANGED: responsive typography
//               fontSize: { xs: 20, sm: 22, md: 24 }, // ✅ CHANGED
//               fontWeight: 700,
//               textAlign: "center", // ✅ CHANGED
//             }}
//           >
//             Let&apos;s you in
//           </Typography>

//           <Typography
//             sx={{
//               // ✅ CHANGED: responsive subtitle
//               fontSize: { xs: 12.5, sm: 13.5, md: 14.5 }, // ✅ CHANGED
//               color: "#777",
//               textAlign: "center",
//               lineHeight: 1.6,
//               maxWidth: { xs: 280, md: 360 }, // ✅ CHANGED
//               mb: { xs: 2, sm: 2.5, md: 3 }, // ✅ CHANGED
//             }}
//           >
//             Be part of a community that learns <br />
//             and builds together.
//           </Typography>

//           <Box sx={{ width: "100%", mt: 0.5 }}>
//             {/* GOOGLE LOGIN */}
//             <GoogleButton
//               onClick={async () => {
//                 try {
//                   await signInWithGoogle();
//                   const user = auth.currentUser;

//                   if (user) {
//                     const exists = await checkUserExistsInFirestore(user.email);
//                     onClose?.();
//                     router.push(exists ? "/" : "/onboarding/screen1");
//                   }
//                 } catch (err) {
//                   console.error(err);
//                 }
//               }}
//             />

//             {/* EMAIL LOGIN */}
//             <Paper
//               elevation={0}
//               sx={{
//                 border: "1px solid #E6E6E6",
//                 borderRadius: 2,
//                 mt: { xs: 1.5, sm: 2 }, // ✅ CHANGED
//                 overflow: "hidden",
//               }}
//             >
//               <Button
//                 fullWidth
//                 onClick={() => router.push("/login")}
//                 sx={{
//                   py: { xs: 1.3, sm: 1.5 }, // ✅ CHANGED
//                   textTransform: "none",
//                   fontWeight: 600,
//                 }}
//               >
//                 📧 Sign in with Email
//               </Button>
//             </Paper>

//             {/* OR */}
//             <Box
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 2,
//                 my: { xs: 2, sm: 2.5 }, // ✅ CHANGED
//               }}
//             >
//               <Box sx={{ flex: 1, height: 1, background: "#E6E6E6" }} />
//               <Typography sx={{ fontSize: 12, color: "#777", fontWeight: 600 }}>
//                 OR
//               </Typography>
//               <Box sx={{ flex: 1, height: 1, background: "#E6E6E6" }} />
//             </Box>

//             {/* CREATE ACCOUNT */}
//             <Button
//               fullWidth
//               onClick={handleCreateAccount}
//               sx={{
//                 py: { xs: 1.4, sm: 1.6 }, // ✅ CHANGED
//                 borderRadius: 999,
//                 backgroundColor: "#111",
//                 color: "#fff",
//                 fontWeight: 700,
//                 "&:hover": { backgroundColor: "#000" },
//               }}
//             >
//               Create Account
//             </Button>

//             {message.text && (
//               <Typography
//                 sx={{
//                   mt: 2,
//                   color: message.type === "error" ? "red" : "green",
//                   textAlign: "center",
//                   fontSize: { xs: 12.5, sm: 13.5 }, // ✅ CHANGED
//                 }}
//               >
//                 {message.text}
//               </Typography>
//             )}
//           </Box>
//         </Box>
//       </Box>
//     </Dialog>
//   );
// };

// export default MSignupDialog;
