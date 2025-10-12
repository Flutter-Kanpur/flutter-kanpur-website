"use client";
import * as React from "react";
import "../css/card.css"

function Card({ className = "", ...props }) {
  return <div data-slot="card" className={`app-card ${className}`} {...props} />;
}

function CardHeader({ className = "", ...props }) {
  return (
    <div data-slot="card-header" className={`app-card-header ${className}`} {...props} />
  );
}

function CardTitle({ className = "", ...props }) {
  return (
    <div data-slot="card-title" className={`app-card-title ${className}`} {...props} />
  );
}

function CardDescription({ className = "", ...props }) {
  return (
    <div
      data-slot="card-description"
      className={`app-card-description ${className}`}
      {...props}
    />
  );
}

function CardAction({ className = "", ...props }) {
  return (
    <div data-slot="card-action" className={`app-card-action ${className}`} {...props} />
  );
}

function CardContent({ className = "", ...props }) {
  return (
    <div data-slot="card-content" className={`app-card-content ${className}`} {...props} />
  );
}

function CardFooter({ className = "", ...props }) {
  return (
    <div data-slot="card-footer" className={`app-card-footer ${className}`} {...props} />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
