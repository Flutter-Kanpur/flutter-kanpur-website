"use client";

import { useRouter } from "next/navigation";
import "./styles.css";

export default function ProjectSubmitted() {
  const router = useRouter();

  return (
    <div className="status-container">
      <div className="status-card">

        {/* Success Image */}
        <img
          src="/success.png"
          alt="Success"
          className="success-image"
        />

        <h2 className="status-title">Project Submitted</h2>

        <p className="status-description">
          Thanks for sharing your project. Our team will review it and notify you once it’s approved.
        </p>

        <button
          className="secondary-btn"
          onClick={() => router.push("/profile")}
        >
          View My Projects
        </button>

      </div>
    </div>
  );
}
