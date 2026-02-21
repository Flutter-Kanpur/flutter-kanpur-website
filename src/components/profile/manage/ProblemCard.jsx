import React from 'react';
import { Box, Typography, LinearProgress, Button } from "@mui/material";

const ProblemCard = ({ level = 1, progress = 0 }) => {
    return (
        <Box
            sx={{
                background: "linear-gradient(90deg, #4c82fb 0%, #2f5df8 100%)",
                borderRadius: 4,
                p: 3,
                color: "#fff",
                mb: 4,
                boxShadow: "0 8px 20px rgba(47, 93, 248, 0.2)",
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: -20,
                    right: -20,
                    width: 100,
                    height: 100,
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '50%',
                },
                '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -30,
                    left: -10,
                    width: 150,
                    height: 150,
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '50%',
                }
            }}
        >
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5 }}>
                Problem of the Day
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2.5 }}>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                    Lv. {level}
                </Typography>
                <LinearProgress
                    variant="determinate"
                    value={progress}
                    sx={{
                        flexGrow: 1,
                        height: 10,
                        borderRadius: 5,
                        bgcolor: "rgba(255,255,255,0.25)",
                        "& .MuiLinearProgress-bar": { bgcolor: "#fff", borderRadius: 5 },
                    }}
                />
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                    {progress}%
                </Typography>
            </Box>

            <Button
                variant="contained"
                size="medium"
                sx={{
                    bgcolor: "#fff",
                    color: "#2f5df8",
                    textTransform: "none",
                    borderRadius: 3,
                    fontWeight: 700,
                    px: 3,
                    "&:hover": { bgcolor: "#f0f0f0" },
                }}
            >
                View progress
            </Button>
        </Box>
    );
};

export default ProblemCard;
