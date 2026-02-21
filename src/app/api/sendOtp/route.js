import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const otpStore = global.otpStore || new Map();
global.otpStore = otpStore;

export async function POST(request) {
  try {
    const { email } = await request.json();
    console.log("Received email for OTP:", email);

    if (!email) {
      return NextResponse.json(
        { success: false, error: "Email is required" },
        { status: 400 }
      );
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    //otp expires in 5 minutes
    otpStore.set(email, {
      otp,
      expires: Date.now() + 5 * 60 * 1000,
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Security Team" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your Verification Code",
      html: `<p>Your verification code is: <b>${otp}</b></p>`,
    });

    return NextResponse.json({
      success: true,
      message: "OTP Sent Successfully",
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Failed to send email" },
      { status: 500 }
    );
  }
}
