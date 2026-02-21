import { NextResponse } from "next/server";
import { admin } from "@/lib/firebase/server/firebase_admin";

export async function GET(request) {
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Missing token" },
        { status: 401 }
      );
    }

    const token = authHeader.split("Bearer ")[1];
    const decodedToken = await admin.auth().verifyIdToken(token);
    const user = await admin.auth().getUser(decodedToken.uid);

    return NextResponse.json({
      success: true,
      user: {
        uid: user.uid,
        email: user.email, 
        name: user.displayName || decodedToken.name || "",
        picture: user.photoURL || decodedToken.picture || "",
      }
    });

  } catch (error) {
    console.error("Error verifying token:", error);
    return NextResponse.json(
      { success: false, error: "Unauthorized: Invalid token" },
      { status: 401 }
    );
  }
}
