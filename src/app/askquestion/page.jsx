"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload } from "lucide-react";
import PageHeader from "@/v2components/PageHeader";
import BottomNav from "@/v2components/BottomNav";
import TagBadge from "@/v2components/TagBadge";
import ShadowButton from "@/v2components/ShadowButton"
import "./styles.css";

const AskQuestion = () => {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState([""]);
  const [tags, setTags] = useState([""]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim() || !body.trim()) return;

    setIsSubmitting(true);

    try {
      const questionData = {
        title: title.trim(),
        body: body.trim(),
        author: {
          name: "You",
          profilePicUrl: "",
        },
        category,
        tags,
      };

      const response = await fetch("/api/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ questionData }),
      });

      const result = await response.json();

      if (result.success) {
        router.push("/questionposted");
      } else {
        router.push("/networkerror");
      }
    } catch (error) {
      console.error("Error posting question:", error);
      router.push("/networkerror");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="ask-page">
      <PageHeader title="Ask a question" showBack />

      <div className="ask-content">
        {/* Question Title */}
        <div className="form-group">
          <label>Question title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input-field"
          />
        </div>

        {/* Details */}
        <div className="form-group">
          <label>Details</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Add more context, code snippets, or what you've tried so far."
            className="textarea-field"
          />
        </div>




        {/* Category */}
        <div className="form-group">
          <label>Category</label>
          <input
            placeholder="Add Category and press enter"
            className="input-field"
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.target.value.trim()) {
                e.preventDefault();
                setCategory([...category, e.target.value.trim()]);
                e.target.value = "";
              }
            }}
          />
          <div className="badge-container">
            {category.map((c, index) => (
              <TagBadge key={index} label={c} />
            ))}
          </div>
        </div>




        {/* Tags */}
        <div className="form-group">
          <label>Tags</label>
          <input
            placeholder="Add tag and press enter"
            className="input-field"
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.target.value.trim()) {
                e.preventDefault();
                setTags([...tags, e.target.value.trim()]);
                e.target.value = "";
              }
            }}
          />
          <div className="badge-container">
            {tags.map((t, index) => (
              <TagBadge key={index} label={t} />
            ))}
          </div>
        </div>

        {/* File Upload (UI only for now) */}
        <div className="form-group">
          <label>Upload screenshot or file (optional)</label>
          <div className="upload-box">
            <Upload size={24} />
            <p>Choose a file or drag & drop it here.</p>
            <button className="browse-btn">Browse files</button>
          </div>
        </div>

        {/* Post Button */}
        <ShadowButton onClick={handleSubmit} disabled={isSubmitting} text="Post Question"/>
      </div>

      <BottomNav />
    </div>
  );
};

export default AskQuestion;
