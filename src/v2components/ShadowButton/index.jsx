import React from "react";
import "./styles.css";

const Button = ({ text, iconafter, iconbefore, onClick }) => {
  return (
    <button className="button" onClick={onClick}>
      {iconbefore &&
        <span className="button__icon">{iconbefore}</span>
      }
      <span>{text}</span>
      {iconafter
        &&
        <span className="button__icon">{iconafter}</span>}
    </button>
  );
};

export default Button;
