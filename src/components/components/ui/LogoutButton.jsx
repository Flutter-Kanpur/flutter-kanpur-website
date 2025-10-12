'use client';

import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
    const auth = getAuth();
    const router = useRouter();

    const handleLogout = () => {
        const confirmLogout = window.confirm("Are you sure you want to logout?");
        if (confirmLogout) {
            signOut(auth)
                .then(() => {
                    router.push("/"); // redirect after logout
                })
                .catch((error) => {
                    console.error("Logout Error:", error);
                });
        }
    };

    return (
        <button
            style={{
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#fff",
                padding: "9px 12px",
                borderRadius: 3,
                fontSize: 13,          // same as Login button
                fontFamily: "'Encode Sans', sans-serif", // same font as navbar
                fontWeight: 400,       // match other navbar buttons
                cursor: "pointer",
            }}
            onClick={handleLogout}
        >
            Logout
        </button>
    );
}
