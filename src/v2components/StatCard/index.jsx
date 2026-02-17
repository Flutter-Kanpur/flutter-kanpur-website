import { Box, Typography } from "@mui/material";
import "./styles.css";

const StatCard = ({ value, label }) => {
  return (
    <Box sx={{ display: 'flex', textAlign: "left", flexDirection: "column" }}>
      <Typography sx={{ fontSize: 24, fontWeight: 500, color: "#000" }}>{value}</Typography>
      <Typography sx={{ fontSize: 14, fontWeight: 500, color: '#6d6d6d' }}>{label}</Typography>
    </Box>
  );
};

export default StatCard;