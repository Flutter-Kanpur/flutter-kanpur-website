"use client";
import { X } from "lucide-react";
import "./styles.css";

const TagBadge = ({ label, variant = "default", onRemove }) => {
  return (
    <span className={`tag-badge ${variant}`}>
      {label}
      {(variant === "removable" || onRemove) && (
        <button onClick={onRemove} className="tag-remove-btn">
          <X size={12} />
        </button>
      )}
    </span>
  );
};

export default TagBadge;
