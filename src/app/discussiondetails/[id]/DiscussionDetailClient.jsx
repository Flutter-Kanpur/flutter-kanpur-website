"use client";

import { useState } from "react";
import ResponseCard from "@/v2components/ResponseCard";
import ReplyBottomSheet from "@/v2components/ReplyBottomSheet";

export default function DiscussionDetailClient({ question }) {
  const [answers, setAnswers] = useState(question.answers || []);
  const [replyOpen, setReplyOpen] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleReply = (answer) => {
    setSelectedAnswer(answer);
    setReplyOpen(true);
  };

  const handleSubmitReply = async (replyText) => {
    if (!replyText.trim()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/answers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          questionId: question.id,
          answerData: {
            answerText: replyText.trim(),
            author: {
              name: "You",
              profilePicUrl: "",
            },
          },
        }),
      });

      const result = await response.json();

      if (result.success) {
        setAnswers((prev) => [...prev, result.answer]);
        setReplyOpen(false);
      } else {
        alert("Failed to post reply");
      }
    } catch (error) {
      console.error("Error posting reply:", error);
      alert("Network error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="response-list">
        {answers.map((answer, i) => (
          <ResponseCard
            key={i}
            author={answer.author?.name}
            timeAgo={new Date(answer.createdAt).toLocaleDateString()}
            body={answer.answerText}
            likes={answer.views}
            replies={0}
            onReply={() => handleReply(answer)}
          />
        ))}
      </div>

      <ReplyBottomSheet
        isOpen={replyOpen}
        onClose={() => setReplyOpen(false)}
        onSubmit={handleSubmitReply}
        isSubmitting={isSubmitting}
        parentAuthor={selectedAnswer?.author?.name}
        parentTimeAgo={
          selectedAnswer
            ? new Date(selectedAnswer.createdAt).toLocaleDateString()
            : ""
        }
        parentBody={selectedAnswer?.answerText}
      />
    </>
  );
}
