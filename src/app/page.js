import { Box, Typography } from "@mui/material";
import NavbarComponent from "@/components/navbar/navbar";
import HeroComponent from "@/components/hero/hero";
import StatsComponent from "@/components/stats/statsComponent";
import { flutter_kanpur_statistics } from "@/constants/statistics";

export default function Home() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh" }}>
      <NavbarComponent />
      <HeroComponent />
      <Box sx={{ width: "100%", alignItems: "center", flexDirection: "row", marginTop: "20px", display: "flex", justifyContent: "space-between" }}>
        {flutter_kanpur_statistics.map((stats) => (
          <StatsComponent key={stats.id} heading={stats.title} description={stats.description} />
        ))}
      </Box>
    </Box>
  );
}
