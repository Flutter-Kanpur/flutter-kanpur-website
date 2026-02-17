import TagBadge from "@/v2components/TagBadge";
import "./styles.css";
import Link from "next/link";
import { Box, Typography } from "@mui/material";

const ContributeCard = ({
  tagLabel,
  tagVariant,
  title,
  description,
  href,
  bigCard = false
}) => {

  const CardContent = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
        borderRadius: '12px',
        height: "100%",
        alignItems: "flex-start",
        textDecoration: "none",
        boxShadow: 'inset 0 0 18px rgba(179, 196, 255, 0.43)',
        backgroundColor: "#fff",
        border: "1px solid #e5e7eb",
        padding: "16px"
      }}>
      <ContributeTag label={tagLabel} />
      <Typography sx={{ fontSize: 16, fontWeight: 600, color: "#000", lineHeight: '24px' }}>
        {title}
      </Typography>
      <Typography className="contribute-description" sx={{ fontSize: 14, fontWeight: 500, lineHeight: '20px', color: bigCard ? '#000' : '#6d6d6d' }}>
        {description}
      </Typography>
    </Box>
  );

  if (href) {
    return (
      <Link href={href} className="no-link-style">
        {CardContent}
      </Link>
    );
  }
  return CardContent;
};

export default ContributeCard;

export const ContributeTag = ({ label }) => {
  return (
    <Box sx={{
      background: "#4167f2",
      display: "inline-flex",
      gap: 0.5,
      padding: '4px 8px',
      borderRadius: '9999px',
      alignItems: "center",
    }}>
      <Typography
        sx={{
          fontSize: 12,
          fontWeight: 500,
          color: "#fff"
        }}>
        {label}
      </Typography>
    </Box>
  )
}

