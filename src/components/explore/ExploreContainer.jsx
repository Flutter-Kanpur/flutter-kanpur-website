// src/components/explore/ExploreContainer.jsx

import { Box, Stack } from "@mui/material";

import Banner from "./Banner";
import Blogs from "./Blogs";
import ParticipationActivities from "./ParticipationActivities";
import Projects from "./Projects";
import CoreTeam from "./CoreTeam";
import SuggestedJobs from "./SuggestedJobs";

export default function ExploreContainer({
  initialBlogs = [],
  initialProjects = [],
  initialJobs = [],
  initialCoreTeamMembers = [],
}) {
  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      {/* Vertical spacing between sections */}
      <Stack spacing={2.5}>
        <Banner />

        <Blogs initialBlogs={initialBlogs} />

        <ParticipationActivities />

        <Projects initialProjects={initialProjects} />

        <CoreTeam initialCoreTeamMembers={initialCoreTeamMembers} />

        <SuggestedJobs initialJobs={initialJobs} />
      </Stack>
    </Box>
    
  );
}
