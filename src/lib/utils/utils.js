import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export const validateEmailPasswordForSignUp = (email, password, confirmPassword) => {
  if (!isValidEmail(email)) {
    return { valid: false, message: "Please enter a valid email" };
  }
  if (!email || !password || !confirmPassword) {
    return { valid: false, message: "Please fill all the fields" };
  }
  if (password !== confirmPassword) {
    return { valid: false, message: "Passwords do not match" };
  }
  if (password.length < 6 || confirmPassword.length < 6) {
    return { valid: false, message: "Password should be at least 6 characters long" };
  }
  return { valid: true, message: "All fields valid !!!" };

}


