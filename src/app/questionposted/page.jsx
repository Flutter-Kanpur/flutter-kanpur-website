"use client";

import { useRouter } from "next/navigation";
import { Eye } from "lucide-react";
import "./styles.css";

export default function QuestionPostedPage() {
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

        <h2 className="status-title">Question posted</h2>

        <p className="status-description">
          Your question is now visible to the community.
        </p>

        <button
          className="primary-btn"
          onClick={() => router.push("/discussion")}
        >
          <Eye size={16} />
          View discussion
        </button>

        <button
          className="secondary-btn"
          onClick={() => router.push("/askquestion")}
        >
          Post another question
        </button>

      </div>
    </div>
  );
}
