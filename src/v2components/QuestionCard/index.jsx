"use client"
import React from "react";
import "./styles.css";
import {useRouter} from 'next/navigation'

const QuestionCard = ({
  id,
  title,
  body,
  author,
  answers = [],
  createdAt,
  images = [],
}) => {
  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Recently";

  const answerCount = answers.length;

  const router = useRouter();
  const handleClick = () => {
    router.push(`/discussiondetails/${id}`);
  };
  

  return (
    <div className="question-card" onClick={handleClick}>
      <p className="question-text">{title}</p>

      {images.length > 0 && (
        <div className="question-images">
          {images.map((img, i) => (
            <div key={i} className="image-box">
              <img src={img} alt="" />
            </div>
          ))}
        </div>
      )}

      <div className="question-footer">
        <div className="author-section">
          <div className="avatar">
            {author?.profilePicUrl ? (
              <img src={author.profilePicUrl} alt={author.name} />
            ) : (
              <div className="avatar-fallback">
                {author?.name?.charAt(0) || "A"}
              </div>
            )}
          </div>

          <div className="author-info">
            <p className="author-name">
              {author?.name || "Anonymous"}
            </p>
            <p className="author-time">{formattedDate}</p>
          </div>
        </div>

        <span className="answer-count">
          {answerCount} answers
        </span>
      </div>
    </div>
  );
};

export default QuestionCard;
