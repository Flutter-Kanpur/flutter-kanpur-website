"use client";

import { Heart, MessageCircle, Bookmark } from "lucide-react";
import UserAvatar from "@/v2components/UserAvatar";
import TagBadge from "@/v2components/TagBadge";
import { useRouter } from "next/navigation";
import "./styles.css";
import { Box, Typography } from "@mui/material";

const DiscussionCard = (props) => {
  const {
    id,
    title,
    body,
    author,
    tags = [],
    answers = [],
    views = 0,
    createdAt,
    variant = "default",
    onClick,
  } = props;

  const router = useRouter();
  const timeAgo = "Recently"; // you can improve later
  const likes = views; // temporary mapping
  const comments = answers.length;
  const bookmarks = 0;

  const formattedDate = createdAt
    ? createdAt.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    : "";

  const handleClick = () => {
    router.push(`/discussiondetails/${id}`);
  };

  return (
    <Box onClick={handleClick}
      sx={{
        minWidth: '268px',
        padding: "16px",
        border: "1px solid #e5e7eb",
        borderRadius: '12px',
        backgroundColor: '#fff',
        cursor: 'pointer',
        display: 'flex',
        gap: 1.5,
        flexDirection: "column",
        justifyContent: "space-between"
      }}
    >
      <Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, marginBottom: '12px' }}>
          <UserAvatar fromCard={true} name={author?.name || "Anonymous"} />
          <Box sx={{ display: 'flex', flexDirection: "column" }}>
            <Typography sx={{ fontSize: 16, fontWeight: 500, lineHeight: '24px', color: '#000' }}>{author?.name || "Anonymous"}</Typography>
            <Typography sx={{ fontSize: 14, fontWeight: 400, color: "#b3b3b3", lineHeight: '20px' }}>{formattedDate}</Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography sx={{ fontSize: 18, fontWeight: 600, marginBottom: '6px', color: '#000' }}>{title}</Typography>
          <Typography sx={{ fontSize: 12, color: "#6b7280", lineHeight: 1.5, marginBottom: '8px' }} className="card-body">{body}</Typography>
        </Box>
      </Box>
      <Box>
        {tags.length > 0 && (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: '6px' }}>
            {tags.map((tag) => (
              <TagBadge key={tag} label={`#${tag}`} />
            ))}
          </Box>
        )}
        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: "row", gap: 2, borderTop: "1px solid #e5e7eb", paddingTop: "12px" }}>
          <span className="footer-item">
            <Heart size={14} /> {likes}
          </span>

          <span className="footer-item">
            <MessageCircle size={14} /> {comments}
          </span>

          <span className="footer-item bookmark">
            <Bookmark size={14} /> {bookmarks}
          </span>
        </Box>
      </Box>
    </Box>
  );
};

export default DiscussionCard;
