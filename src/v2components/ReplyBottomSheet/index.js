"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import UserAvatar from "@/v2components/UserAvatar";
import "./styles.css";

const ReplyBottomSheet = ({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting,
  parentAuthor,
  parentTimeAgo,
  parentBody,
}) => {
  const [replyText, setReplyText] = useState("");

  if (!isOpen) return null;

  const handlePost = () => {
    if (!replyText.trim()) return;
    onSubmit(replyText);
    setReplyText("");
  };

  return (
    <>
      <div className="overlay" onClick={onClose} />

      <div className="bottom-sheet">
        <div className="sheet-drag-area">
          <div className="drag-handle" />
        </div>

        <div className="sheet-header">
          <h3>Post your reply</h3>
          <button onClick={onClose} className="close-btn">
            <X size={20} />
          </button>
        </div>

        <div className="sheet-content">
          <div className="parent-comment">
            <UserAvatar name={parentAuthor} size="sm" />
            <div className="parent-text">
              <p className="author-name">{parentAuthor}</p>
              <p className="time-text">{parentTimeAgo}</p>
              <p className="body-text">{parentBody}</p>
            </div>
          </div>

          <div className="reply-input">
            <UserAvatar name="You" size="sm" />
            <textarea
  placeholder="Write a reply"
  className="reply-textarea"
  value={replyText}
  onChange={(e) => setReplyText(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // prevent newline
      if (!isSubmitting && replyText.trim()) {
        handlePost();
      }
    }
  }}
/>

          </div>
        </div>
      </div>
    </>
  );
};

export default ReplyBottomSheet;
