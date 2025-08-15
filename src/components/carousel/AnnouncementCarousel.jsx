import { Box, Typography } from '@mui/material';
import React from 'react';
import AnnouncementContainer from '../containers/AnnouncementContainer';
import styles from "../../components/carousel/announcementCarousel.module.css"

const AnnouncementCarousel = ({ announcements = [] }) => {

    // Default announcements if none provided
    const defaultAnnouncements = [
        {
            tag: "Featured Events",
            title: "Join the Ultimate Design Challenge!",
            bodyText: "Registrations are now open for our biggest design challenge yet. Showcase your skills, collaborate with peers, and win amazing prizes!"
        },
        {
            tag: "Announcement",
            title: "Congratulations to our top contributors!",
            bodyText: "We are thrilled to recognize and celebrate the outstanding contributions of our top community members this month. Your unwavering dedication and creativity continue to inspire and elevate our collective achievements."
        },
        {
            tag: "Announcement",
            title: "New Blog Alert: Master the Art of Flutter",
            bodyText: "Dive into our latest blog posts where industry experts share their tips and tricks for mastering Flutter development and design prowess."
        }
    ];

    const announcementsToShow = announcements.length > 0 ? announcements : defaultAnnouncements;

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Box sx={{ width: "100%", }}>
                <Typography sx={{ fontSize: 45, fontWeight: 700, color: "#FFFFFF", textAlign: "center", marginBottom: "61px", }}   >
                    Latest Announcements!
                </Typography>
                <Box
                    sx={{
                        width: '100%',
                        overflow: 'hidden',
                        position: 'relative',
                        '&::before, &::after': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            bottom: 0,
                            width: '100px',
                            zIndex: 2,
                            pointerEvents: 'none'
                        },
                        '&::before': {
                            left: 0,
                            background: 'linear-gradient(to right, rgba(1, 10, 16, 1), rgba(1, 10, 16, 0))'
                        },
                        '&::after': {
                            right: 0,
                            background: 'linear-gradient(to left, rgba(1, 10, 16, 1), rgba(1, 10, 16, 0))'
                        }
                    }}
                >
                    <Box className={styles.carousal} >
                        {/* Duplicate announcements for seamless loop */}
                        {[...announcementsToShow, ...announcementsToShow].map((announcement, index) => (
                            <Box className={styles.group} key={index}  >
                                <AnnouncementContainer
                                    tag={announcement.tag}
                                    title={announcement.title}
                                    bodyText={announcement.bodyText}
                                />
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default AnnouncementCarousel; 