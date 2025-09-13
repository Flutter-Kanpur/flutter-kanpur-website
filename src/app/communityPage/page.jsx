"use client";
import React from "react";
import Box from "@mui/material/Box";
import NavbarComponent from "../../components/navbar/navbar";

import ActiveMembers from "@/components/communityPageComponents/components/ActiveMembers";
import Leaderboard from "@/components/communityPageComponents/components/LeaderBoard";
import FeaturedResources from "@/components/communityPageComponents/components/FeaturedResources";

import { IconMessages } from "@tabler/icons-react";
import { EyeIcon } from "lucide-react";
import Image from "next/image";
import { Skeleton } from "@/components/components/ui/skeleton";
import { BorderBeam } from "@/components/components/ui/border-beam";

import "../../components/communityPageComponents/css/community.css"

// Discussion Card
const DiscussionCard = ({ discussion }) => {
  if (!discussion) {
    return (
      <Box className="discussion-card loading">
        <BorderBeam lightColor="#13fdfd" lightWidth={350} duration={8} />
        <Box className="discussion-content">
          <Box className="discussion-text">
            <Skeleton className="skeleton-title" />
            <Skeleton className="skeleton-subtitle" />
            <Box className="discussion-meta">
              <Skeleton className="skeleton-meta" />
              <Skeleton className="skeleton-meta" />
            </Box>
          </Box>
          <Skeleton className="skeleton-avatar" />
        </Box>
      </Box>
    );
  }

  return (
    <Box className="discussion-card">
      <BorderBeam lightColor="#13fdfd" lightWidth={350} duration={8} />
      <Box className="discussion-content">
        <Box>
          <h1 className="discussion-title">{discussion.title}</h1>
          <span className="discussion-message">{discussion.message}</span>
          <Box className="discussion-meta">
            <Box className="meta-item">
              <IconMessages /> {discussion.replies} Replies
            </Box>
            <Box className="meta-item">
              <EyeIcon /> {discussion.views} Views
            </Box>
          </Box>
        </Box>
        <Box className="discussion-avatar">
          <Image
            src={discussion.avatar}
            alt={discussion.name || "Discussion Avatar"}
            width={60}
            height={60}
            className="avatar-img"
          />
        </Box>
      </Box>
    </Box>
  );
};

const Community = ({ discussions = [], resources = [], members = [], leaderboard = [] }) => {
  return (
    <Box className="community-container">
      <NavbarComponent />

      <Box className="community-section">
        {/* Dashboard Button */}
        <Box className="dashboard-btn">
          <BorderBeam lightColor="#13fdfd" lightWidth={350} duration={8} />
          <Box className="dashboard-text">
            <h3>Community Dashboard</h3>
          </Box>
        </Box>

        {/* Headline */}
        <h1 className="headline">Connect. Collaborate. Grow.</h1>

        {/* Grid Layout */}
        <Box className="community-grid">
          {/* Discussions (left side) */}
          <Box className="discussions">
            {discussions.length ? (
              discussions.slice(0, 2).map((d, i) => <DiscussionCard key={i} discussion={d} />)
            ) : (
              <>
                <DiscussionCard />
                <DiscussionCard />
              </>
            )}

            <FeaturedResources resources={resources} />
          </Box>

          {/* Sidebar (right side) */}
          <Box className="sidebar">
            <Leaderboard entries={leaderboard} />
            <ActiveMembers members={members} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Community;
