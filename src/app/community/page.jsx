import React from "react";
import Box from "@mui/material/Box";
import Image from "next/image";
import "../../components/communityPageComponents/css/Community.css";
import user1 from "../../../public/assets/user1.png";
import user2 from "../../../public/assets/user2.png";
import Leaderboard from "../../components/communityPageComponents/components/LeaderBoard";
import FeaturedResources from "../../components/communityPageComponents/components/FeaturedResources";
import ActiveMembers from "../../components/communityPageComponents/components/ActiveMembers";
import NavbarComponent from "../../components/navbar/navbar";

const DiscussionCard = ({ discussion }) => (
  <Box
    className="discussion-card"
    position="relative"
    overflow="hidden"
    borderRadius="12px"
    padding="16px 19px"
    boxShadow="0 2px 12px rgba(19,253,253,0.10)"
    mb={0.25}
  >
    <Box
      className="discussion-content"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      position="relative"
      zIndex={2}
    >
      <Box className="discussion-text">
        <h3>{discussion.title}</h3>
        <p>{discussion.desc}</p>
      </Box>
      <Box
        sx={{
          borderRadius: "50%",
          overflow: "hidden",
          border: "2px solid #13FDFD",
          width: 39,
          height: 39,
          ml: 1.5,
          flexShrink: 0,
          position: "relative",
        }}
      >
        <Image
          src={discussion.avatar}
          alt="User"
          layout="fill"
          objectFit="cover"
          priority={true}
        />
      </Box>
    </Box>
    <Box
      className="discussion-stats"
      display="flex"
      gap={2}
      fontSize="12px"
      color="#D9D9D9"
      zIndex={2}
      mt={1.625}
    >
      <Box className="stat" display="flex" alignItems="center" gap={1}>
        <span className="icon" style={{ fontSize: "13px" }}>
          💬
        </span>{" "}
        {discussion.replies} Replies
      </Box>
      <Box className="stat" display="flex" alignItems="center" gap={1}>
        <span className="icon" style={{ fontSize: "13px" }}>
          👁️
        </span>{" "}
        {discussion.views} Views
      </Box>
    </Box>
  </Box>
);

const DiscussionCards = ({ discussions }) => (
  <Box
    className="discussion-cards"
    display="flex"
    flexDirection="column"
    gap={2.625}
    minWidth={370}
    flex={1.2}
  >
    {discussions.map((disc, idx) => (
      <DiscussionCard key={idx} discussion={disc} />
    ))}
  </Box>
);

const CommunityMainContent = ({ discussions }) => (
  <Box
    className="community-main-content"
    display="flex"
    gap={4}
    marginTop={3}
    alignItems="flex-start"
    flexWrap="wrap"
    justifyContent="flex-start"
  >
    <DiscussionCards discussions={discussions} />
    <Leaderboard />
  </Box>
);

const ResourcesMembersSection = () => (
  <Box
    className="resources-members"
    display="flex"
    flexDirection="row"
    gap={4.5}
    alignItems="flex-start"
    marginTop={4.25}
  >
    <Box className="featured-resources" minWidth={325} flex={1}>
      <FeaturedResources />
    </Box>
    <Box className="active-members" minWidth={325} flex={1}>
      <ActiveMembers />
    </Box>
  </Box>
);

const Community = () => {
  const discussions = [
    {
      title: "Flutter 3.0 Migration Guide Discussion",
      desc: "Tips and tricks for smooth migration to Flutter 3.0",
      avatar: user1,
      replies: 24,
      views: 24,
    },
    {
      title: "State Management Best Practices",
      desc: "Comparing different state management solutions",
      avatar: user2,
      replies: 24,
      views: 24,
    },
  ];

  return (
    <Box className="community-container" minHeight="100vh" width="100%">
      <NavbarComponent />
      <Box
        className="community-section"
        paddingLeft="120px"
        paddingRight="60px"
        paddingTop="70px"
        paddingBottom="40px"
        width="100%"
      >
        <Box
          className="dashboard-button"
          display="inline-block"
          padding="7px 18px"
          borderRadius="7px"
          border="1px solid #415360"
          background="#10161f"
          color="#D9D9D9"
          fontSize="14px"
          fontWeight="400"
          letterSpacing="0.5px"
          marginBottom="22px"
        >
          Community Dashboard
        </Box>
        <h1 className="headline">Connect. Collaborate. Grow.</h1>
        <CommunityMainContent discussions={discussions} />
        <ResourcesMembersSection />
      </Box>
    </Box>
  );
};

export default Community;
