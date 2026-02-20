"use client";

import React from "react";
import {useRouter} from "next/navigation"
import { ArrowLeft, ChevronDown, Trash2, Upload, ArrowRight } from "lucide-react";
import "./styles.css";

export default function UploadProject() {
    const router = useRouter();
  return (
    <div className="upload-container">

      {/* Header */}
      <div className="upload-header">
        <ArrowLeft size={20} />
        <h2>Upload project</h2>
      </div>

      <div className="upload-content">

        {/* Project Name */}
        <div className="form-group">
          <label>Project name</label>
          <input type="text" placeholder="Enter title" />
        </div>

        {/* Description */}
        <div className="form-group">
          <label>Short description</label>
          <textarea placeholder="Max 120 characters"></textarea>
        </div>

        {/* Tech Stack */}
        <div className="form-group">
          <label>Tech stack</label>
          <div className="select-wrapper">
            <select>
              <option>-select-</option>
              <option>React</option>
              <option>Flutter</option>
              <option>Next.js</option>
            </select>
            <ChevronDown size={16} className="select-icon" />
          </div>
        </div>

        {/* Selected Tag */}
        <div className="tag-chip">
          React <span>×</span>
        </div>

        {/* Project Links */}
        <div className="form-group">
          <label>Project links</label>

          <div className="link-input">
            <input
              type="text"
              defaultValue="https://github.com/angelica-singh-04"
            />
            <Trash2 size={16} className="trash-icon" />
          </div>

          <div className="link-input">
            <input type="text" placeholder="Live demo / APK" />
          </div>
        </div>

        {/* Upload */}
        <div className="form-group">
          <label>Upload screenshot or file (optional)</label>
          <div className="upload-box">
            <Upload size={20} />
            <p>Choose a file or drag & drop it here.</p>
            <button className="browse-btn">Browse files</button>
          </div>
        </div>

        {/* Submit */}
        <button className="submit-btn" onClick={() => router.push("/projectsubmitted")}>
          Submit project <ArrowRight size={16} />
        </button>

      </div>

      {/* Bottom Navigation */}
      <div className="bottom-nav">
        <span>Home</span>
        <span className="active">Community</span>
        <span>Explore</span>
        <span>Profile</span>
      </div>

    </div>
  );
}
