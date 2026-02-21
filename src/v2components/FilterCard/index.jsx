import React from "react";
import { SlidersHorizontal } from "lucide-react";
import "./styles.css";

const FilterCard = ({
  label,
  active = false,
  isFilter = false,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`filter-chip ${active ? "active" : ""}`}
    >
      {isFilter && <SlidersHorizontal size={14} />}
      {label}
    </button>
  );
};

export default FilterCard;
