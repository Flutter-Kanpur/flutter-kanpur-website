'use client'
import { Box, Typography } from '@mui/material'
import React from 'react'
import ShadowButton from "@/v2components/ShadowButton"
import StatCard from '@/v2components/StatCard'
import { ArrowRight } from '@mui/icons-material'

const CommunityStats = ({ statsArray, stats }) => {
    return (
        <>
            <Box>
                <Typography sx={{ fontSize: 16, fontWeight: 500, lineHeight: '24px', color: "#000", marginBottom: '12px', marginTop: '24px' }} >Community Stats</Typography>
                <Box sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "row",
                    border: '1px solid #e5e7eb',
                    backgroundColor: "#eff3ff",
                    padding: 2,
                    borderRadius: '20px',
                    marginBottom: '12px'
                }}>
                    {statsArray.map((stat) => (
                        <StatCard
                            key={stat.id}
                            value={stat.value}
                            label={stat.label}
                        />
                    ))}
                </Box>
            </Box>

            {/* Join Discord */}
            <Box >
                <a
                    href={stats.community_discord_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="no-link-style"
                >
                    <ShadowButton text="Join us on Discord" iconafter={<ArrowRight size={16} />} />
                </a>
            </Box>
        </>
    )
}

export default CommunityStats
