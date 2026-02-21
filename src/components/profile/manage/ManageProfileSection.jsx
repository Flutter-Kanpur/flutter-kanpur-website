import React from 'react';
import { Box, Typography, Chip } from "@mui/material";

const ManageProfileSection = ({ title, content, subtitle, tags, onEdit, isTags = false }) => {
    return (
        <Box sx={{ mb: 4 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.1rem' }}>
                    {title}
                </Typography>
            </Box>

            {subtitle && (
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontWeight: 500 }}>
                    {subtitle}
                </Typography>
            )}

            {isTags ? (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mb: 1 }}>
                    {Array.isArray(tags) && tags.length > 0 ? (
                        tags.map((tag, index) => (
                            <Chip
                                key={index}
                                label={tag}
                                variant="outlined"
                                sx={{
                                    borderRadius: 3,
                                    fontWeight: 500,
                                    color: "#666",
                                    borderColor: "#E0E0E0",
                                    px: 0.5,
                                    py: 2,
                                    fontSize: '0.85rem'
                                }}
                            />
                        ))
                    ) : (
                        <Typography variant="body2" color="text.secondary">
                            No items added yet.
                        </Typography>
                    )}
                </Box>
            ) : (
                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{
                        lineHeight: 1.6,
                        fontWeight: 400,
                        whiteSpace: 'pre-wrap',
                        fontSize: '0.95rem'
                    }}
                >
                    {content || "No information added yet."}
                </Typography>
            )}

            {onEdit && (
                <Typography
                    variant="body2"
                    color="primary"
                    sx={{ cursor: 'pointer', fontWeight: 600, mt: 1 }}
                    onClick={onEdit}
                >
                    Edit
                </Typography>
            )}
        </Box>
    );
};

export default ManageProfileSection;
