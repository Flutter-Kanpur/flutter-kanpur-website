"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ChevronDown, Trash2, Upload, ArrowRight } from "lucide-react";
import "./styles.css";
import BottomNav from "@/v2components/BottomNav";
import ShadowButton from "@/v2components/ShadowButton";


export default function Writing() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [body, setBody] = useState("");
  const [references, setReferences] = useState([""]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim() || !author.trim() || !body.trim()) return;

    setIsSubmitting(true);

    try {
      const blogData = {
        title,
        author,
        category,
        body,
        references: references.filter((r) => r.trim() !== ""),
      };

      const response = await fetch("/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ blogData }),
      });

      const result = await response.json();

      if (result.success) {
        router.push("/blogsubmitted");
      } else {
        router.push("/networkerror");
      }
    } catch (error) {
      console.error("Error posting blog:", error);
      router.push("/networkerror");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="writing-container">

      <div className="writing-header">
        <ArrowLeft size={20} />
        <h2>Blogs/Articles</h2>
      </div>

      <div className="writing-content">

        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Author’s name</label>
          <input
            type="text"
            placeholder="Enter name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <div className="select-wrapper">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">-select-</option>
              <option>React</option>
              <option>Flutter</option>
              <option>Next.js</option>
            </select>
            <ChevronDown size={16} className="select-icon" />
          </div>
        </div>

        <div className="form-group">
          <div className="reference-header">
            <label>References or links</label>
            <span
              className="add-link"
              onClick={() => setReferences([...references, ""])}
            >
              Add link
            </span>
          </div>

          {references.map((ref, index) => (
            <div className="reference-input" key={index}>
              <input
                type="text"
                value={ref}
                onChange={(e) => {
                  const updated = [...references];
                  updated[index] = e.target.value;
                  setReferences(updated);
                }}
              />
              <Trash2
                size={16}
                className="trash-icon"
                onClick={() =>
                  setReferences(references.filter((_, i) => i !== index))
                }
              />
            </div>
          ))}
        </div>

        <div className="form-group">
          <label>Body</label>
          <textarea
            placeholder="Write your article..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
        </div>

        <div className="form-group">
          <label>Upload screenshot or file (optional)</label>
          <div className="upload-box">
            <Upload size={20} />
            <p>Choose a file or drag & drop it here.</p>
            <button type="button" className="browse-btn">
              Browse files
            </button>
          </div>
        </div>

        <ShadowButton onClick={handleSubmit} disabled={isSubmitting} text="Submit Article" iconafter={<ArrowRight size={16}/>}/>

      </div>

      <BottomNav/>
    </div>
  );
}
