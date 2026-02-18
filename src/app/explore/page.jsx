import {
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import {
  fetchBlogsData,
  fetchProjectsData,
  fetchJobsData,
  fetchCoreTeamData,
  fetchCoreTeamSections,
} from "@/services/fetch_data_from_firestore";
import BottomNav from '@/components/BottomNav/BottomNav';


import { normalizeBlog } from "@/lib/normalizeBlog";
import { normalizeProject } from "@/lib/normalizeProject";
import { normalizeJob } from "@/lib/normalizeJob";
import { normalizeCoreTeamMember } from "@/lib/normalizeCoreTeamMember";

import ExploreContainer from "@/components/explore/ExploreContainer";

export default async function ExplorePage() {
  let initialBlogs = [];
  let initialProjects = [];
  let initialJobs = [];
  let initialCoreTeamMembers = [];

  try {
    const [blogsRaw, projectsRaw, jobsRaw, coreTeamFlat] =
      await Promise.all([
        fetchBlogsData("blogs"),
        fetchProjectsData("projects"),
        fetchJobsData("suggested_jobs"),
        fetchCoreTeamData("members"),
      ]);

    initialBlogs = Array.isArray(blogsRaw)
      ? blogsRaw.map(normalizeBlog)
      : [];

    initialProjects = Array.isArray(projectsRaw)
      ? projectsRaw.map(normalizeProject)
      : [];

    initialJobs = Array.isArray(jobsRaw)
      ? jobsRaw.map(normalizeJob)
      : [];

    if (Array.isArray(coreTeamFlat) && coreTeamFlat.length > 0) {
      initialCoreTeamMembers =
        coreTeamFlat.map(normalizeCoreTeamMember);
    } else {
      const sections = await fetchCoreTeamSections("members");
      initialCoreTeamMembers = (sections || []).flatMap((s) =>
        (s.members || []).map((m) => ({
          ...m,
          photo: m.photo || "",
        }))
      );
    }
  } catch (e) {
    console.error("Explore fetch error:", e);
  }

  return (
    <Box
  sx={{
    width: 393,
    flex:1,
    pt:2,
    pb:'110px',             
    mx: "auto",
    minHeight: "100vh",
    display: "flex",
    justifyContent:"center",
    flexDirection: "column",
    pb:'140px',
    background:
      "linear-gradient(180deg, #cfe0f7 0%, #eaf2ff 6%, #ffffff 12%)",
  }}
>
      {/* Header */}
<Box
  sx={{
    py: 1.5,
    display: "flex",
    justifyContent: "center"
  }}
>
  {/* INNER HEADER WIDTH = 393 */}
  <Box
  sx={{
    width: 346,              
    mx: "auto",              
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  }}
>

    <Typography
      variant="h6"
      sx={{ fontWeight: 650, color: "#222" }}
    >
      Explore
    </Typography>

    <Box>
      <IconButton size="small">
        <NotificationsOutlinedIcon sx={{ fontSize: 22 }} />
      </IconButton>

      <IconButton size="small">
        <MoreVertIcon sx={{ fontSize: 22 }} />
      </IconButton>
    </Box>
  </Box>
</Box>

       {/* Page Content */}
<Box
  sx={{
    flex: 1,
    pt: 0,
    pb: 3,
    display: "flex",
    justifyContent: "center",   // center inner content
  }}
/>
  {/* INNER CONTENT WIDTH = 393 */}
  <Box
    sx={{
      width: 393,
      display: "flex",
      flexDirection: "column",
      gap: 2,
    }}
  >
    <ExploreContainer
      initialBlogs={initialBlogs}
      initialProjects={initialProjects}
      initialJobs={initialJobs}
      initialCoreTeamMembers={initialCoreTeamMembers}
    />
  </Box>
<BottomNav activeTab="explore" />

</Box>
      
  );
}
