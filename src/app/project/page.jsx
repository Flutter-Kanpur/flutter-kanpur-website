"use client";

import React from "react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import BottomNav from "@/v2components/BottomNav";
import StepItem from "@/v2components/StepItem";
import "./styles.css";

export default function Project() {
  const router = useRouter();

  return (
    <div className="contribute-container">
      <div className="top-close">
        <button onClick={() => router.push("/communityv2")} className="close-btn">
          <X size={22} />
        </button>
      </div>

      <div className="header-section">
        <h1>
          Showcase your work and inspire other community members.
        </h1>
      </div>

      <div className="steps-section">
        <StepItem
          title="Submit your project"
          description="Share your project details, tech stack, and relevant links for review."
        />
        <StepItem
          title="Review by the community team"
          description="Our team reviews submissions to ensure relevance and community value."
        />
        <StepItem
          title="Approved and published"
          description="Once approved, your project is published and visible to the community."
          isLast
        />
      </div>

      <div className="cta-card">
        <h3>Want to write for us?</h3>
        <p>
          Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet
        </p>
        <button className="cta-button" onClick={() => router.push("/uploadproject")}>
          Upload Project
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
