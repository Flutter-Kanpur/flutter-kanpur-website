"use client";
import { Box, Button, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import ShimmerButton from '../buttons/shimmerButton/shimmerButton'

import StatsComponent from '../stats/statsComponent';
import { db } from '@/lib/firebase/setup';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';



const HeroComponent = () => {
    const [stats, setStats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [latestAnnouncement, setLatestAnnouncement] = useState("");
    const [announcementLoading, setAnnouncementLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const docRef = doc(db, 'homescreen_data', 'stats_data');
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    const statsArr = [
                        {
                            id: 1,
                            title: data.community_member || '-',
                            description: 'Community Members',
                        },
                        {
                            id: 2,
                            title: data.events_hosted || '-',
                            description: 'Events Hosted',
                        },
                        {
                            id: 3,
                            title: data.community_lead || '-',
                            description: 'Community Leads',
                        },
                    ];
                    setStats(statsArr);
                }
            } catch (error) {
                setStats([]);
            } finally {
                setLoading(false);
            }
        };
        const fetchAnnouncement = async () => {
            try {
                const docRef = doc(db, 'homescreen_data', 'latest_announcement');
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setLatestAnnouncement(data.latest_announcements || "");
                }
            } catch (error) {
                setLatestAnnouncement("");
            } finally {
                setAnnouncementLoading(false);
            }
        };
        fetchStats();
        fetchAnnouncement();
    }, []);

    return (
        <Box style={{ position: 'relative', width: "100%" }}>
            <Image src="/landingPageIcons/landing_globe.svg" width={226.0133514404297} height={216.9365234375} style={{ position: "absolute", opacity: 0.1, bottom: "49vh", right: "65.5vw" }} alt="Globe Background" />
            <Box sx={{ marginTop: "182px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 1 }}>
                <Typography
                    sx={{
                        fontSize: 67,
                        fontWeight: 700,
                        color: "#E5E8EC",
                        background: "-webkit-linear-gradient(#fff,#C9E8FF)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        textAlign: "center"
                    }}
                >
                    Unite. Design. Innovate
                </Typography>

                {/* Latest Announcement */}
                <Typography sx={{ fontSize: 18, fontWeight: 500, color: "#E5E8EC", minHeight: '24px' }}>
                    {announcementLoading
                        ? 'Loading latest announcement...'
                        : latestAnnouncement || 'No announcements yet.'}
                </Typography>

                <ShimmerButton style={{ marginTop: "50px" }} />

                {/* Stats Container */}
                <Box sx={{
                    width: "100%",
                    marginBottom: '140px',
                    alignItems: "center",
                    flexDirection: "row",
                    marginTop: "180px",
                    display: "flex",
                    justifyContent: "space-evenly",
                }}>
                    {loading ? (
                        <Typography sx={{ color: '#fff' }}>Loading stats...</Typography>
                    ) : (
                        stats.map((stats) => (
                            <StatsComponent key={stats.id} heading={stats.title} description={stats.description} />
                        ))
                    )}
                </Box>
            </Box>
        </Box>
    )
}

export default HeroComponent
