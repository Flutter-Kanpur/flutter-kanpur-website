'use client';

import { Box } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import AnnouncementContainer from '../containers/AnnouncementContainer';

const AnnouncementCarousel = ({ announcements = [], speed = 1000 }) => {
    const carouselRef = useRef(null);
    const speedRef = useRef(speed);

    // Update speed ref when speed prop changes
    useEffect(() => {
        speedRef.current = speed;
    }, [speed]);

    useEffect(() => {
        const carousel = carouselRef.current;
        if (!carousel) return;

        let intervalId;
        let scrollPosition = 0;
        const scrollStep = 2; // pixels per step

        const animate = () => {
            scrollPosition += scrollStep;
            if (carousel.scrollLeft >= carousel.scrollWidth - carousel.clientWidth) {
                scrollPosition = 0;
            }
            carousel.scrollLeft = scrollPosition;
        };

        intervalId = setInterval(animate, speedRef.current / 50); // Use ref for current speed

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, []); // Empty dependency array

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
            <Box
                ref={carouselRef}
                sx={{
                    display: 'flex',
                    gap: '24px',
                    padding: '20px 0',
                    overflowX: 'auto',
                    scrollBehavior: 'smooth',
                    '&::-webkit-scrollbar': {
                        display: 'none'
                    },
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none'
                }}
            >
                {/* Duplicate announcements for seamless loop */}
                {[...announcementsToShow, ...announcementsToShow].map((announcement, index) => (
                    <Box
                        key={index}
                        sx={{
                            flexShrink: 0,
                            minWidth: { xs: '280px', sm: '320px', md: '400px' }
                        }}
                    >
                        <AnnouncementContainer
                            tag={announcement.tag}
                            title={announcement.title}
                            bodyText={announcement.bodyText}
                        />
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default AnnouncementCarousel; 