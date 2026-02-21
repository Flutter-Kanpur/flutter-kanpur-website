import { NextResponse } from "next/server";
import { admin, db } from "@/lib/firebase/server/firebase_admin";

const otpStore = global.otpStore || new Map();
global.otpStore = otpStore;

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, otp } = body;

    console.log("VerifyOtp called with email:", email);

    // Extract user from Authorization header
    const authHeader = request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { success: false, error: "Unauthorized - no token provided" },
        { status: 401 }
      );
    }

    const idToken = authHeader.split("Bearer ")[1];
    let decodedToken;
    try {
      decodedToken = await admin.auth().verifyIdToken(idToken);
    } catch (err) {
      console.error("Token verification failed:", err.message);
      return NextResponse.json(
        { success: false, error: "Invalid token: " + err.message },
        { status: 401 }
      );
    }

    const uid = decodedToken.uid;
    console.log("Verified user UID:", uid);

    const record = otpStore.get(email);

    if (!record) {
      console.log("No OTP found for email:", email, "Store keys:", [...otpStore.keys()]);
      return NextResponse.json(
        { success: false, error: "No OTP found. Please resend the code." },
        { status: 400 }
      );
    }

    if (Date.now() > record.expires) {
      otpStore.delete(email);
      return NextResponse.json(
        { success: false, error: "OTP expired. Please resend the code." },
        { status: 400 }
      );
    }

    if (String(record.otp).trim() !== String(otp).trim()) {
      console.log("OTP mismatch - stored:", record.otp, "entered:", otp);
      return NextResponse.json(
        { success: false, error: "Invalid OTP" },
        { status: 400 }
      );
    }

    otpStore.delete(email);

    // Update email in Firebase Auth
    try {
      await admin.auth().updateUser(uid, { email: email });
      console.log("Firebase Auth email updated for UID:", uid);
    } catch (authError) {
      console.error("Firebase Auth update failed:", authError.message);
      return NextResponse.json(
        { success: false, error: "Failed to update email in Auth: " + authError.message },
        { status: 500 }
      );
    }

    // Update email in Firestore
    try {
      await db.collection("users").doc(uid).set(
        { email: email },
        { merge: true }
      );
      console.log("Firestore email updated for UID:", uid);
    } catch (dbError) {
      console.error("Firestore update failed:", dbError.message);
      return NextResponse.json(
        { success: false, error: "Failed to update email in database: " + dbError.message },
        { status: 500 }
      );
    }

    // Generate custom token so user can re-authenticate without being logged out
    let customToken;
    try {
      customToken = await admin.auth().createCustomToken(uid);
      console.log("Custom token generated for UID:", uid);
    } catch (tokenError) {
      console.error("Custom token generation failed:", tokenError.message);
      // Email was still updated — proceed without re-auth token
    }

    return NextResponse.json({
      success: true,
      message: "Email updated successfully",
      customToken: customToken || null,
    });

  } catch (error) {
    console.error("Verification/update error:", error.message, error.stack);
    return NextResponse.json(
      { success: false, error: "Verification failed: " + error.message },
      { status: 500 }
    );
  }
}
