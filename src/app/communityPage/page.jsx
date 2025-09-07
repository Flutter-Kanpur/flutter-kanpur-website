import React from "react";
import Box from "@mui/material/Box";
import NavbarComponent from "../../components/navbar/navbar";

import Leaderboard from "../../components/communityPageComponents/components/LeaderBoard";
import FeaturedResources from "../../components/communityPageComponents/components/FeaturedResources";
import ActiveMembers from "../../components/communityPageComponents/components/ActiveMembers";

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
    <div className={styles.community_container}>
      {/* ✅ Header */}
      <header className={styles.community_header}>
        <img src={styles.flutterLogo} alt={styles.Flutter_Logo} className={styles.flutter_logo} />
        <div className={styles.menu_items}>
          <button className={styles.menu_btn}>Home</button>
          <button className={styles.menu_btn}>Jobs</button>
          <button className={styles.menu_btn_active}>Community</button>
          <button className={styles.menu_btn}>Events</button>
          <button className={styles.menu_btn}>Login</button>
        </div>
      </header>

      {/* ✅ Main Content */}
      <section className={styles.community_section}>
        {/* Dashboard Button */}
        <div className={styles.dashboard_button}>Community Dashboard</div>
        <h1 className={styles.headline}>Connect. Collaborate. Grow.</h1>

        {/* ✅ Discussion + Leaderboard side by side */}
        <div className={styles.community_main_content}>
          <div className={styles.discussion_cards}>
            {events.map((item, i) => (
              <div className={styles.discussion_card} key={styles.i}>
                <div className={styles.discussion_content}>
                  <div className={styles.discussion_text}>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                  <img
                    src={item.avatar}
                    alt={styles.User}
                    className={styles.discussion_avatar}
                  />
                </div>
                <div className={styles.discussion_stats}>
                  <div className={styles.stat}>
                    <span className={styles.icon}>💬</span> 24 Replies
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.icon}>👁️</span> 24 Views
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ✅ Leaderboard on the right */}
          <Leaderboard />
        </div>

        <div className={styles.resources_members}>
          <FeaturedResources />
          <ActiveMembers />
        </div>
      </section>
    </div>
  );
};

export default Community;
