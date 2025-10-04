
import React from "react";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import ActiveMembers from "@/components/communityPageComponents/components/ActiveMembers";
import Leaderboard from "@/components/communityPageComponents/components/LeaderBoard";
import FeaturedResources from "@/components/communityPageComponents/components/FeaturedResources";
import { BorderBeam } from "@/components/components/ui/border-beam";
import "../../components/communityPageComponents/css/community.css"
import { fetchMembersData, fetchQuestionsData } from "@/services/fetch_data_from_firestore";
import { DiscussionCard } from "@/components/communityPageComponents/components/DiscussionCard";

export default async function Community() {
  const data = await fetchMembersData('members');
  const leaderBoard = await fetchMembersData('leaderboard');
  const resourcesData = await fetchMembersData('featured_resources');
  const questions = await fetchQuestionsData();

  const members = data || [];
  const leaderBoardData = leaderBoard || [];
  const discussions = questions || [];
  const resources = resourcesData || [];

  return (
    <Box className="community-container">
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
        <Grid container className="community-grid" spacing={2}>
          {/* Discussions (left side) */}
          <Grid className="discussions">
            {discussions.length ? (
              discussions.slice(0, 2).map((d, i) => <DiscussionCard key={i} discussion={d} />)
            ) : (
              <>
                <DiscussionCard />
                <DiscussionCard />
              </>
            )}
            <FeaturedResources resources={resources} />
          </Grid>

          {/* Sidebar (right side) */}
          <Grid className="sidebar">
            <Leaderboard entries={leaderBoardData} />
            <ActiveMembers members={members} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

