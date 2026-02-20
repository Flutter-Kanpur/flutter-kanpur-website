"use client";
import UserAvatar from "@/v2components/UserAvatar";
import { useRouter } from 'next/navigation'
import { Typography, Box } from "@mui/material";
import CustomButtonV2 from "../../Buttons/CustomButtonV2";


const CommunityBanner = ({ onAskQuestion, width }) => {
  const avatarNames = ["Alice", "Bob", "Charlie", "Dave", "Eve"];
  const router = useRouter();

  return (
    <Box sx={{ backgroundColor: "#00A46B", padding: "16px", borderRadius: '20px', width: width, maxWidth: "500px" }}>
      <Typography sx={{ fontSize: 18, fontWeight: 700, marginBottom: "8px", color: "#fff", lineHeight: "100%" }}>
        Confused about where to start?
      </Typography>
      <Box sx={{ display: "flex", marginBottom: '8px', paddingLeft: '8px' }}>
        {avatarNames.map((name) => (
          <UserAvatar
            key={name}
            name={name}
            size="md"
            className="banner-avatar"
          />
        ))}
      </Box>
      <Typography sx={{ fontSize: 14, color: "#fff", fontWeight: 400, lineHeight: '22px', marginBottom: "8px" }}>
        Ask questions, share ideas, or help others by starting a conversation with the community.
      </Typography>
      <CustomButtonV2 onClick={() => router.push('/askquestion')} text="Ask a question" />
    </Box>
  );
};

export default CommunityBanner;
