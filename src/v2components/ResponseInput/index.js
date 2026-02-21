"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "./styles.css";

const ResponseInput = ({ questionId }) => {
  const router = useRouter();
  const [replyText, setReplyText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!replyText.trim()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/answers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          questionId,
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
        setReplyText("");
        router.refresh(); // reload server component
      }
    } catch (error) {
      console.error("Error posting reply:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <textarea
      placeholder="Write a reply"
      className="reply-textarea"
      value={replyText}
      onChange={(e) => setReplyText(e.target.value)}
      disabled={isSubmitting}
      onKeyDown={(e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          if (!isSubmitting) handleSubmit();
        }
      }}
    />
  );
};

export default ResponseInput;
