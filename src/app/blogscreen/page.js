"use client";

import React from "react";
import NavbarComponent from "@/components/navbar/navbar";
import styles from "./blog.module.css";
import { AiOutlineLike } from "react-icons/ai";
import { FiSave, FiShare2, FiEye } from "react-icons/fi";
import { BsCloudDownload } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { Box, Typography } from "@mui/material";


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
    <Box className={styles.container}>
      <NavbarComponent />
      <Box className={styles.contentWrapper}>
        <Box className={styles.topFrameContainer}>
          <iframe
            className={styles.topFrame}
            src="https://htmlpreview.github.io/?https://github.com/Sarahfaatima/blogs/blob/main/index.html"
            loading="lazy"
          />
        </Box>

        <Box className={styles.actions}>
          <Box className={styles.leftActions}>
            <CustomButton icon={<FaRegHeart />} label="Like" />
            <CustomButton icon={<FiEye />} label="12.4k Views" />
          </Box>

          <Box className={styles.rightActions}>
            <CustomButton icon={<BsCloudDownload />} label="Save" />
            <CustomButton icon={<FiShare2 />} label="Share" />
          </Box>
        </Box>

        <Box className={styles.relatedArticles}>
          <Typography variant="h5" component="h2">
            Related Articles
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
                <Typography className={styles.articleReadTime}>5 min read</Typography>

                <Typography className={styles.articleTitle} variant="h6">
                  {item === 1 || item === 4
                    ? "Getting Started with Modern Web Development"
                    : item === 2
                    ? "UI/UX Design Principles for Developers"
                    : "Cloud Architecture Best Practices"}
                </Typography>

                <Typography className={styles.articleDesc} variant="body2">
                  Learn the essential tools and practices for building modern web
                  applications in 2024.
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
        </Box>
      </Box>
    </Box>
  );
}
