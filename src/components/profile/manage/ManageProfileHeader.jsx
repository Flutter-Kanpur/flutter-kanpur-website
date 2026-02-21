import React from 'react';
import { Box, Typography, Avatar, IconButton, Stack } from "@mui/material";
import { GitHubIcon, LinkedInIcon, WebsiteIcon } from "./Icons";

const ManageProfileHeader = ({ user, userData, onEditClick }) => {
    const data = userData || {};
    const socialLinks = data.socialLinks || {};

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mb: 3,
                px: 1,
            }}
        >
            <Avatar
                src={user?.photoURL}
                sx={{
                    width: 100,
                    height: 100,
                    mb: 2,
                    border: "4px solid #fff",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                }}
            />
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
                {user?.displayName || "User Name"}
            </Typography>

            <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>
                {Array.isArray(data.roles) && data.roles.length > 0 ? data.roles.join(" | ") : ""}
            </Typography>

            <Typography
                variant="body2"
                color="text.secondary"
                sx={{ opacity: 0.6, mb: 1.5 }}
            >
                {data.username ? `@${data.username}` : ""}
            </Typography>

            <Typography
                variant="body2"
                color="primary"
                sx={{ cursor: "pointer", fontWeight: 600, mb: 2.5, fontSize: '0.95rem' }}
                onClick={onEditClick}
            >
                Edit profile
            </Typography>

            <Stack direction="row" spacing={2.5}>
                {socialLinks.github && (
                    <IconButton
                        sx={{
                            bgcolor: "#fff",
                            boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
                            width: 50,
                            height: 50,
                            color: "#000",
                            '&:hover': { bgcolor: '#f5f5f5' }
                        }}
                        href={`https://github.com/${socialLinks.github}`}
                        target="_blank"
                    >
                        <GitHubIcon />
                    </IconButton>
                )}
                {socialLinks.website && (
                    <IconButton
                        sx={{
                            bgcolor: "#fff",
                            boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
                            width: 50,
                            height: 50,
                            color: "#000",
                            '&:hover': { bgcolor: '#f5f5f5' }
                        }}
                        href={socialLinks.website.startsWith('http') ? socialLinks.website : `https://${socialLinks.website}`}
                        target="_blank"
                    >
                        <WebsiteIcon />
                    </IconButton>
                )}
                {socialLinks.linkedin && (
                    <IconButton
                        sx={{
                            bgcolor: "#fff",
                            boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
                            width: 50,
                            height: 50,
                            color: "#000",
                            '&:hover': { bgcolor: '#f5f5f5' }
                        }}
                        href={`https://linkedin.com/in/${socialLinks.linkedin}`}
                        target="_blank"
                    >
                        <LinkedInIcon />
                    </IconButton>
                )}
            </Stack>
        </Box>
    );
};

export default ManageProfileHeader;
