"use client";

import React from "react";
import { CheckCircle } from "lucide-react";
import "./styles.css";

const StepItem = ({ title, description, isLast = false }) => {
  return (
    <div className="step-item">
      {/* <div className="step-icon-column">
        <CheckCircle size={40} className="step-icon" />
        {!isLast && <div className="step-line" />}
      </div> */}
      <div className="step-icon-column">
  <div className="step-circle">
    <CheckCircle size={20} strokeWidth={3} />
  </div>
  {!isLast && <div className="step-line" />}
</div>


      <div className="step-content">
        <h3 className="step-title">{title}</h3>
        <p className="step-description">{description}</p>
      </div>
    </div>
  );
};

export default StepItem;
