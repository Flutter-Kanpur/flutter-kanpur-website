"use client";

import React from "react";
import { Heart, MessageCircle } from "lucide-react";
import UserAvatar from "@/v2components/UserAvatar";
import "./styles.css";

const ResponseCard = ({
  author,
  timeAgo,
  body,
  likes,
  replies,
  onReply,
}) => {
  return (
    <div className="response-card">
      <div className="response-header">
        <UserAvatar name={author} size="sm" />
        <div>
          <p className="response-author">{author}</p>
          <p className="response-time">{timeAgo}</p>
        </div>
      </div>

      <p className="response-body">{body}</p>

      <div className="response-actions">
        <span className="like-section">
          <Heart size={14} className="heart-icon" />
          {likes}
        </span>

        <button onClick={onReply} className="reply-button">
          <MessageCircle size={14} />
          {replies} reply
        </button>
      </div>
    </div>
  );
};

export default ResponseCard;
