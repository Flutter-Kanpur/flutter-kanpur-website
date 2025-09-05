"use client";

import React from "react";
import NavbarComponent from "@/components/navbar/navbar";
import styles from "./blog.module.css";
import { AiOutlineLike } from "react-icons/ai";
import { FiSave, FiShare2, FiEye } from "react-icons/fi";
import { BsCloudDownload } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";



// CustomButton component
const CustomButton = ({ icon, label }) => {
  return (
    <button className={styles.customButton}>
      {icon}
      <span>{label}</span>
    </button>
  );
};

export default function BlogScreen() {
  return (
    <div className={styles.container}>
      <NavbarComponent />
      <div className={styles.contentWrapper}>
        <div className={styles.topFrameContainer}>
          <iframe
            className={styles.topFrame}
            src="https://htmlpreview.github.io/?https://github.com/Sarahfaatima/blogs/blob/main/index.html"
            loading="lazy"
          />
        </div>
        <div className={styles.actions}>
          <div className={styles.leftActions}>
            <CustomButton icon={<FaRegHeart />} label="Like" />
            <CustomButton icon={<FiEye />} label="12.4k Views" />
          </div>

          <div className={styles.rightActions}>
            <CustomButton icon={<BsCloudDownload />} label="Save" />
            <CustomButton icon={<FiShare2 />} label="Share" />
          </div>
        </div>

        <div className={styles.relatedArticles}>
          <h2>Related Articles</h2>
          <div className={styles.articlesGrid}>
            <div className={styles.articleCard}>
              <div className={styles.articleTag}>NEW</div>
              
              <div className={styles.articleNumber}>1</div>
              <div className={styles.articleReadTime}>5 min read</div>
              <div className={styles.articleTitle}>
                Getting Started with Modern Web Development
              </div>
              <div className={styles.articleDesc}>
                Learn the essential tools and practices for building modern web
                applications in 2024.
              </div>
              <div className={styles.articleFooter}>
                {/* Left side (icon button) */}
                <div className={styles.articleAction}>
                  <span>▶</span>
                </div>

                {/* Right side (date & time) */}
                <div className={styles.articleDate}>
                  <span>9 April 2025</span>
                  <span>11 PM IST</span>
                </div>
              </div>
            </div>
            <div className={styles.articleCard}>
              <div className={styles.articleTag}>TRENDING</div>
              <div className={styles.articleNumber}>2</div>
              <div className={styles.articleReadTime}>5 min read</div>
              <div className={styles.articleTitle}>
                UI/UX Design Principles for Developers
              </div>
              <div className={styles.articleDesc}>
                Learn the essential tools and practices for building modern web
                applications in 2024.
              </div>
              <div className={styles.articleFooter}>
                {/* Left side (icon button) */}
                <div className={styles.articleAction}>
                  <span>▶</span>
                </div>

                {/* Right side (date & time) */}
                <div className={styles.articleDate}>
                  <span>9 April 2025</span>
                  <span>11 PM IST</span>
                </div>
              </div>
            </div>
            <div className={styles.articleCard}>
              <div className={styles.articleTag}>POPULAR</div>
              <div className={styles.articleNumber}>3</div>
              <div className={styles.articleReadTime}>5 min read</div>
              <div className={styles.articleTitle}>
                Cloud Architecture Best Practices
              </div>
              <div className={styles.articleDesc}>
                Learn the essential tools and practices for building modern web
                applications in 2024.
              </div>
              <div className={styles.articleFooter}>
                {/* Left side (icon button) */}
                <div className={styles.articleAction}>
                  <span>▶</span>
                </div>

                {/* Right side (date & time) */}
                <div className={styles.articleDate}>
                  <span>9 April 2025</span>
                  <span>11 PM IST</span>
                </div>
              </div>
            </div>
            <div className={styles.articleCard}>
              <div className={styles.articleTag}>NEW</div>
              <div className={styles.articleNumber}>4</div>
              <div className={styles.articleReadTime}>5 min read</div>
              <div className={styles.articleTitle}>
                Getting Started with Modern Web Development
              </div>
              <div className={styles.articleDesc}>
                Learn the essential tools and practices for building modern web
                applications in 2024.
              </div>
              <div className={styles.articleFooter}>
                {/* Left side (icon button) */}
                <div className={styles.articleAction}>
                  <span>▶</span>
                </div>

                {/* Right side (date & time) */}
                <div className={styles.articleDate}>
                  <span>9 April 2025</span>
                  <span>11 PM IST</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
