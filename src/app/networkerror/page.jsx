"use client";
import { useRouter } from "next/navigation";
import { RefreshCw } from "lucide-react";
import "./styles.css";

export default function NetworkErrorPage() {
  const router = useRouter();

  return (
    <div className="error-container">
      <div className="error-card">

        {/* Error Image */}
        <img
          src="/error.png"
          alt="Error"
          className="error-image"
        />

        <h2 className="error-title">Network error</h2>

        <p className="error-description">
          Couldn't post your question right now.
        </p>

        <button
          className="retry-btn"
          onClick={() => router.push("/askquestion")}
        >
          <RefreshCw size={16} />
          Try again
        </button>

      </div>
    </div>
  );
}
