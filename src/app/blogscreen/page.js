"use client";

import React, { Suspense } from "react";
import styles from "./blog.module.css";
import { AiOutlineLike } from "react-icons/ai";
import { FiSave, FiShare2, FiEye } from "react-icons/fi";
import { BsCloudDownload } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { Box, Typography } from "@mui/material";
import { useSearchParams } from "next/navigation";

const CustomButton = ({ icon, label }) => {
  return (
    <button className={styles.customButton}>
      {icon}
      <span>{label}</span>
    </button>
  );
};

function BlogContent() {
  const searchParams = useSearchParams();
  const rawUrl = searchParams.get("url"); // ✅ get ?url=...
  const url = rawUrl ? decodeURIComponent(rawUrl) : null;

  const [frameLoaded, setFrameLoaded] = React.useState(false);

  return (
    <Box className={styles.container}>
      <Box className={styles.contentWrapper}>
        <Box className={styles.topFrameContainer}>
          {!frameLoaded && (
            <div className={styles.skeletonScreen}>
              {/* Left Column (content) */}
              <div className={styles.skeletonMainContent}>
                <div className={styles.skeletonTitle}></div>
                <div className={styles.skeletonSubtitle}></div>
                <div className={styles.skeletonParagraph}></div>
                <div className={styles.skeletonParagraph}></div>
                <div className={styles.skeletonParagraph}></div>
                <div className={styles.skeletonSectionHeading}></div>
                <div className={styles.skeletonParagraph}></div>
                <div className={styles.skeletonListItem}></div>
                <div className={styles.skeletonListItem}></div>
                <div className={styles.skeletonListItem}></div>
              </div>
              {/* Right Column (sidebar) */}
              <div className={styles.skeletonSidebar}>
                <div className={styles.skeletonProfile}></div>
                <div className={styles.skeletonSidebarIcon}></div>
                <div className={styles.skeletonSidebarIcon}></div>
                <div className={styles.skeletonSidebarIcon}></div>
              </div>
            </div>
          )}

          {url ? (
            <iframe
              className={`${styles.topFrame} ${frameLoaded ? styles.frameVisible : styles.frameHidden}`}
              src={url}
              loading="lazy"
              onLoad={() => setFrameLoaded(true)}
              title="blog-content"
            />
          ) : (
            <Typography color="white">No blog URL provided</Typography>
          )}
        </Box>

        {/* <Box className={styles.relatedArticles}>
          <Typography variant="h5" component="h2">
            More Articles
          </Typography>

          <Box className={styles.articlesGrid}>
            {[1, 2, 3, 4].map((item) => (
              <Box key={item} className={styles.articleCard}>
                <Typography className={styles.articleTag} variant="caption">
                  {item === 1 || item === 4
                    ? "NEW"
                    : item === 2
                      ? "TRENDING"
                      : "POPULAR"}
                </Typography>

                <Typography className={styles.articleNumber}>{item}</Typography>
                <Typography className={styles.articleReadTime}>
                  5 min read
                </Typography>

                <Typography className={styles.articleTitle} variant="h6">
                  {item === 1 || item === 4
                    ? "Getting Started with Modern Web Development"
                    : item === 2
                      ? "UI/UX Design Principles for Developers"
                      : "Cloud Architecture Best Practices"}
                </Typography>

                <Typography className={styles.articleDesc} variant="body2">
                  Learn the essential tools and practices for building modern
                  web applications in 2024.
                </Typography>

                <Box className={styles.articleFooter}>
                  <Box className={styles.articleAction}>
                    <Typography component="span">▶</Typography>
                  </Box>

                  <Box className={styles.articleDate}>
                    <Typography component="span">9 April 2025</Typography>
                    <Typography component="span">11 PM IST</Typography>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Box> */}
      </Box>
    </Box>
  );
}

export default function BlogScreen() {
  return (
    <Suspense fallback={<div>Loading blog...</div>}>
      <BlogContent />
    </Suspense>
  );
}
