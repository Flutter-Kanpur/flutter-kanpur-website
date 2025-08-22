"use client";

import React from "react";
import NavbarComponent from "@/components/navbar/navbar";
import styles from "./blog.module.css";

// CustomButton component
function CustomButton({ icon, label, onClick }) {
  return (
    <button className={styles.customButton} onClick={onClick}>
      {icon && <span className={styles.icon}>{icon}</span>}
      {label}
    </button>
  );
}

export default function BlogScreen() {


  return (
    <div className={styles.container}>
      <NavbarComponent />
      <div className={styles.contentWrapper}>
        <div className={styles.topFrameContainer}>
          <iframe
            className={styles.topFrame}
            src="https://htmlpreview.github.io/?https://github.com/Sarahfaatima/blogs/blob/main/index.html"
            title="Sarah's Blog"
            loading="lazy"
          />

        </div>
        <div className={styles.actions}>
          <CustomButton
            icon={
              <span role="img" aria-label="like">
                💙
              </span>
            }
            label="Like"
            onClick={() => {}}
          />
          <span className={styles.views}>👁️ 12.k Views</span>
          <CustomButton
            icon={
              <span role="img" aria-label="save">
                💾
              </span>
            }
            label="Save"
            onClick={() => {}}
          />
          <CustomButton
            icon={
              <span role="img" aria-label="share">
                🔗
              </span>
            }
            label="Share"
            onClick={() => {}}
          />
        </div>
        <div className={styles.relatedArticles}>
          <h2>Related Articles</h2>
          <div className={styles.articlesGrid}>
            <div className={styles.articleCard}>
              <div className={styles.articleTag}>NEW</div>
              <div className={styles.articleNumber}>1</div>
              <div className={styles.articleTitle}>
                Getting Started with Modern Web Development
              </div>
              <div className={styles.articleDesc}>
                Learn the essential tools and practices for building modern web
                applications in 2024.
              </div>
              <div className={styles.articleFooter}>
                <span>5 min read</span>
                <span>5 April 2025</span>
                <span>11:11 MST</span>
              </div>
              <div className={styles.articleAction}>
                <span>▶</span>
              </div>
            </div>
            <div className={styles.articleCard}>
              <div className={styles.articleTag}>TRENDING</div>
              <div className={styles.articleNumber}>2</div>
              <div className={styles.articleTitle}>
                UI/UX Design Principles for Developers
              </div>
              <div className={styles.articleDesc}>
                Learn the essential tools and practices for building modern web
                applications in 2024.
              </div>
              <div className={styles.articleFooter}>
                <span>5 min read</span>
                <span>9 April 2025</span>
                <span>11:11 MST</span>
              </div>
              <div className={styles.articleAction}>
                <span>▶</span>
              </div>
            </div>
            <div className={styles.articleCard}>
              <div className={styles.articleTag}>POPULAR</div>
              <div className={styles.articleNumber}>3</div>
              <div className={styles.articleTitle}>
                Cloud Architecture Best Practices
              </div>
              <div className={styles.articleDesc}>
                Learn the essential tools and practices for building modern web
                applications in 2024.
              </div>
              <div className={styles.articleFooter}>
                <span>5 min read</span>
                <span>6 April 2025</span>
                <span>11:11 MST</span>
              </div>
              <div className={styles.articleAction}>
                <span>▶</span>
              </div>
            </div>
            <div className={styles.articleCard}>
              <div className={styles.articleTag}>NEW</div>
              <div className={styles.articleNumber}>4</div>
              <div className={styles.articleTitle}>
                Getting Started with Modern Web Development
              </div>
              <div className={styles.articleDesc}>
                Learn the essential tools and practices for building modern web
                applications in 2024.
              </div>
              <div className={styles.articleFooter}>
                <span>5 min read</span>
                <span>9 April 2025</span>
                <span>11:11 MST</span>
              </div>
              <div className={styles.articleAction}>
                <span>▶</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
