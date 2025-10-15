import React from "react";
import "../css/skeleton.css"

export function Skeleton({ className = "" }) {
  return <div className={`app-skeleton ${className}`} />;
}
